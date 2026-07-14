import React from 'react'

interface MenuItem {
  icon: string
  label: string
  active?: boolean
  badge?: string
}

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: '概览',
    items: [{ icon: '📊', label: '仪表盘', active: true }],
  },
  {
    title: '系统管理',
    items: [
      { icon: '👤', label: '用户管理' },
      { icon: '📋', label: '角色管理' },
      { icon: '🔒', label: '权限管理' },
    ],
  },
  {
    title: '业务管理',
    items: [
      { icon: '📦', label: '商品管理', badge: '12' },
      { icon: '📝', label: '订单管理' },
      { icon: '🏷️', label: '分类管理' },
    ],
  },
  {
    title: '其他',
    items: [
      { icon: '⚙️', label: '系统设置' },
      { icon: '📄', label: '操作日志' },
    ],
  },
]

const Sidebar: React.FC = () => {
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
        {menuSections.map((section, idx) => (
          <div className="menu-section" key={idx}>
            <div className="menu-section-title">{section.title}</div>
            {section.items.map((item, iidx) => (
              <div
                className={`menu-item${item.active ? ' active' : ''}`}
                key={`${idx}-${iidx}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          ✦ 如意国风 · v1.0.0 ✦
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
