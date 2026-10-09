import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import heroBgImg from 'C:/Users/acer/.gemini/antigravity/brain/b2009b85-97ef-4039-8058-67b773f37d00/.user_uploaded/media_1791452197686.jpg';
import { ArrowDown, ArrowUpRight, BarChart3, CalendarCheck, ChevronLeft, ChevronRight, FileCheck, LayoutDashboard, LineChart, Package, Play, Pointer, Receipt, Settings, Ship, Sparkles, Users } from './icons';
import { prefersReducedMotion } from '../hooks/useReducedMotion';

const STEPS = [
  ['dashboard', 'See active orders, pending shipments and money owed at a glance.'],
  ['customers', 'Keep every overseas buyer and their export history in one place.'],
  ['products', 'Hold your catalog with SKUs, HS codes, prices and low-stock alerts.'],
  ['sales', 'Turn an enquiry into a quotation and a confirmed order in clicks.'],
  ['shipments', 'Track each consignment by sea, air or road from ETD to ETA.'],
  ['invoices', 'Issue invoices and see exactly what each buyer still owes.'],
  ['reports', 'Read monthly sales and payment charts, and export them to CSV.'],
  ['settings', 'Set your company profile, currency, timezone and date format.'],
];
const DUR = 2100; // ms each step stays on screen (crisp, snappy tour pace)
const TRAVEL = 180; // ms the pointer takes to reach the next sidebar item (2.5x faster cursor speed)
const isDesktop = () => window.innerWidth > 760;

/**
 * Hero with the interactive app mock-up and the guided tour.
 * The parent can call `start()` / `end()` through the forwarded ref.
 */
const Hero = forwardRef(function Hero({ onStartTour, onOpenDemo }, ref) {
  const mockRef = useRef(null);
  const cursorRef = useRef(null);
  const itemRefs = useRef([]);
  // Mutable tour state read by timers and key handlers (avoids stale closures).
  const live = useRef({ touring: false, idx: 0, timer: null, timer2: null });

  const [panel, setPanel] = useState('dashboard');
  const [selectedPanel, setSelectedPanel] = useState('dashboard');
  const [hl, setHl] = useState(-1);
  const [touring, setTouring] = useState(false);
  const [idx, setIdx] = useState(0);
  const [callout, setCallout] = useState({ show: false, text: '', top: null });
  const [cursor, setCursor] = useState({ show: false, left: null, top: null });
  const [running, setRunning] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const sideCls = (i, k) => (panel === k ? 'cur' : '') + (hl === i ? ' hl' : '');
  const panelCls = (k) => 'panel' + (panel === k ? ' show' : '');

  const itemPos = (i) => {
    const m = mockRef.current.getBoundingClientRect();
    const r = itemRefs.current[i].getBoundingClientRect();
    return { x: r.left - m.left, y: r.top - m.top + r.height / 2, w: r.width };
  };

  const place = (i) => {
    setCallout({ show: true, text: STEPS[i][1], top: isDesktop() ? itemPos(i).y : null });
  };

  const highlight = (i) => {
    setHl(i);
    setPanel(STEPS[i][0]);
    place(i);
    if (!isDesktop()) {
      itemRefs.current[i].scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
  };

  const clearHL = () => {
    setHl(-1);
    setCallout((c) => ({ ...c, show: false }));
  };

  const moveCursor = (i) => {
    if (!isDesktop()) return;
    const p = itemPos(i);
    setCursor({ show: true, left: p.x + p.w * 0.62, top: p.y - 4 });
  };

  // Restart the CSS "ping" ring on the pointer.
  const tap = () => {
    const el = cursorRef.current;
    if (!el) return;
    el.classList.remove('tap');
    void el.offsetWidth;
    el.classList.add('tap');
  };

  const end = useCallback(() => {
    const s = live.current;
    s.touring = false;
    clearTimeout(s.timer);
    clearTimeout(s.timer2);
    setTouring(false);
    setRunning(false);
    setCursor((c) => ({ ...c, show: false }));
    clearHL();
    setPanel((p) => selectedPanel || 'dashboard');
  }, [selectedPanel]);

  const step = (i) => {
    const s = live.current;
    const n = Math.max(0, Math.min(STEPS.length - 1, i));
    s.idx = n;
    setIdx(n);
    clearTimeout(s.timer);
    clearTimeout(s.timer2);
    setCallout((c) => ({ ...c, show: false }));
    moveCursor(n);
    const reduce = prefersReducedMotion();
    const travel = isDesktop() && !reduce ? TRAVEL : 0;
    s.timer2 = setTimeout(() => {
      if (!s.touring) return;
      tap();
      highlight(n);
    }, travel);
    setRunKey((k) => k + 1); // remount the progress bar so its animation restarts
    setRunning(!reduce);
    if (!reduce) s.timer = setTimeout(next, DUR);
  };

  function next() {
    if (live.current.idx >= STEPS.length - 1) end();
    else step(live.current.idx + 1);
  }

  const start = () => {
    const s = live.current;
    if (s.touring) return;
    s.touring = true;
    setTouring(true);
    const reduce = prefersReducedMotion();
    setTimeout(() => {
      if (mockRef.current) {
        const top = mockRef.current.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      }
      setTimeout(() => {
        if (s.touring) step(0);
      }, reduce ? 0 : 300);
    }, 60);
  };

  useImperativeHandle(ref, () => ({ start, end }));

  const selectPanel = (i) => {
    if (live.current.touring) end();
    const k = STEPS[i][0];
    setSelectedPanel(k);
    setPanel(k);
    setHl(-1);
    setCallout((c) => ({ ...c, show: false }));
  };

  // Hover / keyboard focus on the sidebar previews a panel (when no tour is running).
  const over = (i) => {
    if (!live.current.touring) highlight(i);
  };
  const out = () => {
    if (live.current.touring) return;
    clearHL();
    setPanel(selectedPanel);
  };

  // Keyboard controls and resize handling while the tour is running.
  useEffect(() => {
    if (!touring) return;
    const onKey = (e) => {
      if (e.key === 'Escape') end();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') step(live.current.idx - 1);
    };
    const onResize = () => {
      moveCursor(live.current.idx);
      place(live.current.idx);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touring]);

  // Clear timers on unmount.
  useEffect(
    () => () => {
      clearTimeout(live.current.timer);
      clearTimeout(live.current.timer2);
    },
    []
  );

  return (
    <section className="hero" id="home">
      {/* UPPER ZONE: Background image strictly for Hero Text, NOT for Dashboard */}
      <div className="hero-text-zone">
        <div className="hero-bg-backdrop" aria-hidden="true">
          <img src={heroBgImg} alt="Global trade cargo ships, flights and transport network" className="hero-bg-img" />
          <div className="hero-bg-overlay" />
        </div>

        <div className="wrap">
          <div className="hero-content centered">
            <h1 className="hero-title">
              Give your exports the system they <em>deserve.</em>
            </h1>

            <p className="hero-lead">
              Master Export Pro keeps customers, quotations, shipments and invoices in one place, so you enter each detail once and it follows the order to payment.
            </p>

            <div className="hero-actions">
              <button className="btn btn-dark" type="button" onClick={onOpenDemo}>
                <CalendarCheck />
                <span>Book a free demo</span>
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={start}
              >
                <Play />
                <span>Start tour</span>
              </button>
            </div>

            <p className="hero-note">
              Press Start tour and watch the pointer walk through the sidebar. Already a user?{' '}
              <a className="lnk" href="/login">Sign in</a>
            </p>
          </div>

          <button
            type="button"
            className="hero-scroll-indicator"
            onClick={() => {
              mockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            aria-label="Scroll to view dashboard"
          >
            <span>Scroll to explore dashboard</span>
            <ArrowDown />
          </button>
        </div>
      </div>

      {/* LOWER ZONE: Neat Enterprise Dashboard Mockup on Clean Stage (NO Background Image) */}
      <div className="hero-dashboard-zone">
        <div className="wrap">
          <div className="hero-stage-wrap">
            <div className="stage stage-visible" id="stage">
              {/* Cluttering float badges removed for a clean, neat dashboard */}
              <div className="mock" id="mock" ref={mockRef}>
                <div className="mock-bar">
                  <div className="mock-window-dots">
                    <i className="red" />
                    <i className="yellow" />
                    <i className="green" />
                  </div>
                  <div className="mock-url-pill">
                    <span className="mock-url-protocol">https://</span>
                    <span className="mock-url-domain">app.masterexportpro.com</span>
                    <span className="mock-url-path">/workspace/{panel}</span>
                  </div>
                  <div className="mock-status-pill">
                    <span className="status-ping" />
                    <span>Live Console Active</span>
                  </div>
                </div>

                <div className="mock-body">
                  <aside className="side" id="side" aria-label="Application sidebar">
                    <div className="side-brand">
                      <img src={logo} alt="" className="side-brand-logo" />
                      <div className="side-brand-meta">
                        <span className="side-brand-title">Master Export Pro</span>
                        <span className="side-brand-tag">v2.4 Enterprise</span>
                      </div>
                    </div>

                    <div className="side-nav-group">
                      <span className="side-section-label">CORE WORKSPACE</span>
                      <button className={sideCls(0, 'dashboard')} type="button" data-k="dashboard" ref={(el) => (itemRefs.current[0] = el)} onClick={() => selectPanel(0)} onMouseEnter={() => over(0)} onFocus={() => over(0)} onMouseLeave={out} onBlur={out}>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </button>
                      <button className={sideCls(1, 'customers')} type="button" data-k="customers" ref={(el) => (itemRefs.current[1] = el)} onClick={() => selectPanel(1)} onMouseEnter={() => over(1)} onFocus={() => over(1)} onMouseLeave={out} onBlur={out}>
                        <Users />
                        <span>Customers</span>
                      </button>
                      <button className={sideCls(2, 'products')} type="button" data-k="products" ref={(el) => (itemRefs.current[2] = el)} onClick={() => selectPanel(2)} onMouseEnter={() => over(2)} onFocus={() => over(2)} onMouseLeave={out} onBlur={out}>
                        <Package />
                        <span>Products</span>
                      </button>
                      <button className={sideCls(3, 'sales')} type="button" data-k="sales" ref={(el) => (itemRefs.current[3] = el)} onClick={() => selectPanel(3)} onMouseEnter={() => over(3)} onFocus={() => over(3)} onMouseLeave={out} onBlur={out}>
                        <LineChart />
                        <span>Sales</span>
                      </button>
                      <button className={sideCls(4, 'shipments')} type="button" data-k="shipments" ref={(el) => (itemRefs.current[4] = el)} onClick={() => selectPanel(4)} onMouseEnter={() => over(4)} onFocus={() => over(4)} onMouseLeave={out} onBlur={out}>
                        <Ship />
                        <span>Shipments</span>
                      </button>
                      <button className={sideCls(5, 'invoices')} type="button" data-k="invoices" ref={(el) => (itemRefs.current[5] = el)} onClick={() => selectPanel(5)} onMouseEnter={() => over(5)} onFocus={() => over(5)} onMouseLeave={out} onBlur={out}>
                        <Receipt />
                        <span>Invoices & Payments</span>
                      </button>
                    </div>

                    <div className="side-nav-group">
                      <span className="side-section-label">ANALYTICS & SYSTEM</span>
                      <button className={sideCls(6, 'reports')} type="button" data-k="reports" ref={(el) => (itemRefs.current[6] = el)} onClick={() => selectPanel(6)} onMouseEnter={() => over(6)} onFocus={() => over(6)} onMouseLeave={out} onBlur={out}>
                        <BarChart3 />
                        <span>Reports</span>
                      </button>
                      <button className={sideCls(7, 'settings')} type="button" data-k="settings" ref={(el) => (itemRefs.current[7] = el)} onClick={() => selectPanel(7)} onMouseEnter={() => over(7)} onFocus={() => over(7)} onMouseLeave={out} onBlur={out}>
                        <Settings />
                        <span>Settings</span>
                      </button>
                    </div>

                    <div className="side-user-footer">
                      <div className="user-avatar">GV</div>
                      <div className="user-info">
                        <strong>Global Ventures</strong>
                        <small>● Live Port Sync Active</small>
                      </div>
                    </div>
                  </aside>

                  <div className="main">
                  <div className={panelCls('dashboard')} data-p="dashboard">
                    <div className="panel-header-row">
                      <div>
                        <h3>Export Command Overview</h3>
                        <p className="panel-sub">Real-time international orders, multi-modal consignments & payments.</p>
                      </div>
                      <div className="panel-meta-pill">
                        <span>Updated just now</span>
                      </div>
                    </div>

                    <div className="kpis">
                      <div className="kpi">
                        <div className="kpi-top">
                          <small>Active Orders</small>
                          <span className="kpi-trend up">+14.2%</span>
                        </div>
                        <strong>24</strong>
                        <span className="kpi-caption">11 global markets</span>
                      </div>
                      <div className="kpi">
                        <div className="kpi-top">
                          <small>Pending Shipments</small>
                          <span className="kpi-badge sea">In Transit</span>
                        </div>
                        <strong>8</strong>
                        <span className="kpi-caption">3 Sea • 4 Air • 1 Road</span>
                      </div>
                      <div className="kpi">
                        <div className="kpi-top">
                          <small>Balance Due</small>
                          <span className="kpi-trend neutral">96% Paid</span>
                        </div>
                        <strong>$45,000</strong>
                        <span className="kpi-caption">3 verified buyers</span>
                      </div>
                      <div className="kpi">
                        <div className="kpi-top">
                          <small>Monthly Sales</small>
                          <span className="kpi-trend up">+22% MoM</span>
                        </div>
                        <strong>$185,000</strong>
                        <span className="kpi-caption">84% of Q3 target</span>
                      </div>
                    </div>

                    <div className="rows neat-table">
                      <div className="row head">
                        <span>Buyer & Port of Discharge</span>
                        <span className="hide-s">Order & HS Code</span>
                        <span>Value</span>
                        <span>Transit Status</span>
                      </div>
                      <div className="row">
                        <span className="buyer-col">
                          <strong>Al Noor Trading</strong>
                          <small>Dubai, UAE • Jebel Ali Port</small>
                        </span>
                        <span className="hide-s num">SO-1021 <small>(HS 0902.40)</small></span>
                        <span className="num val-bold">$32,400</span>
                        <span className="pill pill-sea">In Transit (Sea)</span>
                      </div>
                      <div className="row">
                        <span className="buyer-col">
                          <strong>Hanseatic Foods</strong>
                          <small>Hamburg, Germany • Hub 4</small>
                        </span>
                        <span className="hide-s num">SO-1022 <small>(HS 0804.10)</small></span>
                        <span className="num val-bold">$18,950</span>
                        <span className="pill gold">Customs Cleared</span>
                      </div>
                      <div className="row">
                        <span className="buyer-col">
                          <strong>Brightwell Imports</strong>
                          <small>London, UK • Heathrow Cargo</small>
                        </span>
                        <span className="hide-s num">SO-1023 <small>(HS 1905.90)</small></span>
                        <span className="num val-bold">$27,100</span>
                        <span className="pill pill-air">Confirmed (Air)</span>
                      </div>
                    </div>
                    <p className="sample">Live multi-currency sync • Base currency USD • Enterprise sandbox data.</p>
                  </div>
                  <div className={panelCls('customers')} data-p="customers">
                    <h3>Customers</h3>
                    <div className="rows neat-table">
                      <div className="row head">
                        <span>Buyer</span>
                        <span className="hide-s">Country</span>
                        <span>Orders</span>
                        <span>Status</span>
                      </div>
                      <div className="row">
                        <span>Al Noor Trading</span>
                        <span className="hide-s">UAE</span>
                        <span className="num">14</span>
                        <span className="pill">Active</span>
                      </div>
                      <div className="row">
                        <span>Hanseatic Foods</span>
                        <span className="hide-s">Germany</span>
                        <span className="num">9</span>
                        <span className="pill">Active</span>
                      </div>
                      <div className="row">
                        <span>Brightwell Imports</span>
                        <span className="hide-s">United Kingdom</span>
                        <span className="num">6</span>
                        <span className="pill">Active</span>
                      </div>
                      <div className="row">
                        <span>Cedar Bay Wholesale</span>
                        <span className="hide-s">United States</span>
                        <span className="num">2</span>
                        <span className="pill gold">New</span>
                      </div>
                    </div>
                    <p className="sample">Sample data for illustration.</p>
                  </div>
                  <div className={panelCls('products')} data-p="products">
                    <h3>Products</h3>
                    <div className="rows neat-table">
                      <div className="row head">
                        <span>Product</span>
                        <span className="hide-s">HS code</span>
                        <span>Unit price</span>
                        <span>Stock</span>
                      </div>
                      <div className="row">
                        <span>Basmati rice 25 kg</span>
                        <span className="hide-s num">1006.30</span>
                        <span className="num">$21.00</span>
                        <span className="pill">In stock</span>
                      </div>
                      <div className="row">
                        <span>Turmeric powder 1 kg</span>
                        <span className="hide-s num">0910.30</span>
                        <span className="num">$4.80</span>
                        <span className="pill red">Low</span>
                      </div>
                      <div className="row">
                        <span>Cotton towels, set</span>
                        <span className="hide-s num">6302.60</span>
                        <span className="num">$12.50</span>
                        <span className="pill">In stock</span>
                      </div>
                    </div>
                    <p className="sample">Sample data for illustration.</p>
                  </div>
                  <div className={panelCls('sales')} data-p="sales">
                    <h3>Sales</h3>
                    <div className="tabs">
                      <span>Enquiries</span>
                      <span>Quotations</span>
                      <span className="on">Sales orders</span>
                    </div>
                    <div className="steps6">
                      <span className="d">Confirmed</span>
                      <span className="d">Preparing</span>
                      <span className="n">Ready to ship</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                      <span>Completed</span>
                    </div>
                    <div className="rows neat-table">
                      <div className="row head">
                        <span>Order</span>
                        <span className="hide-s">Buyer</span>
                        <span>Incoterm</span>
                        <span>Stage</span>
                      </div>
                      <div className="row">
                        <span className="num">SO-1022</span>
                        <span className="hide-s">Hanseatic Foods</span>
                        <span>CIF</span>
                        <span className="pill gold">Preparing</span>
                      </div>
                      <div className="row">
                        <span className="num">SO-1023</span>
                        <span className="hide-s">Brightwell Imports</span>
                        <span>FOB</span>
                        <span className="pill">Confirmed</span>
                      </div>
                    </div>
                    <p className="sample">Sample data for illustration.</p>
                  </div>
                  <div className={panelCls('shipments')} data-p="shipments">
                    <h3>Shipments</h3>
                    <div className="rows neat-table">
                      <div className="row head">
                        <span>Container</span>
                        <span className="hide-s">Route</span>
                        <span>ETA</span>
                        <span>Mode</span>
                      </div>
                      <div className="row">
                        <span className="num">MSKU 482910</span>
                        <span className="hide-s">Chennai to Hamburg</span>
                        <span className="num">21 Oct</span>
                        <span className="pill">Sea</span>
                      </div>
                      <div className="row">
                        <span className="num">AWB 176-5521</span>
                        <span className="hide-s">Chennai to Dubai</span>
                        <span className="num">12 Oct</span>
                        <span className="pill gold">Air</span>
                      </div>
                      <div className="row">
                        <span className="num">TN 09 AB 4410</span>
                        <span className="hide-s">Chennai to Tuticorin</span>
                        <span className="num">10 Oct</span>
                        <span className="pill">Truck</span>
                      </div>
                    </div>
                    <p className="sample">Sample data for illustration.</p>
                  </div>
                  <div className={panelCls('invoices')} data-p="invoices">
                    <h3>Invoices & Payments</h3>
                    <div className="kpis" style={{ gridTemplateColumns: "repeat(3,minmax(0,1fr))" }}>
                      <div className="kpi">
                        <small>Total invoiced</small>
                        <strong>$210,500</strong>
                      </div>
                      <div className="kpi">
                        <small>Paid</small>
                        <strong>$165,500</strong>
                      </div>
                      <div className="kpi">
                        <small>Balance due</small>
                        <strong>$45,000</strong>
                      </div>
                    </div>
                    <div className="rows neat-table">
                      <div className="row">
                        <span className="num">INV-2041</span>
                        <span className="hide-s">Al Noor Trading</span>
                        <span className="num">$32,400</span>
                        <span className="pill">Paid</span>
                      </div>
                      <div className="row">
                        <span className="num">INV-2042</span>
                        <span className="hide-s">Hanseatic Foods</span>
                        <span className="num">$18,950</span>
                        <span className="pill gold">Part paid</span>
                      </div>
                    </div>
                    <p className="sample">Sample data for illustration.</p>
                  </div>
                  <div className={panelCls('reports')} data-p="reports">
                    <h3>Reports</h3>
                    <div className="bars" aria-hidden="true">
                      <div style={{ height: "38%" }} />
                      <div style={{ height: "52%" }} />
                      <div style={{ height: "46%" }} />
                      <div style={{ height: "70%" }} />
                      <div style={{ height: "92%" }} />
                      <div style={{ height: "64%" }} />
                    </div>
                    <div className="bars-l">
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                    </div>
                    <p className="sample">Sample data for illustration.</p>
                  </div>
                  <div className={panelCls('settings')} data-p="settings">
                    <h3>Settings</h3>
                    <div className="fields">
                      <div className="field">
                        <span>Company name</span>
                        Your export company
                      </div>
                      <div className="field">
                        <span>Default currency</span>
                        USD
                      </div>
                      <div className="field">
                        <span>Timezone</span>
                        Asia/Kolkata
                      </div>
                      <div className="field">
                        <span>Date format</span>
                        DD/MM/YYYY
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={'callout' + (callout.show ? ' show' : '')} id="callout" role="status" aria-live="polite" style={callout.top != null ? { top: callout.top } : undefined}>{callout.text}</div>
              <div className={'cursor' + (cursor.show ? ' show' : '')} id="cursor" aria-hidden="true" ref={cursorRef} style={{ left: cursor.left ?? undefined, top: cursor.top ?? undefined }}>
                <Pointer />
              </div>
            </div>
            <div className={'tourbar' + (touring ? ' show' : '')} id="tourbar">
              <span id="tcount">
<b>{idx + 1}</b> of {STEPS.length}
              </span>
              <span className="sp" />
              <button type="button" id="tback" onClick={() => step(live.current.idx - 1)}>
                <ChevronLeft />
                Back
              </button>
              <button type="button" id="tnext" onClick={next}>
{idx === STEPS.length - 1 ? 'Finish' : 'Next'}
<ChevronRight />
              </button>
              <button type="button" className="end" id="tend" onClick={end}>End tour</button>
              <span className={'prog' + (running ? ' run' : '')} id="prog" key={runKey} style={{ '--dur': `${DUR}ms` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
});

export default Hero;
