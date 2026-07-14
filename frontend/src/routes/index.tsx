import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import type { AppRoute } from '@/types'

/* --------------------------------------------------
   页面懒加载 — 按需加载，减小首包体积
   -------------------------------------------------- */
const Dashboard = lazy(() => import('@/pages/dashboard'))
const UserManagement = lazy(() => import('@/pages/system/user'))
const RoleManagement = lazy(() => import('@/pages/system/role'))
const PermissionManagement = lazy(() => import('@/pages/system/permission'))
const ProductManagement = lazy(() => import('@/pages/business/product'))
const OrderManagement = lazy(() => import('@/pages/business/order'))
const CategoryManagement = lazy(() => import('@/pages/business/category'))
const SystemSettings = lazy(() => import('@/pages/other/settings'))
const OperationLogs = lazy(() => import('@/pages/other/logs'))

/** 页面组件映射表 — 新增页面只需在这里注册 */
const pageMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  dashboard: Dashboard,
  user: UserManagement,
  role: RoleManagement,
  permission: PermissionManagement,
  product: ProductManagement,
  order: OrderManagement,
  category: CategoryManagement,
  settings: SystemSettings,
  logs: OperationLogs,
}

/** 加载占位 */
const PageLoading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    gap: '12px',
  }}>
    <span style={{
      width: 24, height: 24,
      border: '2px solid var(--color-border)',
      borderTopColor: 'var(--color-primary)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    加载中...
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </div>
)

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 默认重定向到仪表盘 */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* 动态生成路由 */}
          {Object.entries(pageMap).map(([key, Component]) => {
            // 从路径映射表找到对应路径
            const pathMap: Record<string, string> = {
              dashboard: 'dashboard',
              user: 'system/user',
              role: 'system/role',
              permission: 'system/permission',
              product: 'business/product',
              order: 'business/order',
              category: 'business/category',
              settings: 'other/settings',
              logs: 'other/logs',
            }
            return (
              <Route
                key={key}
                path={pathMap[key]}
                element={<Component />}
              />
            )
          })}

          {/* 404 兜底 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
