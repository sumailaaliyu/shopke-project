import Card from '../../components/ui/Card'

function FeatureCard({ title, text }) {
  return (
    <Card>
      <div className="feature-icon" />
      <h3>{title}</h3>
      <p>{text}</p>
    </Card>
  )
}

export default FeatureCard