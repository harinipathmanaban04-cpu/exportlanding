import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { ArrowUpRight, CalendarCheck, X } from './icons';

// Change this to the address that should receive demo requests.
const CONTACT_EMAIL = 'your@email.com';

export default function DemoDialog({ open, onClose }) {
  const dlgRef = useRef(null);
  const [note, setNote] = useState('This opens your email app with the details filled in.');

  // Keep the native <dialog> in sync with the `open` prop.
  useEffect(() => {
    const dlg = dlgRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body =
      `Name: ${f.get('name')}\nEmail: ${f.get('email')}\n` +
      `Company: ${f.get('company') || ''}\nExports: ${f.get('goods') || ''}`;
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Free demo request - Master Export Pro')}` +
      `&body=${encodeURIComponent(body)}`;
    setNote('Thanks. Your email app should open with the request ready to send.');
  };

  return (
    <dialog
      ref={dlgRef}
      id="demo"
      aria-labelledby="demo-t"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dlgRef.current) onClose();
      }}
    >
      <form className="dlg" onSubmit={onSubmit}>
        <button type="button" className="dlg-x" aria-label="Close" onClick={onClose}>
          <X />
        </button>
        <img src={logo} alt="" />
        <h3 id="demo-t">Book a free demo</h3>
        <p>Tell us a little about your business. We will reply to set up a 30 minute walkthrough.</p>
        <label>
          Your name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Work email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Company
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          What do you export?
          <input name="goods" placeholder="For example, spices, textiles, machinery" />
        </label>
        <button className="btn btn-dark" type="submit">
          <span>Request working session</span>
          <ArrowUpRight />
        </button>
        <small className="dlg-note" id="dnote">
          {note}
        </small>
      </form>
    </dialog>
  );
}
