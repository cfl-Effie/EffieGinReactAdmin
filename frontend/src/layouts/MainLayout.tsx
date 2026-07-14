import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import '@/styles/theme.css'
import './style.css'

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
