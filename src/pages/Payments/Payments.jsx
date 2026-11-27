import { useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { banks } from '../../data/banks'
import './payments.css'

function Payments() {
  const [values, setValues] = useState({ bank: '', number: '', name: '' })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)
  const [methods, setMethods] = useState({
    'Bank transfer': true,
    'Card payment': false,
    USSD: false,
    'Pay on delivery': false,
  })
  const [methodError, setMethodError] = useState('')

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Digits only: anything else is removed as the seller types
  const handleNumber = (e) => {
    setValues({ ...values, number: e.target.value.replace(/\D/g, '') })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = {}
    if (!values.bank) found.bank = 'Choose your bank.'
    if (values.number.length !== 10) {
      found.number = 'Account number must be 10 digits.'
    }
    if (!values.name.trim()) found.name = 'Enter the account name.'

    setErrors(found)
    if (Object.keys(found).length > 0) return
    setSaved(true)
  }

  const toggleMethod = (method) => {
    const next = { ...methods, [method]: !methods[method] }
    // At least one method must stay selected
    if (!Object.values(next).some(Boolean)) {
      setMethodError('Keep at least one payment method on.')
      return
    }
    setMethodError('')
    setMethods(next)
  }

  return (
    <DashboardLayout title="Payments">
      <div className="pay">
        <Card>
          <h3>Bank account</h3>

          {saved ? (
            <>
              <p>
                <strong>{values.bank}</strong>
                <br />
                {'******' + values.number.slice(-4)}
                <br />
                {values.name}
              </p>
              <Button variant="outline" onClick={() => setSaved(false)}>
                Edit
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="bank">Bank name</label>
                <select
                  id="bank"
                  name="bank"
                  className="pay-select"
                  value={values.bank}
                  onChange={handleChange}
                >
                  <option value="">Choose your bank</option>
                  {banks.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.bank && (
                  <small className="field-error">{errors.bank}</small>
                )}
              </div>

              <Input
                id="number"
                name="number"
                label="Account number"
                inputMode="numeric"
                maxLength={10}
                placeholder="10 digits"
                value={values.number}
                onChange={handleNumber}
                error={errors.number}
              />
              <Input
                id="name"
                name="name"
                label="Account name"
                placeholder="As shown on your account"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Button type="submit">Save payment details</Button>
            </form>
          )}
        </Card>

        <Card>
          <h3>Ways customers can pay</h3>
          {Object.keys(methods).map((m) => (
            <label className="pay-method" key={m}>
              <input
                type="checkbox"
                checked={methods[m]}
                onChange={() => toggleMethod(m)}
              />{' '}
              {m}
            </label>
          ))}
          {methodError && <small className="field-error">{methodError}</small>}
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Payments