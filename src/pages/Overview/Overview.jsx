import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'
import { orders } from '../../data/orders'
import { formatNaira } from '../../utils/format'
import './overview.css'

const checklist = [
  'Add your first product',
  'Set up payment details',
  'Customize your storefront',
]

function Overview({ products }) {
  const { storeId } = useParams()
  const [copied, setCopied] = useState(false)
  const [done, setDone] = useState([products.length > 0, false, false])

  const link = `shopke.com/s/${storeId}`

  // Reset "Copied" after 2 seconds, and clear the timer if we leave early
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${link}`)
    setCopied(true)
  }

  const toggle = (index) =>
    setDone(done.map((d, i) => (i === index ? !d : d)))

  const stats = [
    { label: 'Orders', value: orders.length },
    { label: 'Products', value: products.length },
    { label: 'Visits', value: 342 },
  ]

  return (
    <DashboardLayout
      title="Ade Fabrics"
      action={
        <Link to="/store/ade-fabrics" className="btn btn-gold">
          View storefront
        </Link>
      }
    >
      <div className="ov-link">
        <span>{link}</span>
        <button className="chip" onClick={copyLink}>
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>

      <section className="ov-stats">
        {stats.map((s) => (
          <Card key={s.label}>
            {s.label}
            <h2>{s.value || 0}</h2>
          </Card>
        ))}
      </section>

      <section className="ov-lower">
        <Card>
          <div className="ov-head">
            <h3>Products</h3>
            <Link to={`/s/${storeId}/products/new`} className="btn btn-primary">
              Add product
            </Link>
          </div>
          {products.slice(0, 3).map((p) => (
            <div className="ov-row" key={p.id}>
              <span>{p.name}</span>
              <span>{formatNaira(p.price)}</span>
              <span>{p.stock > 0 ? 'In stock' : 'Out of stock'}</span>
            </div>
          ))}
          {products.length === 0 && <p>No products yet. Add your first one.</p>}
        </Card>

        <Card>
          <h3>Finish setting up</h3>
          <p>{done.filter(Boolean).length} of 3 done</p>
          {checklist.map((item, i) => (
            <label className="ov-check" key={item}>
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => toggle(i)}
              />{' '}
              {item}
            </label>
          ))}
        </Card>
      </section>
    </DashboardLayout>
  )
}

export default Overview