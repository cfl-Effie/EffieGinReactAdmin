import React from 'react'
import { ShootingStars } from '@/components/effects/ShootingStars'
import { ProCard, ProLineChart, ProBarChart, ProPieChart, ProGauge } from '@/packages/ui'
import './style.css'

const weeklyData = [
  { day: '周一', pv: 420, uv: 210, sales: 28 },
  { day: '周二', pv: 580, uv: 290, sales: 35 },
  { day: '周三', pv: 490, uv: 245, sales: 22 },
  { day: '周四', pv: 720, uv: 360, sales: 48 },
  { day: '周五', pv: 680, uv: 340, sales: 42 },
  { day: '周六', pv: 510, uv: 255, sales: 30 },
  { day: '周日', pv: 390, uv: 195, sales: 18 },
]

const systemData = [
  { name: 'Windows', value: 45, color: '#6366f1' },
  { name: 'macOS', value: 30, color: '#06b6d4' },
  { name: 'Linux', value: 15, color: '#10b981' },
  { name: '其他', value: 10, color: '#a855f7' },
]

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <ShootingStars />
      <div className="dashboard-header">
        <h1 className="dashboard-title">银河仪表盘</h1>
        <p className="dashboard-subtitle">✦ 如意科技 · 实时数据总览 ✦</p>
      </div>

      {/* 统计卡片 */}
      <div className="stat-cards">
        <div className="stat-card" style={{ '--stat-color': '#6366f1' } as React.CSSProperties}>
          <div className="stat-card-top">
            <div className="stat-card-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}>👥</div>
          </div>
          <div className="stat-card-value">12,846</div>
          <div className="stat-card-footer">
            <span className="stat-card-label">用户总数</span>
            <span className="stat-card-trend up">↑ 12.5%</span>
          </div>
        </div>
        <div className="stat-card" style={{ '--stat-color': '#06b6d4' } as React.CSSProperties}>
          <div className="stat-card-top">
            <div className="stat-card-icon" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>📦</div>
          </div>
          <div className="stat-card-value">3,256</div>
          <div className="stat-card-footer">
            <span className="stat-card-label">商品数量</span>
            <span className="stat-card-trend up">↑ 8.3%</span>
          </div>
        </div>
        <div className="stat-card" style={{ '--stat-color': '#10b981' } as React.CSSProperties}>
          <div className="stat-card-top">
            <div className="stat-card-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>💰</div>
          </div>
          <div className="stat-card-value">¥ 86,420</div>
          <div className="stat-card-footer">
            <span className="stat-card-label">今日营收</span>
            <span className="stat-card-trend up">↑ 15.7%</span>
          </div>
        </div>
        <div className="stat-card" style={{ '--stat-color': '#f59e0b' } as React.CSSProperties}>
          <div className="stat-card-top">
            <div className="stat-card-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>📝</div>
          </div>
          <div className="stat-card-value">423</div>
          <div className="stat-card-footer">
            <span className="stat-card-label">今日订单</span>
            <span className="stat-card-trend down">↓ 3.2%</span>
          </div>
        </div>
      </div>

      {/* 图表行 */}
      <div className="dashboard-grid">
        <ProCard title="📈 本周访问趋势" padding="18px 18px 8px">
          <ProLineChart
            data={weeklyData}
            xKey="day"
            height={220}
            lines={[
              { key: 'pv', color: '#6366f1', name: '访问量 (PV)' },
              { key: 'sales', color: '#10b981', name: '销售额 (万)' },
              { key: 'uv', color: '#06b6d4', name: '访客 (UV)', area: true },
            ]}
          />
        </ProCard>

        <ProCard title="🏪 操作系统分布" padding="18px">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProPieChart
              data={systemData}
              height={240}
              donut
              outerRadius={75}
            />
          </div>
        </ProCard>
      </div>

      {/* 第二行图表 */}
      <div className="dashboard-grid" style={{ marginBottom: 0 }}>
        <ProCard title="📊 各时段销售额">
          <ProBarChart
            data={weeklyData.map(d => ({ ...d, '销售额': d.sales }))}
            xKey="day"
            height={180}
            bars={[
              { key: '销售额', color: '#a855f7', name: '销售额 (万)' },
            ]}
          />
        </ProCard>

        <ProCard title="🎯 系统健康度">
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
            <ProGauge value={96} label="服务器" color="#6366f1" size={110} />
            <ProGauge value={82} label="数据库" color="#06b6d4" size={110} />
            <ProGauge value="78" label="缓存" color="#10b981" size={110} />
          </div>
        </ProCard>
      </div>
    </div>
  )
}

export default Dashboard
