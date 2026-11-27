import { useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'
import { orders as initialOrders } from '../../data/orders'
import { formatNaira } from '../../utils/format'
import './orders.css'

const filters = ['All', 'Pending', 'Paid', 'Delivered']
const statuses = ['Pending', 'Paid', 'Delivered']

function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [filter, setFilter] = useState('All')

  const visible = orders.filter((o) => filter === 'All' || o.status === filter)
  const total = visible.reduce((sum, o) => sum + o.total, 0)

  const changeStatus = (id, status) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  return (
    <DashboardLayout title="Orders">
      <div className="orders-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`chip${f === filter ? ' chip-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="orders-total">
        {visible.length} {visible.length === 1 ? 'order' : 'orders'} ·{' '}
        {formatNaira(total)}
      </p>

      <Card className="orders-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{formatNaira(o.total)}</td>
                <td>
                  <span className={`badge badge-${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>{' '}
                  <select
                    aria-label={`Status for ${o.id}`}
                    className="orders-select"
                    value={o.status}
                    onChange={(e) => changeStatus(o.id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p>No {filter.toLowerCase()} orders yet.</p>
        )}
      </Card>
    </DashboardLayout>
  )
}

export default Orders