# EffieGinReactAdmin — 技术架构设计方案

> 将 EffieGinReactAdmin 打造为通用的后台管理系统框架

---

## 目录

1. [现状分析](#1-现状分析)
2. [目录结构最佳实践](#2-目录结构最佳实践)
3. [组件库分层设计](#3-组件库分层设计)
4. [路由系统设计](#4-路由系统设计)
5. [状态管理方案](#5-状态管理方案)
6. [Mock 数据层设计](#6-mock-数据层设计)
7. [主题系统设计](#7-主题系统设计)
8. [可复用的布局系统](#8-可复用的布局系统)
9. [代码生成 / 模板化方案](#9-代码生成--模板化方案)
10. [推荐依赖清单](#10-推荐依赖清单)
11. [实施路线图](#11-实施路线图)

---

## 1. 现状分析

### 当前状态

| 维度 | 现状 | 问题 |
|------|------|------|
| 路由 | 无路由系统，App.tsx 硬编码渲染 Dashboard | 菜单点击无反应 |
| 状态管理 | 无 | 组件间无法共享数据 |
| 组件体系 | 平铺在 components/ 下 | 无分层，无法复用 |
| 数据 | 硬编码 mock 数据写在组件内 | 无法对接真实 API |
| 样式 | 全局 CSS 变量 + 页面级 CSS | 无模块化方案，不支持主题切换 |
| 构建 | Vite + TypeScript | 基础好，但缺少别名扩展 |
| 包管理 | 仅 react + react-dom | 缺少路由、UI、请求等核心依赖 |

### 存量优势

- 深空/玻璃拟态视觉主题完整度高（global.css + layout.css）
- Vite + TypeScript + Path Alias（@/）已配置
- 基础布局（Header + Sidebar + Content）结构正确
- 流星 Canvas 特效组件可复用

---

## 2. 目录结构最佳实践

### 推荐目录结构

```
frontend/
├── public/                          # 静态资源
├── src/
│   ├── assets/                      # 资源文件
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/                  # ===== 组件层 =====
│   │   ├── basic/                   #   [基础组件] 完全通用
│   │   │   ├── Button/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── style.css
│   │   │   │   └── index.ts         # re-export
│   │   │   ├── Card/
│   │   │   ├── Table/
│   │   │   ├── Form/
│   │   │   ├── Modal/
│   │   │   ├── Tag/
│   │   │   ├── Badge/
│   │   │   ├── Icon/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Pagination/
│   │   │   └── Loading/
│   │   │
│   │   ├── layout/                  #   [布局组件] 框架级
│   │   │   ├── AppLayout/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── style.css
│   │   │   │   └── hooks.ts        # 折叠/响应式逻辑
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── Footer/
│   │   │   └── Breadcrumb/
│   │   │
│   │   ├── business/               #   [业务组件] 项目可复用的业务块
│   │   │   ├── StatCard/
│   │   │   ├── TrendChart/
│   │   │   ├── QuickActions/
│   │   │   ├── RecentOrders/
│   │   │   ├── SearchForm/         # 高级搜索表单
│   │   │   └── DataTable/          # 带搜索/分页的数据表格
│   │   │
│   │   └── effects/                # [特效组件] Canvas/动画
│   │       ├── ShootingStars/
│   │       ├── ParticleBg/
│   │       └── TypingText/
│   │
│   ├── hooks/                       # ===== 自定义 Hooks =====
│   │   ├── useAuth.ts
│   │   ├── useRequest.ts           # 基于请求库的封装
│   │   ├── usePagination.ts
│   │   ├── useTheme.ts
│   │   ├── usePermission.ts
│   │   └── useDebounce.ts
│   │
│   ├── pages/                       # ===== 页面 =====
│   │   ├── dashboard/
│   │   │   ├── index.tsx
│   │   │   ├── style.css
│   │   │   └── components/         # 页面私有组件
│   │   ├── system/
│   │   │   ├── user/
│   │   │   │   ├── index.tsx       # 用户列表
│   │   │   │   ├── UserForm.tsx    # 新增/编辑
│   │   │   │   └── style.css
│   │   │   ├── role/
│   │   │   └── permission/
│   │   ├── business/
│   │   │   ├── product/
│   │   │   ├── order/
│   │   │   └── category/
│   │   └── login/
│   │
│   ├── services/                    # ===== 数据层 =====
│   │   ├── api/                    # API 接口定义
│   │   │   ├── user.ts
│   │   │   ├── product.ts
│   │   │   ├── order.ts
│   │   │   └── dashboard.ts
│   │   ├── mock/                   # Mock 数据
│   │   │   ├── user.ts
│   │   │   ├── product.ts
│   │   │   ├── order.ts
│   │   │   └── dashboard.ts
│   │   └── request.ts             # Axios 实例封装
│   │
│   ├── store/                       # ===== 状态管理 =====
│   │   ├── index.ts                # Store 配置
│   │   ├── userStore.ts
│   │   ├── appStore.ts            # 全局 App 状态（侧边栏折叠/主题）
│   │   └── permissionStore.ts
│   │
│   ├── router/                      # ===== 路由 =====
│   │   ├── index.tsx               # 路由主配置
│   │   ├── routes.ts               # 路由表定义
│   │   ├── guard.tsx               # 路由守卫（鉴权/权限）
│   │   └── lazyRoutes.ts           # 懒加载辅助
│   │
│   ├── styles/                      # ===== 样式系统 =====
│   │   ├── variables.css           # CSS 变量（主题色/间距/阴影）
│   │   ├── themes/                 # 主题包
│   │   │   ├── dark.css            # 深色主题（当前）
│   │   │   ├── light.css           # 浅色主题
│   │   │   └── nebula.css          # 银河主题（特效加强）
│   │   ├── reset.css               # 全局重置
│   │   ├── animations.css          # 全局动画
│   │   └── mixins.css              # 可复用 CSS 片段
│   │
│   ├── types/                       # ===== 类型定义 =====
│   │   ├── api.d.ts                # API 响应类型
│   │   ├── menu.d.ts               # 菜单类型
│   │   └── global.d.ts             # 全局类型扩展
│   │
│   ├── utils/                       # ===== 工具函数 =====
│   │   ├── format.ts               # 格式化（金额/日期）
│   │   ├── validate.ts             # 表单校验
│   │   ├── permission.ts           # 权限工具
│   │   └── constants.ts            # 全局常量
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

### 关键设计原则

1. **按功能职责分，不按文件类型分** — services/ 放所有数据相关，pages/ 放所有页面
2. **组件就近原则** — 仅该页面使用的组件放在 `pages/*/components/` 下
3. **组件自包含** — 每个组件目录包含 .tsx + .css + index.ts，不依赖外部样式
4. **路径别名优先** — 用 `@/components/basic/Button` 替代深层相对路径

---

## 3. 组件库分层设计

### 三层架构

```
┌──────────────────────────────────────────────────┐
│                页面组件 (Page)                     │
│   pages/dashboard, pages/system/user ...          │
│        组合业务组件 + 基础组件 → 完整页面          │
├──────────────────────────────────────────────────┤
│              业务组件 (Business)                   │
│   StatCard, TrendChart, DataTable, SearchForm     │
│        复用业务场景，依赖基础组件                   │
├──────────────────────────────────────────────────┤
│              基础组件 (Basic)                      │
│   Button, Card, Table, Form, Modal, Tag, Input    │
│        完全通用，零业务依赖                         │
└──────────────────────────────────────────────────┘
```

### 3.1 基础组件设计规范

每个基础组件遵循统一接口设计模式：

```tsx
// 示例：Card 组件
interface CardProps {
  title?: React.ReactNode          // 卡片标题
  extra?: React.ReactNode          // 右上角扩展操作
  bordered?: boolean               // 是否显示边框
  hoverable?: boolean              // 悬浮效果
  glass?: boolean                  // 是否玻璃拟态（主题特色）
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  onClick?: () => void
}
```

**基础组件清单（一期）：**

| 组件 | 职责 | 关键 Props |
|------|------|-----------|
| Button | 按钮（主题色/渐变/loading） | variant, size, loading, icon, glass |
| Card | 通用卡片容器 | title, extra, hoverable, glass, bordered |
| Table | 数据表格（排序/选择/自定义列） | columns, dataSource, loading, rowKey, pagination |
| Form | 表单管理（校验/布局） | fields, onSubmit, layout, rules |
| FormItem | 表单项 | label, name, required, rules, children |
| Modal | 模态框 | open, title, onOk, onCancel, width |
| Tag | 标签/状态标签 | color, closable, variant |
| Badge | 徽标/通知数 | count, dot, color, overflowCount |
| Icon | 图标容器（统一 emoji 替换） | name, size, color |
| Input | 输入框 | placeholder, prefix, suffix, type |
| Select | 下拉选择 | options, value, onChange, placeholder |
| Pagination | 分页器 | current, total, pageSize, onChange |
| Loading | 加载动画 | spinning, tip, fullscreen |
| Empty | 空状态 | description, image |
| Message | 全局消息提示 | success, error, warning, info |

### 3.2 业务组件设计规范

业务组件应依赖基础组件，而不是直接操作 DOM：

```tsx
// 正确：StatCard 使用基础 Card 组件
import { Card, Icon, Tag } from '@/components/basic'

interface StatCardProps {
  icon: string
  label: string
  value: string
  trend: number
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, color }) => {
  const isUp = trend >= 0
  return (
    <Card glass hoverable style={{ '--stat-color': color } as React.CSSProperties}>
      <CardTop>
        <Icon name={icon} />
        <Tag color={isUp ? 'emerald' : 'pink'}>
          {isUp ? '↑' : '↓'} {Math.abs(trend)}%
        </Tag>
      </CardTop>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Card>
  )
}
```

### 3.3 组件 Storybook / Showcase 页面

建立一个 `/pages/components-showcase/` 页面，集中展示所有基础组件和业务组件，方便团队参考和测试。

---

## 4. 路由系统设计

### 4.1 路由顶层结构

```tsx
// router/routes.ts — 路由表定义
export interface RouteConfig {
  path: string
  element: React.LazyExoticComponent<React.ComponentType>
  meta?: {
    title: string
    icon?: string
    hidden?: boolean        // 在菜单中隐藏
    keepAlive?: boolean     // 缓存页面
    permissions?: string[]  // 所需权限
  }
  children?: RouteConfig[]
}

export const routes: RouteConfig[] = [
  {
    path: '/login',
    element: lazy(() => import('@/pages/login')),
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/',
    element: lazy(() => import('@/components/layout/AppLayout')),
    meta: { title: '首页' },
    children: [
      {
        path: 'dashboard',
        element: lazy(() => import('@/pages/dashboard')),
        meta: { title: '仪表盘', icon: '📊' },
      },
      {
        path: 'system',
        meta: { title: '系统管理', icon: '⚙️' },
        children: [
          {
            path: 'user',
            element: lazy(() => import('@/pages/system/user')),
            meta: { title: '用户管理', icon: '👤' },
          },
          { path: 'role', ... },
          { path: 'permission', ... },
        ],
      },
    ],
  },
]
```

### 4.2 路由主配置

```tsx
// router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { routes, RouteConfig } from './routes'
import { AuthGuard } from './guard'

const flattenRoutes = (routes: RouteConfig[]): any[] => {
  return routes.map(route => ({
    path: route.path,
    element: route.meta?.hidden
      ? <Suspense fallback={<Loading />}><route.element /></Suspense>
      : <AuthGuard permissions={route.meta?.permissions}>
          <Suspense fallback={<Loading />}><route.element /></Suspense>
        </AuthGuard>,
    children: route.children ? flattenRoutes(route.children) : undefined,
  }))
}

export const router = createBrowserRouter([
  ...flattenRoutes(routes),
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])
```

### 4.3 菜单与路由联动

Sidebar 组件直接读取路由表生成菜单，实现菜单配置即路由：

```tsx
// router/menu.tsx — 从路由表生成菜单结构
export const useMenuFromRoutes = () => {
  const { routes } = useRouteConfig()
  return useMemo(() => buildMenuTree(routes), [routes])
}
```

### 4.4 路由守卫

```tsx
// router/guard.tsx
interface AuthGuardProps {
  permissions?: string[]
  children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ permissions, children }) => {
  const { isAuthenticated } = useAuth()
  const { hasPermission } = usePermission()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (permissions && !hasPermission(permissions)) return <NoPermission />

  return <>{children}</>
}
```

### 4.5 推荐依赖

```json
{
  "react-router-dom": "^6.28.0"
}
```

---

## 5. 状态管理方案

### 推荐方案：Zustand（轻量）+ React Query（服务端状态）

```
┌─────────────────────────────────────────────────┐
│                 Zustand Store                     │
│                                                   │
│  appStore ── 侧边栏折叠/展开、主题、全屏          │
│  userStore ── 用户信息、Token、权限               │
│  permissionStore ── 权限树、按钮级权限            │
├─────────────────────────────────────────────────┤
│              React Query (TanStack Query)         │
│                                                   │
│  管理所有服务端状态：列表/详情/缓存/重新获取       │
│  每个 API 接口通过 useQuery / useMutation 调用    │
└─────────────────────────────────────────────────┘
```

### 5.1 Zustand 示例

```tsx
// store/appStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  sidebarCollapsed: boolean
  theme: 'dark' | 'light' | 'nebula'
  toggleSidebar: () => void
  setTheme: (theme: AppState['theme']) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'dark',
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'app-settings' }
  )
)
```

### 5.2 React Query 示例

```tsx
// hooks/useRequest.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserList, createUser, UserListParams } from '@/services/api/user'

// 查询 hooks
export const useUserList = (params: UserListParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUserList(params),
  })
}

// 变更 hooks
export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### 5.3 推荐依赖

```json
{
  "zustand": "^5.0.0",
  "@tanstack/react-query": "^5.60.0"
}
```

---

## 6. Mock 数据层设计

### 推荐方案：MSW (Mock Service Worker) — 浏览器拦截 + 开发服务器

```
请求流程（开发环境）:
  Component → useQuery('users') → Axios GET /api/users
                                      ↓
                              MSW Handler 拦截
                                      ↓
                              返回 mock 数据

请求流程（生产环境）:
  Component → useQuery('users') → Axios GET /api/users
                                      ↓
                              真实 API 服务器
```

### 6.1 MSW 配置

```tsx
// services/mock/user.ts
import { http, HttpResponse } from 'msw'

export const userHandlers = [
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    return HttpResponse.json({
      code: 0,
      data: {
        list: generateUsers(page, pageSize),
        total: 86,
        page,
        pageSize,
      },
    })
  }),

  http.post('/api/users', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ code: 0, data: { id: Date.now(), ...body } })
  }),
]
```

```tsx
// services/mock/index.ts — 浏览器端启动
import { setupWorker } from 'msw/browser'
import { userHandlers } from './user'
import { productHandlers } from './product'

export const worker = setupWorker(...userHandlers, ...productHandlers)
```

```tsx
// main.tsx 开发环境下启动 mock
if (import.meta.env.DEV) {
  const { worker } = await import('@/services/mock')
  await worker.start({ onUnhandledRequest: 'bypass' })
}
```

### 6.2 替代方案：Vite Plugin Mock

如果 MSW 配置复杂，可使用 `vite-plugin-mock`：

```ts
// vite.config.ts
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock',      // mock 文件目录
      enable: true,
    }),
  ],
})
```

### 6.3 推荐依赖

```json
{
  "msw": "^2.6.0",
  "axios": "^1.7.0"
}
```

---

## 7. 主题系统设计

### 7.1 CSS 变量架构

```css
/* styles/variables.css — 全局主题变量（不依赖任何主题） */
:root {
  /* === 仅定义变量名，不赋值 === */
  --color-primary: initial;
  --color-bg-main: initial;
  --color-text-primary: initial;
  /* ... */
}
```

### 7.2 主题包

```css
/* styles/themes/dark.css — 深空主题（当前默认） */
[data-theme='dark'] {
  --color-primary: #6366f1;
  --color-primary-light: #818cf8;
  --color-bg-deep: #0a0a1a;
  --color-bg-main: #0f0f2a;
  --color-bg-card: rgba(255, 255, 255, 0.05);
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  /* ...复制现有变量 */
}

/* styles/themes/light.css — 浅色主题 */
[data-theme='light'] {
  --color-primary: #6366f1;
  --color-primary-light: #7c3aed;
  --color-bg-deep: #f8fafc;
  --color-bg-main: #ffffff;
  --color-bg-card: rgba(0, 0, 0, 0.02);
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  /* ... */
}
```

### 7.3 主题切换实现

```tsx
// hooks/useTheme.ts
import { useEffect } from 'react'
import { useAppStore } from '@/store/appStore'

export const useTheme = () => {
  const { theme, setTheme } = useAppStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    // 持久化到 localStorage（Zustand persist 已处理）
  }, [theme])

  return { theme, setTheme, isDark: theme === 'dark' }
}
```

### 7.4 CSS 变量覆盖的灵活性

组件样式应始终引用 CSS 变量，而非硬编码值：

```css
/* ✅ 正确 */
.button {
  background: var(--color-primary);
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
}

/* ❌ 错误 */
.button {
  background: #6366f1;
  color: #f1f5f9;
  border-radius: 8px;
}
```

### 7.5 主题能力扩展

未来可支持：

- **运行时主题编辑**：通过面板实时修改 CSS 变量值
- **用户自定义主题**：保存到后端
- **CSS-in-JS 桥接**：通过 `useTheme()` hook 获取当前主题对象，用于 JS 动态样式

---

## 8. 可复用的布局系统

### 8.1 AppLayout 主布局

```tsx
// components/layout/AppLayout/index.tsx
import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { useAppStore } from '@/store/appStore'

const AppLayout: React.FC = () => {
  const sidebarCollapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar collapsed={sidebarCollapsed} />
        <main className="app-content">
          <Suspense fallback={<PageLoading />}>
            <Outlet />      {/* ← React Router 渲染子路由 */}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
```

### 8.2 布局配置化

```tsx
// 通过 layout 配置实现多种布局
interface LayoutConfig {
  showHeader?: boolean
  showSidebar?: boolean
  showFooter?: boolean
  sidebarCollapsible?: boolean
  contentMaxWidth?: string
}

// 在路由 meta 中指定
{
  path: 'login',
  element: <Login />,
  meta: {
    layout: { showHeader: false, showSidebar: false }
  }
}
```

### 8.3 响应式适配

```css
/* 侧边栏折叠动画 */
.app-sidebar {
  width: var(--sidebar-width);
  transition: width var(--transition-base);
}
.app-sidebar.collapsed {
  width: 64px;   /* 图标模式 */
}

/* 小屏幕自动折叠 */
@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    z-index: 200;
    transform: translateX(-100%);
  }
  .app-sidebar.open {
    transform: translateX(0);
  }
}
```

---

## 9. 代码生成 / 模板化方案

### 9.1 Plop.js — 微生成器

```ts
// plopfile.ts
import { NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
  // 生成基础组件
  plop.setGenerator('basic-component', {
    description: '创建一个基础组件',
    prompts: [
      { type: 'input', name: 'name', message: '组件名称（PascalCase）' },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/components/basic/{{pascalCase name}}',
        templateFiles: 'templates/basic-component/*',
      },
    ],
  })

  // 生成页面
  plop.setGenerator('page', {
    description: '创建一个页面',
    prompts: [
      { type: 'input', name: 'module', message: '所属模块名' },
      { type: 'input', name: 'name', message: '页面名称（PascalCase）' },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/pages/{{module}}/{{pascalCase name}}',
        templateFiles: 'templates/page/*',
      },
    ],
  })

  // 生成 API 模块
  plop.setGenerator('api-module', {
    description: '创建一个 API + Mock 模块',
    prompts: [
      { type: 'input', name: 'name', message: '模块名称' },
    ],
    actions: [
      { type: 'add', path: 'src/services/api/{{name}}.ts', templateFile: 'templates/api/api.ts.hbs' },
      { type: 'add', path: 'src/services/mock/{{name}}.ts', templateFile: 'templates/api/mock.ts.hbs' },
    ],
  })
}
```

### 9.2 模板示例

```hbs
{{! templates/basic-component/index.tsx.hbs }}
import React from 'react'
import './style.css'

export interface {{pascalCase name}}Props {
  className?: string
  children?: React.ReactNode
}

const {{pascalCase name}}: React.FC<{{pascalCase name}}Props> = ({ className, children }) => {
  return (
    <div className={`{{kebabCase name}} ${className || ''}`}>
      {children}
    </div>
  )
}

export default {{pascalCase name}}
```

### 9.3 推荐依赖

```json
{
  "plop": "^4.0.0"
}
```

---

## 10. 推荐依赖清单

### 核心

| 包 | 用途 | 重要性 |
|----|------|--------|
| react-router-dom ^6.28 | 路由系统 | ★★★ 必须 |
| zustand ^5.0 | 客户端状态管理 | ★★★ 必须 |
| @tanstack/react-query ^5.60 | 服务端状态/请求缓存 | ★★★ 必须 |
| axios ^1.7 | HTTP 请求 | ★★★ 必须 |

### UI 增强

| 包 | 用途 | 重要性 |
|----|------|--------|
| msw ^2.6 | Mock 数据拦截 | ★★☆ 推荐 |
| dayjs ^1.11 | 日期格式化 | ★★☆ 推荐 |
| recharts ^2.12 | 图表库（替代自建柱状图） | ★★☆ 推荐 |
| react-icons ^5 | 图标库（替代 emoji） | ★☆☆ 可选 |

### 开发工具

| 包 | 用途 | 重要性 |
|----|------|--------|
| plop ^4.0 | 代码生成器 | ★★☆ 推荐 |
| msw | Mock Service Worker | ★★☆ 推荐 |
| @types/react-router-dom | 类型定义 | ★★★ 必须 |
| sass ^1.80 | 支持 SCSS（可选扩展） | ★☆☆ 可选 |

---

## 11. 实施路线图

### Phase 1 — 基础设施（1-2 天）

```
☐ 安装 react-router-dom，搭建路由系统
☐ 将当前 App.tsx 重构为 AppLayout + Router
☐ 建立 router/routes.ts，定义路由表
☐ 将 Dashboard 页移到 pages/dashboard/
☐ 配置 Sidebar 从路由表读取菜单
```

### Phase 2 — 状态管理与数据层（1-2 天）

```
☐ 安装 zustand + @tanstack/react-query + axios
☐ 创建 store/appStore（侧边栏折叠/主题）
☐ 创建 services/request.ts（Axios 实例 + 拦截器）
☐ 搭建 MSW mock 数据层
☐ 重构 Dashboard 数据从 mock 获取
```

### Phase 3 — 组件库建设（3-5 天）

```
☐ 创建 components/basic/ 基础组件目录
☐ 实现：Button, Card, Tag, Badge, Loading
☐ 实现：Input, Select, Form, FormItem
☐ 实现：Table, Pagination, Modal, Empty, Message
☐ 创建 components/showcase 展示页
☐ 将现有 business 组件改为基础组件驱动
```

### Phase 4 — 主题系统（1 天）

```
☐ 拆分 CSS 变量到 styles/variables.css
☐ 创建 dark.css / light.css 主题包
☐ 实现 useTheme hook + 主题切换
☐ 改造 Header 添加主题切换按钮
```

### Phase 5 — 代码生成与工程化（1 天）

```
☐ 安装 plop
☐ 编写 basic-component / page / api 生成器
☐ 添加 ESLint + Prettier 配置
```

### Phase 6 — 业务页面填充（持续）

```
☐ 用户管理页面（CRUD Table + Form Modal）
☐ 角色管理页面
☐ 权限管理页面
☐ 商品管理页面
☐ 订单管理页面
☐ 登录页面
```

---

## 附录 A：当前文件迁移对照表

| 当前文件 | 目标位置 | 操作 |
|---------|---------|------|
| src/App.tsx | src/App.tsx（重写） | 改为 RouterProvider |
| src/main.tsx | src/main.tsx | 添加 Provider 包裹 |
| src/pages/Dashboard.tsx | src/pages/dashboard/index.tsx | ✅ 已迁移 |
| src/pages/Dashboard.css | src/pages/dashboard/style.css | 需迁移 |
| src/components/dashboard/StatCard.tsx | src/components/business/StatCard/ | 改为基础 Card 驱动 |
| src/components/layout/Header.tsx | src/components/layout/Header/ | 分目录 |
| src/components/layout/Sidebar.tsx | src/components/layout/Sidebar/ | 路由驱动菜单 |
| src/styles/global.css | src/styles/reset.css + themes/dark.css | 拆分 |
| src/styles/layout.css | src/components/layout/AppLayout/style.css | 内聚 |

---

## 附录 B：组件库开发最佳实践清单

1. **接口先行** — 每个组件先定义 Props 接口再写实现
2. **可组合性** — 组件应可嵌套、可扩展（`children` + `renderProps`）
3. **受控/非受控统一** — 表单类组件同时支持受控和非受控模式
4. **CSS 变量驱动** — 绝对不使用硬编码颜色/间距值
5. **forwardRef** — 需要聚焦/尺寸测量的组件使用 `forwardRef`
6. **默认值** — 所有可选 Props 提供合理的默认值
7. **className 合并** — 支持外部传入 className 和 style 覆盖
8. **TypeScript 严格** — 所有 Props 完整类型定义，禁止 any
9. **单元测试** — 关键组件编写 Vitest 测试
10. **树摇友好** — 支持按需引入，避免全量打包
