import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import './auth.css'

function AuthPage({ initialMode = 'signup' }) {
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const emailRef = useRef(null)
  const navigate = useNavigate()

  // Focus the email field on load and every time the toggle changes
  useEffect(() => {
    emailRef.current.focus()
  }, [mode])

  const mockGoogle = () => navigate('/onboarding')

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = {}
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      found.email = 'Enter a valid email address.'
    }
    if (password.length < 8) {
      found.password = 'Password must be at least 8 characters.'
    }
    setErrors(found)
    if (Object.keys(found).length > 0) return

    navigate(mode === 'signup' ? '/onboarding' : '/s/ei344j3o3')
  }

  const isSignup = mode === 'signup'

  return (
    <div className="auth">
      <div className="auth-left">
        <Link to="/" className="auth-logo">Shopke</Link>
        <h1>Welcome to Shopke</h1>

        <div className="auth-tabs">
          <button
            className={`btn ${isSignup ? 'btn-primary' : 'auth-tab'}`}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
          <button
            className={`btn ${!isSignup ? 'btn-primary' : 'auth-tab'}`}
            onClick={() => setMode('signin')}
          >
            Sign in
          </button>
        </div>

        <Button variant="outline" full className="auth-google" onClick={mockGoogle}>
          Continue with Google
        </Button>
        <p className="auth-or">or use email</p>

        <form onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            type="email"
            label="Business email"
            placeholder="you@business.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            inputRef={emailRef}
          />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <label className="auth-show">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{' '}
            Show password
          </label>
          <Button type="submit" full>
            {isSignup ? 'Create account' : 'Sign in'}
          </Button>
        </form>
      </div>

      <div className="auth-right" aria-hidden="true">
        <div className="auth-sun" />
        <div className="auth-block" />
        <div className="auth-note">
          <strong>Order received</strong>
          <br />
          Ankara tote bag · ₦12,500
        </div>
      </div>
    </div>
  )
}

export default AuthPage