import { Link } from 'react-router-dom'
import './marketing.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <strong>Shopke</strong>
        <span>
          <Link to="/about">About</Link> · <Link to="/news">News</Link> ·{' '}
          <Link to="/contact">Contact</Link> · Terms · Privacy
        </span>
      </div>
    </footer>
  )
}

export default Footer