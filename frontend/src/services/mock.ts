/**
 * services/mock — Mock 数据服务
 * 模拟 API 响应，后续替换为真实请求只需改这里
 */
interface ApiResult<T = any> {
  code: number
  data: T
  message: string
}

/** 延迟模拟网络请求 */
const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

/* ====================================================
   Mock 数据生成器
   ==================================================== */
const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '陈晓', '林月']
const roles = ['管理员', '编辑', '运营', '客服', '测试', '访客']
const statuses = ['active', 'inactive', 'pending'] as const
const statusLabels: Record<string, string> = { active: '启用', inactive: '禁用', pending: '待审' }
const statusColors: Record<string, string> = { active: '#34d399', inactive: '#f472b6', pending: '#fbbf24' }

let userIdCounter = 1001
const generateUser = () => ({
  id: userIdCounter++,
  name: names[Math.floor(Math.random() * names.length)],
  email: `user${userIdCounter - 1}@example.com`,
  role: roles[Math.floor(Math.random() * roles.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
  createdAt: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  phone: `1${[3,5,7,8,9][Math.floor(Math.random() * 5)]}${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
})

/* ====================================================
   API 接口（模拟）
   ==================================================== */

/** 获取用户列表 */
export async function fetchUsers(params?: { page?: number; pageSize?: number; keyword?: string; status?: string }) {
  await delay(400)
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10

  // 生成总数据
  const total = 156
  const list = Array.from({ length: pageSize }, (_, i) => generateUser())

  // 模拟筛选
  let filtered = list
  if (params?.keyword) {
    filtered = filtered.filter(u => u.name.includes(params.keyword!) || u.email.includes(params.keyword!))
  }
  if (params?.status) {
    filtered = filtered.filter(u => u.status === params.status)
  }

  return {
    code: 0,
    data: {
      list: filtered,
      pagination: { page, pageSize, total },
    },
    message: 'success',
  }
}

/** 获取仪表盘统计数据 */
export async function fetchDashboardStats() {
  await delay(300)
  return {
    code: 0,
    data: {
      users: { total: 12846, trend: 12.5 },
      products: { total: 3256, trend: 8.3 },
      revenue: { total: 86420, trend: 15.7 },
      orders: { total: 423, trend: -3.2 },
    },
    message: 'success',
  }
}

/** 获取趋势数据 */
export async function fetchTrendData() {
  await delay(200)
  return {
    code: 0,
    data: [
      { day: '周一', pv: 420, uv: 210 },
      { day: '周二', pv: 580, uv: 290 },
      { day: '周三', pv: 490, uv: 245 },
      { day: '周四', pv: 720, uv: 360 },
      { day: '周五', pv: 680, uv: 340 },
      { day: '周六', pv: 510, uv: 255 },
      { day: '周日', pv: 390, uv: 195 },
    ],
    message: 'success',
  }
}

// 导出状态映射供 ProTable 使用
export const userStatusEnum = {
  active: { text: '启用', color: '#34d399' },
  inactive: { text: '禁用', color: '#f472b6' },
  pending: { text: '待审', color: '#fbbf24' },
}
