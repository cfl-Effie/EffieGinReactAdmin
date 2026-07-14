import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-logo" onClick={() => navigate('/dashboard')}>如</div>
        <div className="header-title">
          <span>如意</span> 后台管理系统
        </div>
      </div>
      <div className="header-right">
        <div className="header-actions">
          <button className="header-icon-btn" title="搜索">🔍</button>
          <button className="header-icon-btn" title="消息通知">
            🔔
            <span className="badge" />
          </button>
          <button className="header-icon-btn" title="全屏">⛶</button>
        </div>
        <div className="header-user" onClick={() => navigate('/other/settings')}>
          <div className="header-avatar">菲</div>
          <span className="header-user-name">小菲</span>
        </div>
      </div>
    </header>
  )
}

export default Header
