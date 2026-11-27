import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StepBusiness from './StepBusiness'
import StepLink from './StepLink'
import StepReview from './StepReview'
import './onboarding.css'

const phoneRegex = /^(\+234|0)\d{10}$/

const toSlug = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function Onboarding() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    name: '',
    sell: '',
    whatsapp: '',
    city: '',
    slug: '',
    logo: null,
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const updateField = (field, value) => {
    setData((prev) => {
      const next = { ...prev, [field]: value }
      // Suggest a store link from the business name until the seller edits it
      if (field === 'name' && (!prev.slug || prev.slug === toSlug(prev.name))) {
        next.slug = toSlug(value)
      }
      return next
    })
  }

  const validate = () => {
    const found = {}
    if (step === 1) {
      if (!data.name.trim()) found.name = 'Enter your business name.'
      if (!data.sell.trim()) found.sell = 'Tell us what you sell.'
      if (!phoneRegex.test(data.whatsapp.replace(/\s/g, ''))) {
        found.whatsapp = 'Use a Nigerian number like +2348012345678.'
      }
      if (!data.city.trim()) found.city = 'Enter your city and state.'
    }
    if (step === 2 && !data.slug) {
      found.slug = 'Choose a store link.'
    }
    if (step === 3 && !data.terms) {
      found.terms = 'Accept the Terms and Privacy Policy to continue.'
    }
    return found
  }

  const handleNext = () => {
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    if (step < 3) {
      setStep(step + 1)
    } else {
      console.log('Onboarding data:', data)
      navigate('/s/ei344j3o3')
    }
  }

  const handleBack = () => {
    setErrors({})
    setStep(step - 1)
  }

  const goToStep = (n) => {
    setErrors({})
    setStep(n)
  }

  return (
    <div className="onb">
      <Card>
        <strong>Step {step} of 3</strong>
        <div className="onb-bar">
          <div className="onb-bar-fill" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        {step === 1 && <StepBusiness data={data} errors={errors} onChange={updateField} />}
        {step === 2 && <StepLink data={data} errors={errors} onChange={updateField} />}
        {step === 3 && (
          <StepReview data={data} errors={errors} onChange={updateField} onEdit={goToStep} />
        )}

        <div className="onb-actions">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>Back</Button>
          )}
          <Button
            variant={step === 3 ? 'gold' : 'primary'}
            full
            onClick={handleNext}
          >
            {step === 3 ? 'Open my dashboard' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Onboarding