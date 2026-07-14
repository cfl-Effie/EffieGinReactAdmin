import React from 'react'
import StatCard from '@/components/business/StatCard'
import TrendChart from '@/components/business/TrendChart'
import RecentOrders from '@/components/business/RecentOrders'
import QuickActions from '@/components/business/QuickActions'
import { ShootingStars } from '@/components/effects/ShootingStars'
import './style.css'

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <ShootingStars />
      <div className="dashboard-header">
        <h1 className="dashboard-title">银河仪表盘</h1>
        <p className="dashboard-subtitle">✦ 如意科技 · 实时数据总览 ✦</p>
      </div>

      <div className="stat-cards">
        <StatCard icon="👥" label="用户总数" value="12,846" trend={12.5} color="#6366f1" />
        <StatCard icon="📦" label="商品数量" value="3,256" trend={8.3} color="#06b6d4" />
        <StatCard icon="💰" label="今日营收" value="¥ 86,420" trend={15.7} color="#10b981" />
        <StatCard icon="📝" label="今日订单" value="423" trend={-3.2} color="#f59e0b" />
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
