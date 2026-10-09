import { useState } from 'react'
import Reveal from './Reveal'
import Tile from './Tile'
import { BarChart3, LineChart, Package, Receipt, Ship, Users } from './icons'

const MODULES = [
  {
    id: 'sales',
    icon: LineChart,
    title: 'Sales',
    desc: 'Record an enquiry, prepare a quotation from it, and convert the accepted quote into a confirmed sales order in one click.',
    tag: 'Pipeline & Quotes',
  },
  {
    id: 'customers',
    icon: Users,
    title: 'Customers',
    desc: "A buyer directory with country, contact details, status and each buyer's export history.",
    tag: 'Global Directory',
  },
  {
    id: 'products',
    icon: Package,
    title: 'Products',
    desc: 'Your catalog with SKUs, HS codes, units, prices and low-stock warnings.',
    tag: 'Inventory & SKUs',
  },
  {
    id: 'shipments',
    icon: Ship,
    title: 'Shipments',
    desc: 'Container numbers, carriers, ETD and ETA for every consignment.',
    tag: 'Live Logistics',
  },
  {
    id: 'invoices',
    icon: Receipt,
    title: 'Invoices & Payments',
    desc: 'Invoiced, paid and balance due, kept current per buyer.',
    tag: 'Multi-Currency AR',
  },
  {
    id: 'reports',
    icon: BarChart3,
    title: 'Reports',
    desc: 'Monthly sales and payment charts, exported to CSV.',
    tag: 'Export Analytics',
  },
]

export default function Products() {
  const [activeId, setActiveId] = useState('sales')

  return (
    <section id="products">
      <div className="wrap">
        <Reveal className="sec-head" as="div">
          <h2>Everything an export order <em>touches.</em></h2>
          <p>Six modules, each one matching a part of the day-to-day work.</p>
        </Reveal>
        <Reveal className="bento" as="div">
          {MODULES.map((m) => {
            const Icon = m.icon
            const isActive = activeId === m.id
            return (
              <Tile
                key={m.id}
                className={`tile ${isActive ? 'active' : ''}`}
                onClick={() => setActiveId(m.id)}
                onMouseEnter={() => setActiveId(m.id)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveId(m.id)
                  }
                }}
              >
                <div className="tile-top">
                  <div className="tile-icon-wrap">
                    <Icon />
                  </div>
                  <span className="tile-tag">{m.tag}</span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="tile-active-indicator">
                  <span className="tile-active-dot" />
                  <span>{isActive ? 'Active Module' : 'Click or hover to inspect'}</span>
                </div>
              </Tile>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
