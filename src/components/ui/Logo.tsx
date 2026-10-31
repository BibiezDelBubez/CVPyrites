import { Link } from 'react-router-dom'

export function Logo({ to = '/app', compact = false }: { to?: string; compact?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-2" aria-label="CVPyrites home">
      {/* CVPyrites mark: a pyrite cube whose front face (a true square) is striated
          like lines of text — crystal and résumé in one. Same art as public/icon.svg. */}
      <svg viewBox="0 0 512 512" className="h-7 w-7 shrink-0" aria-hidden>
        <rect width="512" height="512" rx="128" fill="#17130c" />
        <g>
          <polygon points="106,176 176,106 406,106 336,176" fill="#f4d58a"/>
          <polygon points="336,176 406,106 406,336 336,406" fill="#a5701b"/>
          <polygon points="106,176 336,176 336,406 106,406" fill="#e2ad42"/>
          <line x1="146" y1="226" x2="296" y2="226" stroke="#17130c" strokeWidth="16" strokeLinecap="round"/>
          <line x1="146" y1="269.3" x2="296" y2="269.3" stroke="#17130c" strokeWidth="16" strokeLinecap="round"/>
          <line x1="146" y1="312.7" x2="296" y2="312.7" stroke="#17130c" strokeWidth="16" strokeLinecap="round"/>
          <line x1="146" y1="356" x2="228.5" y2="356" stroke="#17130c" strokeWidth="16" strokeLinecap="round"/>
          <line x1="184" y1="167" x2="236" y2="115" stroke="#17130c" strokeOpacity=".45" strokeWidth="10" strokeLinecap="round"/>
          <line x1="230" y1="167" x2="282" y2="115" stroke="#17130c" strokeOpacity=".45" strokeWidth="10" strokeLinecap="round"/>
          <line x1="276" y1="167" x2="328" y2="115" stroke="#17130c" strokeOpacity=".45" strokeWidth="10" strokeLinecap="round"/>
          <line x1="360.5" y1="177.5" x2="360.5" y2="355.5" stroke="#17130c" strokeOpacity=".4" strokeWidth="10" strokeLinecap="round"/>
          <line x1="381.5" y1="156.5" x2="381.5" y2="334.5" stroke="#17130c" strokeOpacity=".4" strokeWidth="10" strokeLinecap="round"/>
        </g>
        <rect x="4" y="4" width="504" height="504" rx="124" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="8" />
      </svg>
      {!compact && (
        <span className="text-base font-semibold tracking-tight">
          CV<span style={{ color: '#c8941f' }}>Pyrites</span>
        </span>
      )}
    </Link>
  )
}
