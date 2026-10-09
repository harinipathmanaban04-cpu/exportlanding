import { useState } from 'react';
import Reveal from './Reveal';
import { 
  Users, 
  FileText, 
  Receipt, 
  FileCheck, 
  Ship, 
  Coins, 
  CheckCircle,
  ArrowRight
} from './icons';

const WORKFLOW_STEPS = [
  {
    number: '01',
    name: 'Customer',
    description: 'Add buyer once to global directory.',
    phase: 'Acquisition',
    metric: '< 1 min',
    icon: Users,
  },
  {
    number: '02',
    name: 'Enquiry',
    description: 'Log quantities, specs & target prices.',
    phase: 'Acquisition',
    metric: '2 min',
    icon: FileText,
  },
  {
    number: '03',
    name: 'Quotation',
    description: '1-click margin-locked proforma.',
    phase: 'Commercial',
    metric: 'Instant',
    icon: Receipt,
  },
  {
    number: '04',
    name: 'Sales order',
    description: 'Convert quote & track 6 order stages.',
    phase: 'Commercial',
    metric: 'Zero-entry',
    icon: FileCheck,
  },
  {
    number: '05',
    name: 'Shipment',
    description: 'Link container BL & track arrival live.',
    phase: 'Fulfillment',
    metric: 'Live tracking',
    icon: Ship,
  },
  {
    number: '06',
    name: 'Invoice',
    description: 'Issue commercial invoice synced to order.',
    phase: 'Fulfillment',
    metric: 'Instant sync',
    icon: Coins,
  },
  {
    number: '07',
    name: 'Payment',
    description: 'Record remittance & monitor balance due.',
    phase: 'Settlement',
    metric: 'Real-time',
    icon: Receipt,
  },
  {
    number: '08',
    name: 'Completed',
    description: 'Permanent ledger & archived audit trail.',
    phase: 'Settlement',
    metric: 'Audit-ready',
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  // Duplicate steps to create an endless continuous conveyor loop
  const loopSteps = [...WORKFLOW_STEPS, ...WORKFLOW_STEPS];

  const handleCardClick = (step, idx) => {
    setSelectedStep(selectedStep === idx ? null : idx);
    setIsPaused((prev) => !prev);
  };

  return (
    <section id="how" className="workflow-section conveyor-mode">
      <div className="wrap">
        <Reveal className="wf-header" as="div">
          <div className="wf-heading-block">
            <h2 className="wf-title">
              One workflow, from first enquiry<br className="wf-br" />to final <em>payment.</em>
            </h2>
            <p className="wf-subtitle">
              Each stage hands its details to the next, so the order never has to be re-entered.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Infinite Auto-Moving Conveyor Ribbon (Pauses smoothly on press, click, or hover) */}
      <div 
        className={`conveyor-wrapper ${isPaused ? 'is-paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (selectedStep === null) setIsPaused(false);
        }}
        onClick={() => {
          if (selectedStep === null) setIsPaused(!isPaused);
        }}
        role="region"
        aria-label="Export order workflow conveyor ribbon"
      >
        <div className="conveyor-track">
          {loopSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCardActive = selectedStep === idx;

            return (
              <div key={`${step.number}-${idx}`} className="conveyor-step-item">
                <div
                  className={`conveyor-card ${isCardActive ? 'card-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(step, idx);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Stage ${step.number}: ${step.name}`}
                >
                  <div className="card-top-row">
                    <div className="card-badge">
                      <span className="badge-num">{step.number}</span>
                      <span className="badge-phase">{step.phase}</span>
                    </div>
                    <div className="card-icon-wrap">
                      <Icon className="card-icon" />
                    </div>
                  </div>

                  <h3 className="card-title">{step.name}</h3>
                  <p className="card-desc">{step.description}</p>

                  <div className="card-footer-row">
                    <span className="card-metric">{step.metric}</span>
                    <span className="card-status-dot">● Active Sync</span>
                  </div>
                </div>

                {/* Animated sequential workflow arrow linking to next step */}
                <div className="conveyor-flow-arrow" aria-hidden="true">
                  <span className="flow-dash-line" />
                  <div className="flow-arrow-badge">
                    <ArrowRight className="flow-arrow-icon" />
                  </div>
                  <span className="flow-dash-line" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
