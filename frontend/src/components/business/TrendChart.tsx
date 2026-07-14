import React from 'react'

const weeklyData = [
  { day: '周一', pv: 420, uv: 210 },
  { day: '周二', pv: 580, uv: 290 },
  { day: '周三', pv: 490, uv: 245 },
  { day: '周四', pv: 720, uv: 360 },
  { day: '周五', pv: 680, uv: 340 },
  { day: '周六', pv: 510, uv: 255 },
  { day: '周日', pv: 390, uv: 195 },
]

const maxPv = Math.max(...weeklyData.map(d => d.pv))
const maxUv = Math.max(...weeklyData.map(d => d.uv))

const barColors = [
  { pv: '#6366f1', pvLight: '#818cf8', uv: '#06b6d4', uvLight: '#22d3ee' },
  { pv: '#a855f7', pvLight: '#c084fc', uv: '#10b981', uvLight: '#34d399' },
  { pv: '#ec4899', pvLight: '#f472b6', uv: '#f59e0b', uvLight: '#fbbf24' },
  { pv: '#6366f1', pvLight: '#818cf8', uv: '#06b6d4', uvLight: '#22d3ee' },
  { pv: '#a855f7', pvLight: '#c084fc', uv: '#10b981', uvLight: '#34d399' },
  { pv: '#ec4899', pvLight: '#f472b6', uv: '#f59e0b', uvLight: '#fbbf24' },
  { pv: '#6366f1', pvLight: '#818cf8', uv: '#06b6d4', uvLight: '#22d3ee' },
]

const TrendChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <span className="chart-card-title">📈 本周访问趋势</span>
        <div className="chart-card-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }} />
            访问量 (PV)
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }} />
            独立访客 (UV)
          </div>
        </div>
      </div>
      <div className="chart-area">
        {weeklyData.map((d, i) => (
          <div className="chart-bar-group" key={i}>
            <div className="chart-bars">
              <div
                className="chart-bar"
                style={{
                  height: `${(d.pv / maxPv) * 100}%`,
                  background: `linear-gradient(180deg, ${barColors[i].pvLight}, ${barColors[i].pv})`,
                  boxShadow: `0 0 12px ${barColors[i].pv}60, 0 4px 12px rgba(0,0,0,0.2)`,
                }}
                title={`PV: ${d.pv}`}
              />
              <div
                className="chart-bar"
                style={{
                  height: `${(d.uv / maxUv) * 100}%`,
                  background: `linear-gradient(180deg, ${barColors[i].uvLight}, ${barColors[i].uv})`,
                  boxShadow: `0 0 12px ${barColors[i].uv}60, 0 4px 12px rgba(0,0,0,0.2)`,
                }}
                title={`UV: ${d.uv}`}
              />
            </div>
            <span className="chart-bar-label">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendChart
