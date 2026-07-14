/** 菜单路由配置类型 */
export interface RouteMeta {
  title: string
  icon?: string
  hideInMenu?: boolean
  keepAlive?: boolean
  permissions?: string[]
}

export interface AppRoute {
  path: string
  name: string
  element?: React.ComponentType
  meta: RouteMeta
  children?: AppRoute[]
  index?: boolean
}

/** 通用分页类型 */
export interface Pagination {
  page: number
  pageSize: number
  total: number
}

/** 统一响应格式 */
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

/** 侧边栏菜单项 */
export interface MenuItem {
  key: string
  label: string
  icon: string
  path?: string
  children?: MenuItem[]
  badge?: string
  active?: boolean
}
