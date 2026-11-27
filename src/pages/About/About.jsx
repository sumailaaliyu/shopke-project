import Card from '../../components/ui/Card'
import { values, team } from '../../data/about'
import './about.css'

function About() {
  return (
    <main className="container about">
      <h1 className="about-title">
        We help Nigerian businesses sell online with confidence.
      </h1>
      <p className="about-mission">
        Shopke exists so any seller, from a fabric trader in Ibadan to a baker
        in Lagos, can run a real online shop without hiring a developer.
      </p>

      <section className="about-grid">
        {values.map((v) => (
          <Card key={v.title}>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </Card>
        ))}
      </section>

      <h2 className="about-heading">The team</h2>
      <section className="about-grid">
        {team.map((m) => (
          <Card key={m.name}>
            <div className="about-photo" />
            <strong>{m.name}</strong>
            <div>{m.role}</div>
          </Card>
        ))}
      </section>
    </main>
  )
}

export default About