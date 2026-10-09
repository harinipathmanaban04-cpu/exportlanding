

export default function About() {
  return (
    <section id="about" className="alt">
      <div className="wrap about-grid">
        <div>
          <h2>Built for businesses that sell across <em>borders.</em></h2>
          <p>
            Export paperwork usually lives in spreadsheets, email threads and a few people's heads. Master Export Pro puts it in a single system, so a buyer's details are typed once and appear on the enquiry, the quotation, the shipment and the invoice.
          </p>
          <p>
            It runs on the MERN stack, with a React front end, an Express API and MongoDB behind it.
          </p>
        </div>
        <div className="carry">
          <h3>What carries forward automatically</h3>
          <p>Enter these once on the customer or product, and they follow the order.</p>
          <div className="chips">
            <span className="chip">Customer details</span>
            <span className="chip">Products</span>
            <span className="chip">Quantities</span>
            <span className="chip">Unit prices</span>
            <span className="chip">Currency</span>
            <span className="chip">Incoterms</span>
            <span className="chip">Payment terms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
