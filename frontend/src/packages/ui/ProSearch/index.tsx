/**
 * ProSearch — 通用搜索栏
 * Schema 驱动，支持 text / select / dateRange / number 等字段
 *
 * 用法:
 * <ProSearch
 *   fields={[
 *     { key: 'keyword', label: '关键词', type: 'text', placeholder: '搜索名称/编号' },
 *     { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: 1 }] },
 *   ]}
 *   onSearch={(values) => fetchList(values)}
 * />
 */
import React, { useState } from 'react'

export type SearchFieldType = 'text' | 'select' | 'number' | 'dateRange'

export interface SearchField {
  key: string
  label: string
  type: SearchFieldType
  placeholder?: string
  options?: { label: string; value: any }[]
  defaultValue?: any
}

interface ProSearchProps {
  fields: SearchField[]
  onSearch: (values: Record<string, any>) => void
  onReset?: () => void
  loading?: boolean
}

const ProSearch: React.FC<ProSearchProps> = ({ fields, onSearch, onReset, loading }) => {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {}
    fields.forEach(f => { init[f.key] = f.defaultValue ?? '' })
    return init
  })

  const handleChange = (key: string, val: any) => {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  const handleSearch = () => onSearch(values)
  const handleReset = () => {
    const empty: Record<string, any> = {}
    fields.forEach(f => { empty[f.key] = f.defaultValue ?? '' })
    setValues(empty)
    onReset?.()
  }

  const inputBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8, padding: '8px 12px',
    color: '#f1f5f9', fontSize: 13, outline: 'none',
    width: '100%', transition: 'border 0.2s',
  }

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end',
      padding: '16px 20px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 'var(--radius-sm)',
      marginBottom: 16,
    }}>
      {fields.map((field) => (
        <div key={field.key} style={{ minWidth: 180, flex: '1 0 auto' }}>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4, fontWeight: 600, letterSpacing: 0.5 }}>
            {field.label}
          </div>
          {field.type === 'text' && (
            <input
              style={inputBase}
              placeholder={field.placeholder || `请输入${field.label}`}
              value={values[field.key] ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          )}
          {field.type === 'select' && (
            <select
              style={inputBase}
              value={values[field.key] ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              <option value="">全部</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
          {field.type === 'number' && (
            <input
              type="number"
              style={inputBase}
              placeholder={field.placeholder || `请输入${field.label}`}
              value={values[field.key] ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          )}
        </div>
      ))}

      {/* 操作按钮 */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0, paddingBottom: 1 }}>
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '8px 20px', borderRadius: 8, border: 'none',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            color: '#fff', fontWeight: 600, fontSize: 13,
            cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.6 : 1,
            transition: 'all 0.2s',
          }}
        >
          {loading ? '搜索中...' : '🔍 搜索'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
            background: 'transparent', color: '#94a3b8', fontSize: 13,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          ↺ 重置
        </button>
      </div>
    </div>
  )
}

export default ProSearch
