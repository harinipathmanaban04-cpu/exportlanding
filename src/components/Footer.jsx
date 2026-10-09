import logo from '../assets/logo.png';
import { Mail, Phone, MapPin } from './icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main-grid">
          {/* Left Column: Brand Logo, Name, Mission & Trust */}
          <div className="footer-brand-col">
            <a href="#" className="footer-brand-link">
              <img src={logo} alt="Master Export Pro" className="footer-logo-img" />
              <div className="footer-brand-title">
                Master Export <em>Pro</em>
              </div>
            </a>
            
            <p className="footer-tagline">
              Export today. A stronger tomorrow.
            </p>

            <p className="footer-desc">
              The unified operating system for global export enterprises. Managing buyers, margin-locked quotations, multi-stage sales orders, container tracking, and compliant commercial invoicing in one workspace.
            </p>

            <div className="footer-trust-chips">
              <span className="footer-chip">ISO 27001 Certified</span>
              <span className="footer-chip">SOC-2 Type II</span>
              <span className="footer-chip">256-Bit Bank Encryption</span>
            </div>
          </div>

          {/* Right Columns: Contact Details & Platform Quick Navigation */}
          <div className="footer-links-grid">
            {/* Contact Details Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Direct Contact</h4>
              <ul className="footer-contact-list">
                <li>
                  <div className="fc-icon"><Mail /></div>
                  <div>
                    <span className="fc-label">Trade Desk Email</span>
                    <a href="mailto:trade@masterexportpro.com" className="fc-link">trade@masterexportpro.com</a>
                  </div>
                </li>
                <li>
                  <div className="fc-icon"><Phone /></div>
                  <div>
                    <span className="fc-label">Trade Hotline</span>
                    <a href="tel:+18004583976" className="fc-link">+1 (800) 458-EXPORT</a>
                  </div>
                </li>
                <li>
                  <div className="fc-icon"><Phone /></div>
                  <div>
                    <span className="fc-label">Regional Desk (Asia-Pacific)</span>
                    <a href="tel:+912267809000" className="fc-link">+91 22 6780 9000</a>
                  </div>
                </li>
                <li>
                  <div className="fc-icon"><MapPin /></div>
                  <div>
                    <span className="fc-label">Global Headquarters</span>
                    <span className="fc-text">World Trade Center, Tower 2, International Logistics Hub</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Platform Modules Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Platform Modules</h4>
              <ul className="footer-nav-list">
                <li><a href="#how">Customer & KYC Directory</a></li>
                <li><a href="#how">1-Click Quotation Engine</a></li>
                <li><a href="#products">Multi-Stage Sales Orders</a></li>
                <li><a href="#products">Live Consignment Tracking</a></li>
                <li><a href="#services">Tax-Compliant Invoicing</a></li>
                <li><a href="#services">Forex & Payment Settlement</a></li>
              </ul>
            </div>

            {/* Global Trade Corridors Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">Global Markets</h4>
              <ul className="footer-nav-list">
                <li><a href="#markets">Middle East & GCC Corridors</a></li>
                <li><a href="#markets">ASEAN & Southeast Asia</a></li>
                <li><a href="#markets">European Union Standards</a></li>
                <li><a href="#markets">North American Trade (USMCA)</a></li>
                <li><a href="#about">Incoterms 2020 Matrix</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Status */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span>© 2026 Master Export Pro. All rights reserved.</span>
            <div className="footer-status-indicator">
              <span className="status-dot" aria-hidden="true"></span>
              <span>All Trade Desks Operational</span>
            </div>
          </div>

          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="footer-sep">•</span>
            <a href="#terms">Terms of Trade</a>
            <span className="footer-sep">•</span>
            <a href="#security">Security & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
