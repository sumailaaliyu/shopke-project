import { useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import './dashboard.css'

const items = [
  { label: 'Overview', path: '' },
  { label: 'Products', path: '/products' },
  { label: 'Orders', path: '/orders' },
  { label: 'Payments', path: '/payments' },
  { label: 'Customize store', path: '/customize' },
  { label: 'Contact info', path: '/contact-info' },
  { label: 'Settings', path: '/settings' },
]

// title: page heading, action: optional button, children: page content
function DashboardLayout({ title, action, children }) {
  const { storeId } = useParams()
  const [open, setOpen] = useState(false)

  return (
    <div className="dash">
      <aside className={`dash-side${open ? ' open' : ''}`}>
        <Link to="/" className="dash-logo">Shopke</Link>
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={`/s/${storeId}${item.path}`}
            end={item.path === ''}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </aside>

      <main className="dash-main">
        <div className="dash-top">
          <div className="dash-title">
            <button
              className="dash-menu"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
            <h1>{title}</h1>
          </div>
          {action}
        </div>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout