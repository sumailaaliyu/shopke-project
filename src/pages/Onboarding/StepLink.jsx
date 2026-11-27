import { useRef } from 'react'
import Button from '../../components/ui/Button'

function StepLink({ data, errors, onChange }) {
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) onChange('logo', URL.createObjectURL(file))
  }

  return (
    <>
      <h2>Choose your store link and logo</h2>
      <p>
        Customers will open your store at this link. You can share it on
        WhatsApp and Instagram.
      </p>

      <div className="field">
        <label htmlFor="slug">Store link</label>
        <div className="slug-box">
          <span className="slug-prefix">shopke.com/store/</span>
          <input
            id="slug"
            placeholder="ade-fabrics"
            value={data.slug}
            onChange={(e) =>
              onChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
            }
          />
        </div>
        {errors.slug && <small className="field-error">{errors.slug}</small>}
        {data.slug && <small className="onb-ok">This link is available</small>}
      </div>

      <strong>Store logo</strong>
      <div className="onb-logo-row">
        <div
          className="onb-logo"
          style={{ backgroundImage: data.logo ? `url(${data.logo})` : 'none' }}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          hidden
          onChange={handleFile}
        />
        <Button variant="outline" onClick={() => fileRef.current.click()}>
          Upload logo
        </Button>
      </div>
      <small>PNG or JPG, up to 2 MB. You can skip this for now.</small>
    </>
  )
}

export default StepLink