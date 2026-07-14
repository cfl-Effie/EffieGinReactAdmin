/**
 * ProCard — 通用玻璃拟态卡片
 * 用法: <ProCard title="标题" extra={<a>更多</a>}>内容</ProCard>
 */
import React from 'react'

interface ProCardProps {
  title?: React.ReactNode
  extra?: React.ReactNode
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  bordered?: boolean
  hoverable?: boolean
  padding?: string | number
}

const cardStyle: Record<string, React.CSSProperties> = {
  wrapper: {
    background: 'var(--color-bg-glass, rgba(255,255,255,0.05))',
    backdropFilter: 'blur(20px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
    border: '1px solid var(--color-border-glass, rgba(255,255,255,0.1))',
    borderRadius: 'var(--radius-md, 14px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 22px 0',
  },
  title: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--color-text-primary, #f1f5f9)',
    letterSpacing: '0.3px',
  },
  body: {
    padding: '18px 22px',
  },
}

const ProCard: React.FC<ProCardProps> = ({
  title, extra, children, className = '',
  style = {}, bordered = true, hoverable = true, padding,
}) => {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      className={className}
      style={{
        ...cardStyle.wrapper,
        ...(bordered ? {} : { borderColor: 'transparent' }),
        ...(hoverable && hovered ? {
          borderColor: 'var(--color-border-active, rgba(99,102,241,0.4))',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          transform: 'translateY(-2px)',
        } : {}),
        ...style,
      }}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
    >
      {title && (
        <div style={cardStyle.header}>
          <span style={cardStyle.title}>{title}</span>
          {extra && <span style={{ fontSize: 13, color: 'var(--color-primary-light)' }}>{extra}</span>}
        </div>
      )}
      <div style={{
        ...cardStyle.body,
        ...(title ? {} : { padding: '22px' }),
        ...(padding ? { padding } : {}),
      }}>
        {children}
      </div>
    </div>
  )
}

export default ProCard
