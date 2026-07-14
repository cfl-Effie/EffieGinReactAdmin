import { MenuItem } from '@/types'
import type { AppRoute } from '@/types'

/**
 * 菜单配置 — 统一管理侧边栏菜单
 * 修改这里即可增删改侧边栏项目
 */
export const menuConfig: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: '📊',
    path: '/dashboard',
    active: true,
  },
  {
    key: 'system',
    label: '系统管理',
    icon: '⚙️',
    children: [
      { key: 'user', label: '用户管理', icon: '👤', path: '/system/user' },
      { key: 'role', label: '角色管理', icon: '📋', path: '/system/role' },
      { key: 'permission', label: '权限管理', icon: '🔒', path: '/system/permission' },
    ],
  },
  {
    key: 'business',
    label: '业务管理',
    icon: '🏪',
    children: [
      { key: 'product', label: '商品管理', icon: '📦', path: '/business/product', badge: '12' },
      { key: 'order', label: '订单管理', icon: '📝', path: '/business/order' },
      { key: 'category', label: '分类管理', icon: '🏷️', path: '/business/category' },
    ],
  },
  {
    key: 'other',
    label: '其他',
    icon: '🔧',
    children: [
      { key: 'settings', label: '系统设置', icon: '⚙️', path: '/other/settings' },
      { key: 'logs', label: '操作日志', icon: '📄', path: '/other/logs' },
    ],
  },
]

/**
 * 路由配置 — 自动关联菜单与页面组件
 * 新增页面时在这里注册路由
 */
export const routeConfig: AppRoute[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { title: '仪表盘' },
    // 路由使用 React.lazy 懒加载，在 routes/index.tsx 中定义
  },
  {
    path: '/system/user',
    name: 'UserManagement',
    meta: { title: '用户管理' },
  },
  {
    path: '/system/role',
    name: 'RoleManagement',
    meta: { title: '角色管理' },
  },
  {
    path: '/system/permission',
    name: 'PermissionManagement',
    meta: { title: '权限管理' },
  },
  {
    path: '/business/product',
    name: 'ProductManagement',
    meta: { title: '商品管理' },
  },
  {
    path: '/business/order',
    name: 'OrderManagement',
    meta: { title: '订单管理' },
  },
  {
    path: '/business/category',
    name: 'CategoryManagement',
    meta: { title: '分类管理' },
  },
  {
    path: '/other/settings',
    name: 'SystemSettings',
    meta: { title: '系统设置' },
  },
  {
    path: '/other/logs',
    name: 'OperationLogs',
    meta: { title: '操作日志' },
  },
]
