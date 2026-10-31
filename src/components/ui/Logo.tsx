import { Link } from 'react-router-dom'

export function Logo({ to = '/app', compact = false }: { to?: string; compact?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-2" aria-label="CVPyrites home">
      <span
        className="relative inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-[9px] shadow-soft"
        style={{ background: 'linear-gradient(140deg,#8a5a12 0%,#d4982f 45%,#f7d774 100%)' }}
      >
        {/* subtle top highlight for a metallic feel */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,.35),transparent)' }} />
        {/* CVPyrites mark: a pyrite cube with its striations, perpendicular on
            adjacent faces. Same art as public/icon.svg. */}
        <svg viewBox="0 0 512 512" className="relative h-full w-full" aria-hidden>
          <polygon points="126.1,187 256,112 385.9,187 256,262" fill="#ffffff" fillOpacity="0.96"/>
          <line x1="174.2" y1="196.8" x2="272.9" y2="139.8" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <line x1="206.6" y1="215.5" x2="305.4" y2="158.5" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <line x1="239.1" y1="234.2" x2="337.8" y2="177.2" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <polygon points="126.1,187 256,262 256,412 126.1,337" fill="#ffffff" fillOpacity="0.78"/>
          <line x1="141.7" y1="233.5" x2="240.4" y2="290.5" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <line x1="141.7" y1="271" x2="240.4" y2="328" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <line x1="141.7" y1="308.5" x2="240.4" y2="365.5" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <polygon points="256,262 385.9,187 385.9,337 256,412" fill="#ffffff" fillOpacity="0.6"/>
          <line x1="288.5" y1="261.2" x2="288.5" y2="375.2" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <line x1="320.9" y1="242.5" x2="320.9" y2="356.5" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
          <line x1="353.4" y1="223.8" x2="353.4" y2="337.8" stroke="#9a6512" strokeOpacity="0.55" strokeWidth="11" strokeLinecap="round"/>
        </svg>
      </span>
      {!compact && (
        <span className="text-base font-semibold tracking-tight">
          CV<span style={{ color: '#c8941f' }}>Pyrites</span>
        </span>
      )}
    </Link>
  )
}
