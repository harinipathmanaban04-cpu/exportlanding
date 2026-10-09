import { useState } from 'react';
import logo from '../assets/logo.png';
import { CalendarCheck, Menu, Play } from './icons';
import useActiveSection from '../hooks/useActiveSection';

const LINKS = [
  ['home', 'Home'],
  ['about', 'About'],
  ['products', 'Products'],
  ['services', 'Services'],
  ['markets', 'Markets'],
  ['how', 'How It Works'],
  ['contact', 'Contact'],
];
const IDS = LINKS.map(([id]) => id);

export default function Navbar({ onStartTour, onOpenDemo }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS, 'home');

  return (
    <header className="nav-floating-wrap">
      <div className="nav-capsule">
        <a className="brand" href="#home" aria-label="Master Export Pro home">
          <img src={logo} alt="Master Export Pro" className="brand-logo-img" />
          <span className="brand-name">
            Master Export <em>Pro</em>
          </span>
        </a>

        <nav
          className={`nav-links${open ? ' open' : ''}`}
          id="navlinks"
          aria-label="Main"
          onClick={(e) => {
            if (e.target.tagName === 'A') setOpen(false);
          }}
        >
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : undefined}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <button className="btn btn-ghost btn-sm tour-nav" type="button" onClick={onStartTour}>
            <Play />
            <span>Start tour</span>
          </button>
          <button className="btn btn-dark btn-sm nav-pill-btn" type="button" onClick={onOpenDemo}>
            <CalendarCheck />
            <span>Book a free demo</span>
          </button>
        </div>

        <button
          className="burger"
          id="burger"
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="navlinks"
          onClick={() => setOpen((o) => !o)}
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
