import FeatureCard from './FeatureCard'

const features = [
  {
    title: 'Your own storefront',
    text: 'A clean online shop with your logo, colours and products, live in minutes.',
  },
  {
    title: 'Get paid your way',
    text: 'Bank transfer, card and USSD, with payment details you control.',
  },
  {
    title: 'Sell where customers are',
    text: 'Share your store link on WhatsApp and Instagram and take orders from both.',
  },
]

function FeatureGrid() {
  return (
    <section id="features" className="container features">
      {features.map((f) => (
        <FeatureCard key={f.title} title={f.title} text={f.text} />
      ))}
    </section>
  )
}

export default FeatureGrid