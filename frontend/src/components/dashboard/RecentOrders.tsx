import React from 'react'

const recentOrders = [
  { id: 'ORD-2024-001', customer: '张三', amount: '¥ 2,380.00', status: 'completed', statusText: '已完成' },
  { id: 'ORD-2024-002', customer: '李四', amount: '¥ 568.00', status: 'processing', statusText: '处理中' },
  { id: 'ORD-2024-003', customer: '王五', amount: '¥ 1,299.00', status: 'pending', statusText: '待付款' },
  { id: 'ORD-2024-004', customer: '赵六', amount: '¥ 4,560.00', status: 'completed', statusText: '已完成' },
  { id: 'ORD-2024-005', customer: '孙七', amount: '¥ 876.00', status: 'cancelled', statusText: '已取消' },
  { id: 'ORD-2024-006', customer: '周八', amount: '¥ 3,210.00', status: 'processing', statusText: '处理中' },
]

const RecentOrders: React.FC = () => {
  return (
    <div className="orders-card">
      <div className="orders-card-header">
        <span className="orders-card-title">最近订单</span>
        <span className="orders-link">查看全部 →</span>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>订单编号</th>
            <th>客户</th>
            <th>金额</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td style={{ fontWeight: 500 }}>{order.id}</td>
              <td>{order.customer}</td>
              <td style={{ fontWeight: 500 }}>{order.amount}</td>
              <td>
                <span className={`order-status ${order.status}`}>
                  {order.statusText}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentOrders
