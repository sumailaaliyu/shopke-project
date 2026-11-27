import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="container hero">
      <div>
        <h1>Your shop, online in minutes.</h1>
        <p className="hero-text">
          Shopke helps small and mid-sized Nigerian businesses sell online with
          a storefront of their own.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-gold">Create your store</Link>
          <a href="#features" className="btn btn-outline">See how it works</a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="card hero-order">
          <strong>New order</strong>
          <br />
          Ankara tote bag · ₦12,500
        </div>
      </div>
    </section>
  )
}

export default Hero