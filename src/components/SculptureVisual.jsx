import React from 'react';
import { ArrowUpRight, FileCheck, Ship, Sparkles } from './icons';

export default function SculptureVisual({ onStartTour }) {
  return (
    <div className="sculpture-card" aria-label="Aurora architectural studio installation">
      {/* Background ambient lighting */}
      <div className="sculpture-ambient" />

      {/* SVG 3D Architectural Sculpture */}
      <svg
        className="sculpture-svg"
        viewBox="0 0 700 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Radial glow for the circular halo */}
          <filter id="haloGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="38" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft floor shadow filter */}
          <filter id="floorShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="16" />
            <feOffset dx="0" dy="18" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Metallic gradient for outer arch */}
          <linearGradient id="metalArch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d4044" />
            <stop offset="35%" stopColor="#1f2124" />
            <stop offset="70%" stopColor="#121315" />
            <stop offset="100%" stopColor="#0d0e10" />
          </linearGradient>

          {/* Golden inner reflection gradient for arch */}
          <linearGradient id="goldReflection" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8c6a28" />
            <stop offset="45%" stopColor="#e2be74" />
            <stop offset="75%" stopColor="#f7dc9b" />
            <stop offset="100%" stopColor="#6b4f17" />
          </linearGradient>

          {/* Marble base gradients */}
          <linearGradient id="marbleFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1b1c1e" />
            <stop offset="50%" stopColor="#121315" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>

          <linearGradient id="marbleTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2c2e32" />
            <stop offset="50%" stopColor="#3d4045" />
            <stop offset="100%" stopColor="#1d1e21" />
          </linearGradient>

          {/* Halo ring gradient */}
          <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2cb" />
            <stop offset="40%" stopColor="#d8ab52" />
            <stop offset="75%" stopColor="#f3d183" />
            <stop offset="100%" stopColor="#966c1f" />
          </linearGradient>

          {/* Disc surface gradient */}
          <radialGradient id="discSurface" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#242528" />
            <stop offset="70%" stopColor="#151618" />
            <stop offset="100%" stopColor="#0b0b0d" />
          </radialGradient>

          {/* Arch sheen highlight */}
          <linearGradient id="archSheen" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Floor ambient shadow */}
        <ellipse cx="360" cy="625" rx="270" ry="24" fill="#000000" opacity="0.22" filter="url(#floorShadow)" />

        {/* Right Architectural Monolith Pillar */}
        <g id="rightMonolith">
          {/* Back side of right monolith */}
          <polygon points="415,160 515,160 515,550 415,550" fill="#141518" />
          {/* Front facing wall */}
          <polygon points="435,170 515,170 515,550 435,550" fill="#1e2023" />
          {/* Inner curved bevel / reflection catching golden halo light */}
          <path
            d="M 415 160 C 445 280 445 420 415 550 L 435 550 C 465 420 465 280 435 170 Z"
            fill="url(#goldReflection)"
            opacity="0.75"
          />
        </g>

        {/* The Golden Halo Ring & Disc (Centered in composition) */}
        <g id="centerDisc">
          {/* Outer glowing halo aura */}
          <circle cx="365" cy="360" r="115" fill="#f4caa0" opacity="0.4" filter="url(#haloGlow)" />
          <circle cx="365" cy="360" r="105" fill="#e8ba58" opacity="0.55" filter="url(#haloGlow)" />

          {/* Golden Outer Rim */}
          <circle cx="365" cy="360" r="102" fill="url(#ringGold)" stroke="#fff3cc" strokeWidth="2.5" />

          {/* Dark Disc Body */}
          <circle cx="365" cy="360" r="94" fill="url(#discSurface)" stroke="#684e1b" strokeWidth="1" />

          {/* Inner Light Ring Sheen */}
          <circle cx="365" cy="360" r="92" fill="none" stroke="url(#ringGold)" strokeWidth="1.5" opacity="0.8" />

          {/* Engraved Typography on Disc */}
          <g fill="#d8b264" opacity="0.92" style={{ letterSpacing: '0.22em' }} textAnchor="middle">
            <text x="365" y="328" fontSize="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
              STRATEGY
            </text>
            <text x="365" y="352" fontSize="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
              SYSTEMS,
            </text>
            <text x="365" y="376" fontSize="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
              IMPACT
            </text>
            <text x="365" y="400" fontSize="12" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
              DELIVERED
            </text>
          </g>
        </g>

        {/* Large Sweeping Curved Metal Arch (Left side) */}
        <g id="leftArch">
          {/* Main arch body */}
          <path
            d="M 230 550 
               C 230 320 250 160 330 90
               C 365 60 380 90 345 140
               C 290 220 280 340 375 550
               Z"
            fill="url(#metalArch)"
          />
          {/* Arch inner glowing bevel catching halo reflection */}
          <path
            d="M 330 90 
               C 365 60 380 90 345 140
               C 290 220 280 340 375 550
               C 360 550 270 340 330 90 Z"
            fill="url(#goldReflection)"
            opacity="0.85"
          />
          {/* Metallic light sheen across arch curve */}
          <path
            d="M 230 550 
               C 230 320 250 160 330 90
               C 310 110 250 260 250 550 Z"
            fill="url(#archSheen)"
            opacity="0.5"
          />
        </g>

        {/* Dark Marble Pedestal (Foreground Block) */}
        <g id="marblePedestal">
          {/* Pedestal Top Face */}
          <polygon points="180,450 435,450 490,480 235,480" fill="url(#marbleTop)" />
          {/* Golden highlight edge where top face meets front */}
          <line x1="180" y1="450" x2="435" y2="450" stroke="#f0cf7e" strokeWidth="1" opacity="0.6" />

          {/* Pedestal Front Face */}
          <polygon points="180,450 435,450 435,620 180,620" fill="url(#marbleFront)" />

          {/* Pedestal Right Face (3D depth) */}
          <polygon points="435,450 490,480 490,620 435,620" fill="#0d0e10" />

          {/* Extended front foot projection (matches reference image curve) */}
          <path
            d="M 320 530 
               C 390 560 450 610 510 635 
               L 510 655 
               L 180 655 
               L 180 620 
               Z"
            fill="#121316"
          />
          <path
            d="M 320 530 
               C 390 560 450 610 510 635 
               L 510 640 
               C 450 615 390 565 320 535 Z"
            fill="url(#goldReflection)"
            opacity="0.7"
          />

          {/* Realistic Marble Veins (Organic white & grey fine veins) */}
          <g stroke="#ffffff" strokeWidth="0.8" opacity="0.18" fill="none">
            <path d="M 200 460 Q 240 500 270 560 T 310 610" />
            <path d="M 220 480 Q 260 520 280 570" strokeWidth="0.5" />
            <path d="M 330 460 Q 360 490 390 540 T 420 590" />
            <path d="M 350 470 Q 380 505 400 550" strokeWidth="0.4" />
            <path d="M 250 590 Q 290 610 340 630" strokeWidth="0.6" />
          </g>
        </g>
      </svg>

      {/* Floating Glassmorphic Badges */}
      <div className="sculpture-float sf-top" onClick={onStartTour} role="button" tabIndex="0">
        <div className="sf-icon">
          <FileCheck />
        </div>
        <div className="sf-content">
          <span className="sf-label">Quotation Converted</span>
          <span className="sf-val">$148,200 · Confirmed Sales Order</span>
        </div>
      </div>

      <div className="sculpture-float sf-bottom" onClick={onStartTour} role="button" tabIndex="0">
        <div className="sf-icon gold">
          <Ship />
        </div>
        <div className="sf-content">
          <span className="sf-label">Global Consignment</span>
          <span className="sf-val">Vessel Evergreen · Port ETA in 3 days</span>
        </div>
      </div>

      {/* Interactive Tour Hint Button */}
      <div className="sculpture-action-strip">
        <button type="button" className="sculpture-tour-btn" onClick={onStartTour}>
          <Sparkles />
          <span>Launch Interactive System Tour</span>
          <ArrowUpRight />
        </button>
      </div>
    </div>
  );
}
