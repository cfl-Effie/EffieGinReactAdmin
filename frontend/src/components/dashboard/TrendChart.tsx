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

const colors = [
  { pv: ['#4f6ef7', '#8196fa'], uv: ['#34d399', '#6ee7b7'] },
  { pv: ['#a78bfa', '#c4b5fd'], uv: ['#22d3ee', '#67e8f9'] },
  { pv: ['#f472b6', '#f9a8d4'], uv: ['#f5b342', '#fcd34d'] },
]

const TrendChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <span className="chart-card-title">📈 本周访问趋势</span>
        <div className="chart-card-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#4f6ef7' }} />
            访问量 (PV)
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#34d399' }} />
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
                  background: `linear-gradient(180deg, ${colors[i % 3].pv[0]}, ${colors[i % 3].pv[1]})`,
                  boxShadow: `0 2px 6px ${colors[i % 3].pv[0]}40`,
                }}
                title={`PV: ${d.pv}`}
              />
              <div
                className="chart-bar"
                style={{
                  height: `${(d.uv / maxUv) * 100}%`,
                  background: `linear-gradient(180deg, ${colors[i % 3].uv[0]}, ${colors[i % 3].uv[1]})`,
                  boxShadow: `0 2px 6px ${colors[i % 3].uv[0]}40`,
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
