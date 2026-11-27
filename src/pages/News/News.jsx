import { useState } from 'react'
import Card from '../../components/ui/Card'
import { posts } from '../../data/news'
import './news.css'

const categories = ['All', ...new Set(posts.map((p) => p.category))]

function News() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const visible = posts.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category
    const text = `${p.title} ${p.summary}`.toLowerCase()
    return matchesCategory && text.includes(query.toLowerCase())
  })

  return (
    <main className="container news">
      <h1>News and updates</h1>
      <p>Product updates, seller stories and tips for growing online.</p>

      <div className="news-controls">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip${c === category ? ' chip-active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
        <input
          className="news-search"
          type="search"
          aria-label="Search posts"
          placeholder="Search posts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <section className="news-grid">
        {visible.map((p) => (
          <Card key={p.id}>
            <div className="news-image" />
            <small className="news-category">{p.category}</small>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
          </Card>
        ))}
      </section>

      {visible.length === 0 && (
        <p>No posts match. Try another category or clear the search.</p>
      )}
    </main>
  )
}

export default News