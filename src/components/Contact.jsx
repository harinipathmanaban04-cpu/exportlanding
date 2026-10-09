import { useState } from 'react'
import Reveal from './Reveal'
import { CalendarCheck, CheckCircle, Mail, MapPin, Phone, Plane, Send, Ship, Truck } from './icons'

export default function Contact({ onOpenDemo }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    freightMode: 'sea',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-sec">
      <div className="wrap">
        <Reveal className="sec-head" as="div">
          <div className="section-eyebrow">
            <span className="dot">✦</span>
            <span>GET IN TOUCH</span>
          </div>
          <h2>
            Ready to accelerate your export <em>operations</em>?
          </h2>
          <p>
            Connect directly with our global trade team. Get a customized demo, technical consultation, or enterprise quote tailored to your shipping corridors.
          </p>
        </Reveal>

        <Reveal className="contact-grid" as="div">
          {/* Left Column: Direct Channels & Consultation Cards */}
          <div className="contact-info-col">
            <div className="contact-card highlight-card">
              <div className="card-top">
                <div className="card-icon gold">
                  <CalendarCheck />
                </div>
                <span className="card-tag">1-ON-1 DEMO</span>
              </div>
              <h3>Live Platform Walkthrough</h3>
              <p>
                See Master Export Pro configured for your products, destination countries, Incoterms, and actual buyer workflow.
              </p>
              <button className="btn btn-dark" type="button" onClick={onOpenDemo}>
                <CalendarCheck />
                <span>Book a free demo</span>
              </button>
            </div>

            <div className="contact-card info-card">
              <h3>Direct Trade Channels</h3>
              <ul className="contact-list">
                <li>
                  <div className="cl-ic">
                    <Mail />
                  </div>
                  <div>
                    <strong>Email Inquiries</strong>
                    <a href="mailto:trade@masterexportpro.com">trade@masterexportpro.com</a>
                  </div>
                </li>
                <li>
                  <div className="cl-ic">
                    <Phone />
                  </div>
                  <div>
                    <strong>Trade Desk Hotline</strong>
                    <a href="tel:+18004583976">+1 (800) 458-EXPORT / +91 22 6780 9000</a>
                  </div>
                </li>
                <li>
                  <div className="cl-ic">
                    <MapPin />
                  </div>
                  <div>
                    <strong>Headquarters</strong>
                    <span>World Trade Center, Tower 2, International Logistics Hub</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact-badges">
              <div className="cb-item">
                <b>⚡ Same-Day Setup</b>
                <span>Import catalog & start quoting in minutes</span>
              </div>
              <div className="cb-item">
                <b>🔒 Bank-Grade Security</b>
                <span>SOC-2 compliant with 256-bit encryption</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Trade Inquiry Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">
                  <CheckCircle />
                </div>
                <h3>Inquiry Received Successfully</h3>
                <p>
                  Thank you, <strong>{form.name}</strong>. A dedicated trade specialist will review your consignment requirements and reach out within 2 hours.
                </p>
                <div className="success-actions">
                  <button className="btn btn-dark" type="button" onClick={onOpenDemo}>
                    <CalendarCheck />
                    <span>Book instant live demo</span>
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', company: '', country: '', freightMode: 'sea', message: '' });
                    }}
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="trade-inquiry-form">
                <div className="form-header">
                  <h3>Send a Trade Inquiry</h3>
                  <p>Submit your export details and our specialists will prepare a customized proposal.</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="c-name">Full Name *</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      placeholder="e.g. Alistair Vance"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-email">Work Email *</label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      placeholder="e.g. alistair@globaltrade.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="c-comp">Company Name</label>
                    <input
                      id="c-comp"
                      type="text"
                      placeholder="e.g. Vance Trading Corp"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-country">Destination Market / Country</label>
                    <input
                      id="c-country"
                      type="text"
                      placeholder="e.g. UAE, Germany, US, UK"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Primary Transport Mode</label>
                  <div className="mode-selector">
                    <button
                      type="button"
                      className={`mode-btn ${form.freightMode === 'sea' ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, freightMode: 'sea' })}
                    >
                      <Ship />
                      <span>Sea Freight</span>
                    </button>
                    <button
                      type="button"
                      className={`mode-btn ${form.freightMode === 'air' ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, freightMode: 'air' })}
                    >
                      <Plane />
                      <span>Air Freight</span>
                    </button>
                    <button
                      type="button"
                      className={`mode-btn ${form.freightMode === 'road' ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, freightMode: 'road' })}
                    >
                      <Truck />
                      <span>Road Freight</span>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c-msg">Consignment Requirements or Questions</label>
                  <textarea
                    id="c-msg"
                    rows={4}
                    placeholder="Tell us about your order volume, shipment frequencies, or workflow challenges..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button className="btn btn-dark form-submit-btn" type="submit">
                  <Send />
                  <span>Send Trade Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
