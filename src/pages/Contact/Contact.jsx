import { useState, useRef } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import './contact.css'

function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const refs = { name: nameRef, email: emailRef, message: messageRef }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = {}
    if (!values.name.trim()) {
      found.name = 'Enter your name.'
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      found.email = 'Enter a valid email address.'
    }
    if (values.message.trim().length < 10) {
      found.message = 'Write at least 10 characters.'
    }

    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      refs[firstInvalid].current.focus()
      return
    }

    setSent(true)
  }

  return (
    <main className="container contact">
      <h1>Contact us</h1>

      <div className="contact-layout">
        {sent ? (
          <Card>
            <h3>Thank you, {values.name}.</h3>
            <p>We got your message and will reply to {values.email} soon.</p>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Input
              id="name"
              name="name"
              label="Name"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              inputRef={nameRef}
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@business.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              inputRef={emailRef}
            />
            <Input
              id="message"
              name="message"
              label="Message"
              multiline
              placeholder="How can we help?"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              inputRef={messageRef}
            />
            <small>{values.message.length} characters</small>
            <div className="contact-submit">
              <Button type="submit">Send message</Button>
            </div>
          </form>
        )}

        <Card>
          <h3>Reach us</h3>
          <p>
            hello@shopke.com
            <br />
            +234 9155023653
            <br />
            WEB3BRIDGE, Ikorodu, Lagos, Nigeria
          </p>
        </Card>
      </div>
    </main>
  )
}

export default Contact