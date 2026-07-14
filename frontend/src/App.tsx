import React from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import './styles/layout.css'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App
