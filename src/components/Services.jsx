import Reveal from './Reveal'
import { BarChart3, FileText, Receipt, Ship } from './icons'

export default function Services() {
  return (
    <section id="services" className="alt">
      <div className="wrap">
        <Reveal className="sec-head" as="div">
          <h2>The documents your buyers <em>expect.</em></h2>
          <p>Generated from the order record, so nothing is retyped.</p>
        </Reveal>
        <Reveal className="svc" as="div">
          <div className="svc-row">
            <h3>
              <FileText />
              Proforma quotation
            </h3>
            <p>
              Company header, buyer details, an itemised table with HS codes, Incoterms, bank details and a signature block.
            </p>
            <span className="tag">Print or save as PDF</span>
          </div>
          <div className="svc-row">
            <h3>
              <Receipt />
              Commercial invoice
            </h3>
            <p>
              A printable invoice built from the sales order, with the paid amount and balance due shown beside it.
            </p>
            <span className="tag">Print</span>
          </div>
          <div className="svc-row">
            <h3>
              <Ship />
              Shipment tracking
            </h3>
            <p>
              A timeline for each consignment by sea, air or truck, from departure to arrival.
            </p>
            <span className="tag">Live status</span>
          </div>
          <div className="svc-row">
            <h3>
              <BarChart3 />
              Business report
            </h3>
            <p>
              Sales by month, category breakdown and payment status in one view, with a clean CSV download.
            </p>
            <span className="tag">CSV export</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
