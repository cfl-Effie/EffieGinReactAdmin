/**
 * ProTable — Schema 驱动的高性能表格
 * 统一处理：分页 / 加载 / 空态 / 值类型渲染 / 操作列
 *
 * 用法:
 * <ProTable
 *   columns={[
 *     { key: 'name', title: '姓名' },
 *     { key: 'status', title: '状态', valueType: 'tag', valueEnum: { 1: '启用', 0: '禁用' } },
 *     { key: 'amount', title: '金额', valueType: 'money' },
 *   ]}
 *   dataSource={data}
 *   loading={loading}
 *   pagination={{ page: 1, pageSize: 10, total: 100 }}
 *   onPageChange={(page, size) => {}}
 *   rowKey="id"
 * />
 */
import React from 'react'

/* ====================================================
   类型定义
   ==================================================== */
export interface ProColumn {
  /** 字段键名 */
  key: string
  /** 表头文字 */
  title: string
  /** 渲染类型 */
  valueType?: 'text' | 'money' | 'date' | 'datetime' | 'tag' | 'number' | 'percent'
  /** 枚举映射 — valueType=tag 时使用 */
  valueEnum?: Record<string | number, { text: string; color?: string } | string>
  /** 自定义渲染 */
  render?: (value: any, record: Record<string, any>, index: number) => React.ReactNode
  /** 对齐 */
  align?: 'left' | 'center' | 'right'
  /** 宽度 */
  width?: number | string
  /** 固定列 */
  fixed?: 'left' | 'right'
  /** 排序 */
  sorter?: boolean
}

export interface ProTableProps {
  columns: ProColumn[]
  dataSource: Record<string, any>[]
  loading?: boolean
  pagination?: { page: number; pageSize: number; total: number }
  onPageChange?: (page: number, pageSize: number) => void
  onPageSizeChange?: (pageSize: number) => void
  rowKey?: string
  toolbar?: React.ReactNode
  emptyText?: string
  className?: string
}

/* ====================================================
   值类型渲染器
   ==================================================== */
const renderCell = (col: ProColumn, value: any, record: Record<string, any>, index: number): React.ReactNode => {
  if (col.render) return col.render(value, record, index)

  const vt = col.valueType || 'text'

  switch (vt) {
    case 'text':
      return value ?? '-'

    case 'money': {
      const n = Number(value) || 0
      return (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: '#34d399' }}>
          ¥ {n.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
        </span>
      )
    }

    case 'number':
      return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{(Number(value) || 0).toLocaleString()}</span>

    case 'percent':
      return <span style={{ color: (value as number) >= 0 ? '#34d399' : '#f472b6' }}>
        {(value as number) >= 0 ? '↑' : '↓'} {Math.abs(Number(value) || 0).toFixed(1)}%
      </span>

    case 'tag': {
      if (!col.valueEnum) return value ?? '-'
      const entry = col.valueEnum[value as string | number]
      if (!entry) return value ?? '-'
      const text = typeof entry === 'string' ? entry : entry.text
      const color = typeof entry === 'object' ? (entry.color || '#6366f1') : '#6366f1'
      return (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '2px 12px', borderRadius: 20,
          fontSize: 12, fontWeight: 600,
          background: `${color}18`,
          color,
          boxShadow: `0 0 10px ${color}20`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
          {text}
        </span>
      )
    }

    case 'date':
      return <span style={{ color: '#94a3b8', fontSize: 13 }}>{String(value || '-').slice(0, 10)}</span>

    case 'datetime':
      return <span style={{ color: '#94a3b8', fontSize: 13 }}>{String(value || '-').slice(0, 19)}</span>

    default:
      return value ?? '-'
  }
}

/* ====================================================
   ProTable 组件
   ==================================================== */
const ProTable: React.FC<ProTableProps> = ({
  columns, dataSource, loading, pagination,
  onPageChange, onPageSizeChange,
  rowKey = 'id', toolbar, emptyText = '暂无数据',
  className = '',
}) => {
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0

  return (
    <div className={className}>
      {/* 工具栏 */}
      {toolbar && (
        <div style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          marginBottom: 14, gap: 10,
        }}>
          {toolbar}
        </div>
      )}

      {/* 表格容器 */}
      <div style={{
        overflowX: 'auto',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border, rgba(255,255,255,0.08))',
      }}>
        <table style={{
          width: '100%', borderCollapse: 'collapse',
          fontSize: 13, minWidth: columns.length * 100,
        }}>
          {/* 表头 */}
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{
                  textAlign: col.align || 'left',
                  padding: '12px 14px',
                  fontSize: 11, fontWeight: 700,
                  color: 'var(--color-text-muted, #64748b)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  borderBottom: '1px solid var(--color-border, rgba(255,255,255,0.08))',
                  background: 'rgba(255,255,255,0.02)',
                  whiteSpace: 'nowrap',
                  width: col.width,
                  position: col.fixed ? 'sticky' : undefined,
                  left: col.fixed === 'left' ? 0 : undefined,
                  right: col.fixed === 'right' ? 0 : undefined,
                  zIndex: col.fixed ? 1 : undefined,
                }}>
                  {col.title}
                  {col.sorter && <span style={{ marginLeft: 4, opacity: 0.4, cursor: 'pointer' }}>⇅</span>}
                </th>
              ))}
            </tr>
          </thead>

          {/* 表体 */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '60px 0' }}>
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>加载中...</span>
                </td>
              </tr>
            ) : dataSource.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
                  <span style={{ color: '#64748b', fontSize: 13 }}>{emptyText}</span>
                </td>
              </tr>
            ) : (
              dataSource.map((record, idx) => {
                const id = record[rowKey] ?? idx
                return (
                  <tr
                    key={id}
                    style={{
                      transition: 'background 0.15s',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {columns.map((col) => (
                      <td key={col.key} style={{
                        textAlign: col.align || 'left',
                        padding: '13px 14px',
                        color: 'var(--color-text-primary, #f1f5f9)',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        position: col.fixed ? 'sticky' : undefined,
                        left: col.fixed === 'left' ? 0 : undefined,
                        right: col.fixed === 'right' ? 0 : undefined,
                        zIndex: col.fixed ? 1 : undefined,
                        background: col.fixed ? 'var(--color-bg-main, #0f0f2a)' : undefined,
                      }}>
                        {renderCell(col, record[col.key], record, idx)}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {pagination && totalPages > 0 && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 14, color: '#94a3b8', fontSize: 12,
        }}>
          <span>共 {pagination.total} 条</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <PageBtn disabled={pagination.page <= 1} onClick={() => onPageChange?.(pagination.page - 1, pagination.pageSize)}>
              ‹
            </PageBtn>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 7) {
                pageNum = i + 1
              } else if (pagination.page <= 4) {
                pageNum = i + 1
              } else if (pagination.page >= totalPages - 3) {
                pageNum = totalPages - 6 + i
              } else {
                pageNum = pagination.page - 3 + i
              }
              return (
                <PageBtn
                  key={pageNum}
                  active={pageNum === pagination.page}
                  onClick={() => onPageChange?.(pageNum, pagination.pageSize)}
                >
                  {pageNum}
                </PageBtn>
              )
            })}
            <PageBtn disabled={pagination.page >= totalPages} onClick={() => onPageChange?.(pagination.page + 1, pagination.pageSize)}>
              ›
            </PageBtn>
          </div>
          <select
            value={pagination.pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6, padding: '4px 8px', color: '#94a3b8', fontSize: 12,
              outline: 'none', cursor: 'pointer',
            }}
          >
            {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}条/页</option>)}
          </select>
        </div>
      )}
    </div>
  )
}

/* 分页按钮 */
const PageBtn: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  active?: boolean
}> = ({ children, onClick, disabled, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      minWidth: 28, height: 28,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 6,
      border: active ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
      background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
      color: active ? '#818cf8' : disabled ? '#475569' : '#94a3b8',
      fontWeight: active ? 700 : 400,
      fontSize: 12,
      cursor: disabled ? 'default' : 'pointer',
      transition: 'all 0.15s',
    }}
  >
    {children}
  </button>
)

export default ProTable
