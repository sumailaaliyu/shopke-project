import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import './contactinfo.css'

const STORAGE_KEY = 'shopke-contact-info'
const phoneRegex = /^(\+234|0)\d{10}$/
const emailRegex = /^\S+@\S+\.\S+$/

const empty = {
  whatsapp: '',
  phone: '',
  email: '',
  address: '',
  instagram: '',
}

// Read the saved details once, when the page first opens
const loadSaved = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...empty, ...JSON.parse(stored) } : empty
  } catch {
    return empty
  }
}

function ContactInfo() {
  const [saved, setSaved] = useState(loadSaved)
  const [values, setValues] = useState(saved)
  const [errors, setErrors] = useState({})
  const [justSaved, setJustSaved] = useState(false)

  // Whenever the saved details change, write them to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {
      // Storage can be blocked. The page still works without it.
    }
  }, [saved])

  const handleChange = (e) => {
    setJustSaved(false)
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = {}
    if (!phoneRegex.test(values.whatsapp.replace(/\s/g, ''))) {
      found.whatsapp = 'Use +234 or 0 followed by 10 digits.'
    }
    if (values.phone && !phoneRegex.test(values.phone.replace(/\s/g, ''))) {
      found.phone = 'Use +234 or 0 followed by 10 digits.'
    }
    if (values.email && !emailRegex.test(values.email)) {
      found.email = 'Enter a valid email address.'
    }
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSaved(values)
    setJustSaved(true)
  }

  return (
    <DashboardLayout title="Contact info">
      <Card className="ci-card">
        <form onSubmit={handleSubmit} noValidate>
          <Input
            id="whatsapp"
            name="whatsapp"
            label="WhatsApp number"
            placeholder="+234"
            value={values.whatsapp}
            onChange={handleChange}
            error={errors.whatsapp}
          />
          <Input
            id="phone"
            name="phone"
            label="Phone number"
            placeholder="+234"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
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
          />
          <Input
            id="address"
            name="address"
            label="Business address"
            placeholder="Street, city, state"
            value={values.address}
            onChange={handleChange}
          />
          <Input
            id="instagram"
            name="instagram"
            label="Instagram handle"
            placeholder="@yourstore"
            value={values.instagram}
            onChange={handleChange}
          />
          <Button type="submit">Save contact info</Button>{' '}
          {justSaved && <span className="ci-saved">Saved</span>}
        </form>
      </Card>
    </DashboardLayout>
  )
}

export default ContactInfo