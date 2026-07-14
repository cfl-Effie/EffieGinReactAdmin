import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { menuConfig } from '@/config/routes'
import type { MenuItem as MenuItemType } from '@/types'

/** 递归渲染菜单项 */
const MenuItem: React.FC<{
  item: MenuItemType
  activePath: string
  onClick: (path: string) => void
}> = ({ item, activePath, onClick }) => {
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.path === activePath
  const isParentActive = hasChildren && item.children!.some(c => c.path === activePath)

  const [expanded, setExpanded] = useState(isParentActive)

  const handleClick = () => {
    if (item.path) {
      onClick(item.path)
    } else if (hasChildren) {
      setExpanded(!expanded)
    }
  }

  return (
    <>
      <div
        className={`menu-item${isActive || isParentActive ? ' active' : ''}`}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className="menu-expand-icon">{expanded ? '▼' : '▶'}</span>
        )}
        {!hasChildren && <span className="menu-icon">{item.icon}</span>}
        {(hasChildren && !isParentActive) && <span className="menu-icon" style={{ marginLeft: 0 }}>{item.icon}</span>}
        {!hasChildren && <span className="menu-label">{item.label}</span>}
        {hasChildren && <span className="menu-label">{item.label}</span>}
        {item.badge && !hasChildren && <span className="menu-badge">{item.badge}</span>}
      </div>
      {hasChildren && expanded && (
        <div className="menu-children">
          {item.children!.map((child) => (
            <div
              key={child.key}
              className={`menu-item menu-sub${child.path === activePath ? ' active' : ''}`}
              onClick={() => child.path && onClick(child.path)}
              style={{ paddingLeft: '44px' }}
            >
              <span className="menu-icon">{child.icon}</span>
              <span className="menu-label">{child.label}</span>
              {child.badge && <span className="menu-badge">{child.badge}</span>}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = (path: string) => {
    navigate(path)
  }

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">如</div>
        <div className="sidebar-brand-text">
          如意管理
          <small>EffieGin Admin</small>
        </div>
      </div>
      <div className="sidebar-menu">
        {menuConfig.map((section) => (
          <MenuItem
            key={section.key}
            item={section}
            activePath={location.pathname}
            onClick={handleMenuClick}
          />
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-info">✦ 如意国风 · v1.0.0 ✦</div>
      </div>
    </aside>
  )
}

export default Sidebar
