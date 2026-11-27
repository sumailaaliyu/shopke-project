import { useState, useEffect } from 'react'
import { formatNaira } from '../../utils/format'
import { loadSettings } from '../../utils/storeSettings'
import { loadContactInfo, toWhatsAppNumber } from '../../utils/contactInfo'
import './storefront.css'

// Used until the seller saves a WhatsApp number on the Contact info page
const DEMO_NUMBER = '2348012345678'

function Storefront({ products }) {
  const [category, setCategory] = useState('All')
  const settings = loadSettings()
  const contact = loadContactInfo()

  const number = toWhatsAppNumber(contact.whatsapp) || DEMO_NUMBER
  const whatsappLink = (message) =>
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`

  // Put the store name in the browser tab
  useEffect(() => {
    document.title = `${settings.name} | Shopke`
    return () => {
      document.title = 'Shopke'
    }
  }, [settings.name])

  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const visible = products.filter(
    (p) => category === 'All' || p.category === category
  )

  const darkText = settings.color === '#F2B632'
  const footerParts = [
    settings.name,
    contact.phone || contact.whatsapp,
    contact.address,
    'Powered by Shopke',
  ].filter(Boolean)

  return (
    <div className="sf">
      <header className="sf-header">
        <div className="container sf-header-inner">
          <strong className="sf-name">
            {settings.logo && <img src={settings.logo} alt="" className="sf-logo" />}
            {settings.name}
          </strong>
          <a
            className="btn btn-gold"
            href={whatsappLink(`Hi ${settings.name}, I would like to place an order.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order on WhatsApp
          </a>
        </div>
      </header>

      <section
        className="sf-hero"
        style={{ background: settings.color, color: darkText ? '#14301f' : '#fff' }}
      >
        <div className="container">
          <h1>{settings.tagline}</h1>
          <p>Order in a message. We reply fast.</p>
        </div>
      </section>

      <main className="container sf-main">
        <div className="sf-chips">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip${c === category ? ' chip-active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="sf-grid" style={{ '--cols': settings.columns }}>
          {visible.map((p) => (
            <article className="sf-product" key={p.id}>
              <div
                className="sf-image"
                style={{ backgroundImage: p.image ? `url(${p.image})` : 'none' }}
              />
              <strong>{p.name}</strong>
              <div>{formatNaira(p.price)}</div>
              <a
                className="btn btn-outline sf-order"
                href={whatsappLink(
                  `Hi, I want to order ${p.name} (${formatNaira(p.price)}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order
              </a>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p>No products in this category yet. Check back soon.</p>
        )}
      </main>

      <footer className="sf-footer">
        <div className="container">{footerParts.join(' · ')}</div>
      </footer>
    </div>
  )
}

export default Storefront