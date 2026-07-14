import React from 'react'

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
    <div
      className="stat-card"
      style={{
        '--stat-color': color,
        '--stat-color-glow': `${color}60`,
        '--stat-bg': `${color}15`,
      } as React.CSSProperties}
    >
      <div className="stat-card-top">
        <div
          className="stat-card-icon"
          style={{
            background: `linear-gradient(135deg, ${color}25, ${color}08)`,
            color: color,
            boxShadow: `0 0 20px ${color}30`,
          }}
        >
          {icon}
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-footer">
        <span className="stat-card-label">{label}</span>
        <span className={`stat-card-trend ${isUp ? 'up' : 'down'}`}>
          {isUp ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
        </span>
      </div>
    </div>
  )
}

export default StatCard
