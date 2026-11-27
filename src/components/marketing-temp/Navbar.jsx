import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../ui/ui.css'
import './marketing.css'

const links = [
  { to: '/', label: 'Features', plain: true },
  { to: '/about', label: 'About' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="container navbar">
      <Link to="/" className="navbar-logo">Shopke</Link>

      <nav className={`navbar-links${open ? ' open' : ''}`}>
        {links.map((item) =>
          item.plain ? (
            <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      <div className="navbar-actions">
        <Link to="/signin" className="navbar-signin">Sign in</Link>
        <Link to="/signup" className="btn btn-primary">Start for free</Link>
        <button
          className="navbar-menu"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
    </header>
  )
}

export default Navbar