import React from 'react'
import StatCard from '../components/dashboard/StatCard'
import TrendChart from '../components/dashboard/TrendChart'
import RecentOrders from '../components/dashboard/RecentOrders'
import QuickActions from '../components/dashboard/QuickActions'
import './Dashboard.css'

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">仪表盘</h1>
        <p className="dashboard-subtitle">如意科技 · 数据总览</p>
      </div>

      <div className="stat-cards">
        <StatCard
          icon="👥"
          label="用户总数"
          value="12,846"
          trend={12.5}
          color="#1a6bff"
        />
        <StatCard
          icon="📦"
          label="商品数量"
          value="3,256"
          trend={8.3}
          color="#2eab7f"
        />
        <StatCard
          icon="💰"
          label="今日营收"
          value="¥ 86,420"
          trend={15.7}
          color="#c9a85b"
        />
        <StatCard
          icon="📝"
          label="今日订单"
          value="423"
          trend={-3.2}
          color="#d4433b"
        />
      </div>

      <div className="dashboard-grid">
        <TrendChart />
        <QuickActions />
      </div>

      <RecentOrders />
    </div>
  )
}

export default Dashboard
