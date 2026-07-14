import React from 'react'

interface PagePlaceholderProps {
  title: string
  icon: string
  description?: string
}

const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ title, icon, description }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '20px',
      animation: 'slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.08))',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: '22px',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #f1f5f9, #818cf8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '14px',
          maxWidth: '400px',
          textAlign: 'center',
          lineHeight: 1.8,
        }}>
          {description}
        </p>
      )}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '8px',
      }}>
        <span style={{
          padding: '6px 20px',
          borderRadius: '20px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          color: '#818cf8',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}>🚀 开发中</span>
        <span style={{
          padding: '6px 20px',
          borderRadius: '20px',
          background: 'rgba(6,182,212,0.1)',
          border: '1px solid rgba(6,182,212,0.2)',
          color: '#22d3ee',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}>🔧 Mock 数据</span>
      </div>
    </div>
  )
}

export default PagePlaceholder
