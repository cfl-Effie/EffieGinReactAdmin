
  <div align="center">
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Recharts-2-22B5BF?style=flat" alt="Recharts" />
    <img src="https://img.shields.io/badge/Router-6-CA4245?style=flat&logo=reactrouter" alt="React Router" />
  </div>

  <br />

  <div align="center">
    <h1>✨ Effie Gin React Admin ✨</h1>
    <p><strong>如意国风 · 银河科技后台管理框架</strong></p>
    <p>基于 React 18 + TypeScript + Vite 6 的通用后台管理系统</p>
  </div>

  <br />

  ## 📸 系统截图

  ### 仪表盘
  ![仪表盘]()

  *银河科技主题 · 玻璃拟态卡片 · Recharts 动态图表 · 流星粒子特效*

  ### 用户管理
  ![用户管理]()

  *ProTable 通用表格 · ProSearch 搜索栏 · Mock 数据*

  ### 菜单导航
  ![菜单导航]()

  *配置式路由菜单 · 路由懒加载 · 页面按需加载*

  <br />

  ## 🚀 快速开始

  ```bash
  # 克隆项目
  git clone https://github.com/your-username/EffieGinReactAdmin.git

  # 进入前端目录
  cd EffieGinReactAdmin/frontend

  # 安装依赖
  npm install

  # 启动开发服务器
  npm run dev
  ```

  打开浏览器访问 `http://localhost:3000` 即可查看效果。

  <br />

  ## 🏗️ 项目架构

  ```
  EffieGinReactAdmin/
  ├── frontend/                  # 前端项目
  │   ├── src/
  │   │   ├── config/            # 路由 & 菜单配置
  │   │   │   └── routes.ts      # 统一管理菜单 + 路由
  │   │   ├── layouts/           # 布局组件
  │   │   │   ├── MainLayout.tsx # 主布局 (Header + Sidebar + Content)
  │   │   │   ├── components/    # Header / Sidebar
  │   │   │   └── style.css
  │   │   ├── routes/            # React Router 路由
  │   │   │   └── index.tsx      # 懒加载路由定义
  │   │   ├── pages/             # 业务页面
  │   │   │   ├── dashboard/     # 仪表盘
  │   │   │   ├── system/        # 系统管理
  │   │   │   │   ├── user/      # 用户管理 ✅ 已完成
  │   │   │   │   ├── role/      # 角色管理
  │   │   │   │   └── permission/# 权限管理
  │   │   │   ├── business/      # 业务管理
  │   │   │   │   ├── product/   # 商品管理
  │   │   │   │   ├── order/     # 订单管理
  │   │   │   │   └── category/  # 分类管理
  │   │   │   └── other/         # 其他
  │   │   ├── packages/          # 通用组件库 🎯
  │   │   │   ├── ui/            # UI 组件
  │   │   │   │   ├── ProTable/  # Schema 驱动表格
  │   │   │   │   ├── ProChart/  # 图表 (折线/柱状/饼图/进度环)
  │   │   │   │   ├── ProCard/   # 玻璃拟态卡片
  │   │   │   │   └── ProSearch/ # 搜索栏
  │   │   │   └── hooks/         # Hooks (useRequest, usePagination)
  │   │   ├── services/          # 数据服务
  │   │   │   └── mock.ts        # Mock 数据适配器
  │   │   ├── components/        # 项目级业务组件
  │   │   ├── types/             # 类型定义
  │   │   └── styles/            # 主题系统
  │   ├── package.json
  │   ├── vite.config.ts
  │   └── tsconfig.json
  ├── backend/                   # 后端 (Gin) — 待开发
  └── ARCHITECTURE.md            # 架构设计文档
  ```

  > **设计理念**：菜单与路由**配置化**，新增页面只需注册 config + 创建页面文件；组件库**Schema 驱动**，表格/表单/搜索用配置对象描述，复用性极高。

  <br />

  ## 🎨 主题系统

  | 特性 | 说明 |
  |------|------|
  | 🌌 **深空银河背景** | 极光渐变 + 动态流星粒子特效 |
  | 🪟 **玻璃拟态卡片** | backdrop-filter: blur(20px) 毛玻璃效果 |
  | 🌈 **霓虹发光** | gradient 渐变 + box-shadow 发光 |
  | 🎯 **3D 悬浮动效** | hover 时 translateY + scale 弹簧动画 |
  | 📦 **主题变量** | CSS 自定义属性，一键换肤 |

  <br />

  ## 📦 组件库使用示例

  ### ProTable — Schema 驱动表格

  ```tsx
  import { ProTable } from '@/packages/ui'
  import type { ProColumn } from '@/packages/ui'

  const columns: ProColumn[] = [
    { key: 'name', title: '姓名' },
    { key: 'amount', title: '金额', valueType: 'money' },
    { key: 'status', title: '状态', valueType: 'tag', valueEnum: statusEnum },
    { key: 'createdAt', title: '创建时间', valueType: 'datetime' },
  ]

  <ProTable
    columns={columns}
    dataSource={data}
    loading={loading}
    pagination={{ page: 1, pageSize: 10, total: 100 }}
    onPageChange={(page, size) => loadData({ page, size })}
  />
  ```

  ### ProChart — 图表组件

  ```tsx
  import { ProLineChart, ProBarChart, ProPieChart, ProGauge } from '@/packages/ui'

  // 折线图
  <ProLineChart data={data} xKey="day" lines={[{ key: 'pv', color: '#6366f1' }]} />
  // 饼图
  <ProPieChart data={[{ name: 'A', value: 45, color: '#6366f1' }]} donut />
  // 进度环
  <ProGauge value={96} label="服务器" />
  ```

  ### ProSearch — 搜索栏

  ```tsx
  import { ProSearch } from '@/packages/ui'

  <ProSearch
    fields={[
      { key: 'keyword', label: '关键词', type: 'text' },
      { key: 'status', label: '状态', type: 'select', options: [...] },
    ]}
    onSearch={(values) => fetchList(values)}
  />
  ```

  <br />

  ## 🧪 Mock 数据

  使用适配器模式，所有 API 接口定义在 `src/services/mock.ts`：

  ```ts
  import { fetchUsers } from '@/services/mock'

  // 使用方式和真实 API 完全一致
  const res = await fetchUsers({ page: 1, pageSize: 10 })
  // → { code: 0, data: { list: [...], pagination: {...} }, message: 'success' }
  ```

  后续对接 Go Gin 后端时，只需替换 mock.ts 中的实现，组件代码**无需任何改动**。

  <br />

  ## 🗺️ 后续规划

  - [x] 基础布局 + 路由系统
  - [x] 银河科技主题
  - [x] 通用组件库 (ProTable, ProChart, ProCard, ProSearch)
  - [x] Mock 数据层
  - [ ] Go Gin 后端开发
  - [ ] 权限系统 (RBAC)
  - [ ] 暗黑 / 亮色主题切换
  - [ ] i18n 国际化
  - [ ] 代码生成器

  <br />

  ## 📄 许可证

  MIT © Effie
