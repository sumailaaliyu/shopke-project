import { useState, useRef } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { loadSettings, saveSettings } from '../../utils/storeSettings'
import './customize.css'

const colours = [
  { name: 'Leaf green', value: '#2F6B3F' },
  { name: 'Marigold', value: '#F2B632' },
  { name: 'Clay red', value: '#C8553D' },
  { name: 'Forest', value: '#14301F' },
]

function Customize() {
  const [saved, setSaved] = useState(loadSettings)
  const [values, setValues] = useState(saved)
  const [logoError, setLogoError] = useState('')
  const fileRef = useRef(null)

  const unsaved = JSON.stringify(values) !== JSON.stringify(saved)

  const update = (field, value) => setValues({ ...values, [field]: value })

  const handleLogo = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Choose an image under 2 MB.')
      return
    }
    setLogoError('')
    const reader = new FileReader()
    reader.onload = () => update('logo', reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    saveSettings(values)
    setSaved(values)
  }

  const reset = () => setValues(saved)

  const darkText = values.color === '#F2B632'

  return (
    <DashboardLayout
      title="Customize store"
      action={
        <div className="cz-save">
          {unsaved && <small>Unsaved changes</small>}
          <Button variant="gold" onClick={handleSave}>Save changes</Button>
        </div>
      }
    >
      <div className="cz">
        <Card>
          <Input
            id="name"
            label="Store name"
            placeholder="Store name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
          />
          <Input
            id="tagline"
            label="Tagline"
            placeholder="Tagline"
            value={values.tagline}
            onChange={(e) => update('tagline', e.target.value)}
          />

          <strong>Brand colour</strong>
          <div className="cz-swatches">
            {colours.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-label={c.name}
                aria-pressed={values.color === c.value}
                className={`cz-swatch${values.color === c.value ? ' on' : ''}`}
                style={{ background: c.value }}
                onClick={() => update('color', c.value)}
              />
            ))}
          </div>

          <strong>Logo</strong>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            hidden
            onChange={handleLogo}
          />
          <button
            type="button"
            className="cz-logo"
            style={{ backgroundImage: values.logo ? `url(${values.logo})` : 'none' }}
            onClick={() => fileRef.current.click()}
          >
            {!values.logo && 'Click to upload your logo'}
          </button>
          {logoError && <small className="field-error">{logoError}</small>}

          <div className="field">
            <label htmlFor="columns">Layout</label>
            <select
              id="columns"
              className="cz-select"
              value={values.columns}
              onChange={(e) => update('columns', Number(e.target.value))}
            >
              <option value={4}>Grid, 4 columns</option>
              <option value={3}>Grid, 3 columns</option>
              <option value={2}>Grid, 2 columns</option>
            </select>
          </div>

          <Button variant="outline" onClick={reset} disabled={!unsaved}>
            Discard changes
          </Button>
        </Card>

        <Card className="cz-preview">
          <div
            className="cz-hero"
            style={{ background: values.color, color: darkText ? '#14301f' : '#fff' }}
          >
            {values.logo && <img src={values.logo} alt="" className="cz-hero-logo" />}
            <h2>{values.name || 'Store name'}</h2>
            <div>{values.tagline || 'Tagline'}</div>
          </div>
          <div className="cz-grid" style={{ '--cols': values.columns }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="cz-item" key={n} />
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Customize