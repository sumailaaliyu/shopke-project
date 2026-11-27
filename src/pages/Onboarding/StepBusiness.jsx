import Input from '../../components/ui/Input'

function StepBusiness({ data, errors, onChange }) {
  const handle = (e) => onChange(e.target.name, e.target.value)

  return (
    <>
      <h2>Tell us about your business</h2>
      <p>This sets up your storefront. You can change it later.</p>

      <Input
        id="name"
        name="name"
        label="Business name"
        placeholder="e.g. Ade Fabrics"
        value={data.name}
        onChange={handle}
        error={errors.name}
      />
      <Input
        id="sell"
        name="sell"
        label="What do you sell?"
        placeholder="Fashion, food, beauty..."
        value={data.sell}
        onChange={handle}
        error={errors.sell}
      />
      <Input
        id="whatsapp"
        name="whatsapp"
        label="WhatsApp number"
        placeholder="+234"
        value={data.whatsapp}
        onChange={handle}
        error={errors.whatsapp}
      />
      <Input
        id="city"
        name="city"
        label="City and state"
        placeholder="Ibadan, Oyo"
        value={data.city}
        onChange={handle}
        error={errors.city}
      />
    </>
  )
}

export default StepBusiness