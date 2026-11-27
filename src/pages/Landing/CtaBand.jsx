import { Link } from 'react-router-dom'

function CtaBand() {
  return (
    <section className="cta-band">
      <h2>Ready to open your shop?</h2>
      <p>Sign up with Google and set up in three steps.</p>
      <Link to="/signup" className="btn btn-primary">Get started</Link>
    </section>
  )
}

export default CtaBand