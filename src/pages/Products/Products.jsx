import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'
import { formatNaira } from '../../utils/format'
import './products.css'

function Products({ products, setProducts }) {
  const { storeId } = useParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const categories = [...new Set(products.map((p) => p.category))]

  const visible = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = !category || p.category === category
    return matchesName && matchesCategory
  })

  const remove = (id) => {
    setProducts(products.filter((p) => p.id !== id))
    setConfirmId(null)
  }

  const stockLabel = (stock) => {
    if (stock === 0) return 'Out of stock'
    if (stock < 5) return <span className="low-badge">Low stock ({stock})</span>
    return 'In stock'
  }

  return (
    <DashboardLayout
      title="Products"
      action={
        <Link to={`/s/${storeId}/products/new`} className="btn btn-gold">
          Add product
        </Link>
      }
    >
      <div className="prod-controls">
        <input
          className="prod-search"
          type="search"
          aria-label="Search products"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="prod-select"
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <Card className="prod-card">
        <table className="prod-table">
          <tbody>
            {visible.map((p) => (
              <tr key={p.id}>
                <td>
                  <div
                    className="prod-thumb"
                    style={{ backgroundImage: p.image ? `url(${p.image})` : 'none' }}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{formatNaira(p.price)}</td>
                <td>{stockLabel(p.stock)}</td>
                <td>
                  <Link to={`/s/${storeId}/products/${p.id}`} className="prod-edit">
                    Edit
                  </Link>
                </td>
                <td>
                  {confirmId === p.id ? (
                    <span className="prod-confirm">
                      Delete?{' '}
                      <button className="chip" onClick={() => remove(p.id)}>Yes</button>{' '}
                      <button className="chip" onClick={() => setConfirmId(null)}>No</button>
                    </span>
                  ) : (
                    <button className="chip" onClick={() => setConfirmId(p.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p>No products match. Clear the search or add a product.</p>
        )}
      </Card>
    </DashboardLayout>
  )
}

export default Products