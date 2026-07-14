/**
 * 用户管理 — 使用 ProTable + ProSearch + Mock 的示范页面
 * 后续其他业务页面可参考此模式快速开发
 */
import React, { useState, useEffect, useCallback } from 'react'
import { ProCard, ProTable, ProSearch } from '@/packages/ui'
import type { ProColumn, SearchField } from '@/packages/ui'
import { fetchUsers, userStatusEnum } from '@/services/mock'

interface UserItem {
  id: number
  name: string
  email: string
  role: string
  status: string
  createdAt: string
  phone: string
}

const columns: ProColumn[] = [
  { key: 'id', title: 'ID', width: 70 },
  { key: 'name', title: '姓名', width: 100 },
  { key: 'email', title: '邮箱' },
  { key: 'phone', title: '手机号', width: 130 },
  {
    key: 'role', title: '角色', width: 90,
    valueType: 'tag',
    valueEnum: {
      '管理员': { text: '管理员', color: '#6366f1' },
      '编辑': { text: '编辑', color: '#06b6d4' },
      '运营': { text: '运营', color: '#10b981' },
      '客服': { text: '客服', color: '#f59e0b' },
      '测试': { text: '测试', color: '#a855f7' },
      '访客': { text: '访客', color: '#64748b' },
    },
  },
  {
    key: 'status', title: '状态', width: 90,
    valueType: 'tag',
    valueEnum: userStatusEnum,
  },
  { key: 'createdAt', title: '创建时间', valueType: 'datetime', width: 170 },
]

const searchFields: SearchField[] = [
  { key: 'keyword', label: '关键词', type: 'text', placeholder: '姓名 / 邮箱' },
  { key: 'status', label: '状态', type: 'select', options: [
    { label: '启用', value: 'active' },
    { label: '禁用', value: 'inactive' },
    { label: '待审', value: 'pending' },
  ]},
]

export default function UserManagement() {
  const [data, setData] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 })
  const [params, setParams] = useState<Record<string, any>>({})

  const loadData = useCallback(async (searchParams?: Record<string, any>) => {
    setLoading(true)
    try {
      const merged = { ...pagination, ...(searchParams || params) }
      const res = await fetchUsers(merged)
      if (res.code === 0) {
        setData(res.data.list)
        setPagination(prev => ({ ...prev, total: res.data.pagination.total }))
      }
    } finally {
      setLoading(false)
    }
  }, [pagination, params])

  useEffect(() => { loadData() }, [])

  const handleSearch = (values: Record<string, any>) => {
    setParams(values)
    setPagination(prev => ({ ...prev, page: 1 }))
    loadData({ ...values, page: 1, pageSize: pagination.pageSize })
  }

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination(prev => ({ ...prev, page, pageSize }))
    loadData({ ...params, page, pageSize })
  }

  return (
    <div style={{ animation: 'slide-up 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>
      <div className="dashboard-header">
        <h1 className="dashboard-title">👤 用户管理</h1>
        <p className="dashboard-subtitle">✦ 管理系统用户 · 当前共 {pagination.total} 条记录 ✦</p>
      </div>

      <ProSearch fields={searchFields} onSearch={handleSearch} loading={loading} />

      <ProCard>
        <ProTable
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={pagination}
          onPageChange={handlePageChange}
          toolbar={
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                padding: '8px 18px', borderRadius: 8, border: 'none',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>+ 新增用户</button>
              <button style={{
                padding: '8px 16px', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'transparent', color: '#94a3b8', fontSize: 13, cursor: 'pointer',
              }}>📥 导出</button>
            </div>
          }
        />
      </ProCard>
    </div>
  )
}
