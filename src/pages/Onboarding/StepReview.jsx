function StepReview({ data, errors, onChange, onEdit }) {
  const rows = [
    { label: 'Business name', value: data.name, step: 1 },
    { label: 'What you sell', value: data.sell, step: 1 },
    { label: 'WhatsApp number', value: data.whatsapp, step: 1 },
    { label: 'Location', value: data.city, step: 1 },
    { label: 'Store link', value: `shopke.com/store/${data.slug}`, step: 2 },
  ]

  return (
    <>
      <h2>Review and open your store</h2>
      <p>
        Check your details. Everything here can be changed later from your
        dashboard.
      </p>

      {rows.map((row) => (
        <div className="onb-row" key={row.label}>
          <div>
            <small>{row.label}</small>
            <br />
            {row.value || 'Not set'}
          </div>
          <button className="onb-edit" onClick={() => onEdit(row.step)}>
            Edit
          </button>
        </div>
      ))}

      <label className="onb-terms">
        <input
          type="checkbox"
          checked={data.terms}
          onChange={(e) => onChange('terms', e.target.checked)}
        />{' '}
        I agree to the Terms and Privacy Policy
      </label>
      {errors.terms && <small className="field-error">{errors.terms}</small>}
    </>
  )
}

export default StepReview