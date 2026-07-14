/**
 * ProChart — 专业图表组件
 * 封装 Recharts，提供统一配置接口
 *
 * 使用: <ProLineChart data={[]} xKey="day" lines={[{key:'pv',color:'#6366f1'}]} />
 */
import React from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from 'recharts'

/* ====================================================
   通用 Props
   ==================================================== */
interface BaseChartProps {
  data: Record<string, any>[]
  height?: number
  title?: string
  className?: string
}

interface LineConfig {
  key: string
  color: string
  name?: string
  type?: 'monotone' | 'linear' | 'step'
  area?: boolean
}

interface BarConfig {
  key: string
  color: string
  name?: string
  stackId?: string
  radius?: [number, number, number, number]
}

/* ====================================================
   自定义 Tooltip — 玻璃拟态风格
   ==================================================== */
const GlassTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(15,15,42,0.85)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      padding: '12px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{entry.name}:</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ====================================================
   ProLineChart — 折线图 / 面积图
   ==================================================== */
interface ProLineChartProps extends BaseChartProps {
  xKey: string
  lines: LineConfig[]
  showGrid?: boolean
  smooth?: boolean
  legend?: boolean
}

export const ProLineChart: React.FC<ProLineChartProps> = ({
  data, xKey, lines, height = 260, title,
  showGrid = true, smooth = true, legend = true,
}) => (
  <ChartWrapper title={title} height={height}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />}
        <XAxis dataKey={xKey} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<GlassTooltip />} />
        {legend && <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />}
        {lines.map((l) => (
          l.area ? (
            <Area
              key={l.key} type={smooth ? 'monotone' : 'linear'}
              dataKey={l.key} name={l.name || l.key}
              stroke={l.color} fill={l.color} fillOpacity={0.1}
              strokeWidth={2} dot={false} activeDot={{ r: 4, fill: l.color }}
            />
          ) : (
            <Line
              key={l.key} type={smooth ? 'monotone' : 'linear'}
              dataKey={l.key} name={l.name || l.key}
              stroke={l.color} strokeWidth={2} dot={false}
              activeDot={{ r: 4, fill: l.color, strokeWidth: 0 }}
            />
          )
        ))}
      </LineChart>
    </ResponsiveContainer>
  </ChartWrapper>
)

/* ====================================================
   ProBarChart — 柱状图
   ==================================================== */
interface ProBarChartProps extends BaseChartProps {
  xKey: string
  bars: BarConfig[]
  showGrid?: boolean
  legend?: boolean
}

export const ProBarChart: React.FC<ProBarChartProps> = ({
  data, xKey, bars, height = 260, title,
  showGrid = true, legend = true,
}) => (
  <ChartWrapper title={title} height={height}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        onClick={undefined}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />}
        <XAxis dataKey={xKey} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<GlassTooltip />} cursor={false} />
        {legend && <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />}
        {bars.map((b) => (
          <Bar
            key={b.key} dataKey={b.key} name={b.name || b.key}
            fill={b.color} radius={b.radius || [4, 4, 0, 0]}
            stackId={b.stackId}
            maxBarSize={36}
            isAnimationActive={true}
            animationDuration={600}
            animationEasing="cubic-bezier(0.22, 1, 0.36, 1)"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </ChartWrapper>
)

/* ====================================================
   ProPieChart — 饼图 / 环形图
   ==================================================== */
interface ProPieChartProps {
  data: { name: string; value: number; color: string }[]
  height?: number
  title?: string
  innerRadius?: number
  outerRadius?: number
  donut?: boolean
}

export const ProPieChart: React.FC<ProPieChartProps> = ({
  data, height = 280, title, innerRadius, outerRadius = 80, donut = false,
}) => (
  <ChartWrapper title={title} height={height}>
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
      <PieChart width={300} height={height - 30}>
        <Pie
          data={data} cx="50%" cy="50%"
          innerRadius={donut ? (innerRadius || 50) : 0}
          outerRadius={outerRadius}
          dataKey="value" nameKey="name"
          paddingAngle={2}
          stroke="none"
          isAnimationActive={true}
          animationDuration={800}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<GlassTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, color: '#94a3b8' }}
          formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
        />
      </PieChart>
    </div>
  </ChartWrapper>
)

/* ====================================================
   ProGauge — 进度环图
   ==================================================== */
interface ProGaugeProps {
  value: number
  max?: number
  label?: string
  color?: string
  size?: number
  title?: string
}

export const ProGauge: React.FC<ProGaugeProps> = ({
  value, max = 100, label, color = '#6366f1', size = 120, title,
}) => {
  const pct = Math.min(value / max, 1)
  const angle = pct * 360

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {title && <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{title}</span>}
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 120 120">
          {/* 背景环 */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          {/* 进度环 */}
          <circle
            cx="60" cy="60" r="52" fill="none"
            stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${angle * 0.29} 400`}
            transform="rotate(-90 60 60)"
            style={{ filter: `drop-shadow(0 0 6px ${color}60)`, transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9' }}>{Math.round(pct * 100)}%</span>
          {label && <span style={{ fontSize: 11, color: '#64748b' }}>{label}</span>}
        </div>
      </div>
    </div>
  )
}

/* ====================================================
   包装容器
   ==================================================== */
const ChartWrapper: React.FC<{ title?: string; height: number; children: React.ReactNode }> = ({
  title, height, children,
}) => (
  <div>
    {title && (
      <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', marginBottom: 12, letterSpacing: 0.3 }}>
        {title}
      </div>
    )}
    <div style={{ width: '100%', height }}>
      {children}
    </div>
  </div>
)
