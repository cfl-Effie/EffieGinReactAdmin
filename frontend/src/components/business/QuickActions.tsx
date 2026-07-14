import React from 'react'

const actions = [
  { icon: '➕', label: '新建用户' },
  { icon: '📦', label: '添加商品' },
  { icon: '📊', label: '导出报表' },
  { icon: '📝', label: '发布公告' },
]

const QuickActions: React.FC = () => {
  return (
    <div className="quick-actions-card">
      <div className="quick-actions-title">快捷操作</div>
      <div className="quick-actions-grid">
        {actions.map((action, i) => (
          <button className="quick-action-btn" key={i}>
            <span className="quick-action-icon">{action.icon}</span>
            <span className="quick-action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
