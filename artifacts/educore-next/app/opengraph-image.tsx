import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'EduCore ERP — All-in-One Coaching & School Management Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top-right glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)',
          }}
        />

        {/* Bottom-left glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 72px',
            height: '100%',
          }}
        >
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(37,99,235,0.5)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px', lineHeight: 1 }}>
                Edu<span style={{ color: '#2563EB' }}>Core</span>
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '3px' }}>
                Built by IITians
              </span>
            </div>

            {/* Live badge */}
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '100px',
                padding: '6px 16px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                500+ Institutes Live
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
              <span style={{ fontSize: '58px', fontWeight: 900, color: '#F8FAFC', lineHeight: 1.05, letterSpacing: '-1.5px' }}>
                Run Your Entire{' '}
                <span style={{ color: '#10B981' }}>School</span> or
              </span>
              <span style={{ fontSize: '58px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1.5px' }}>
                <span style={{ color: '#F97316' }}>Coaching Institute</span>
                <span style={{ color: '#F8FAFC' }}> on One</span>
              </span>
              <span style={{ fontSize: '58px', fontWeight: 900, color: '#2563EB', lineHeight: 1.05, letterSpacing: '-1.5px' }}>
                Smart Platform.
              </span>
            </div>

            <p style={{ fontSize: '20px', color: '#94A3B8', fontWeight: 600, lineHeight: 1.5, maxWidth: '680px', margin: 0 }}>
              Students, Teachers & Management — Together on the only OS built for high-performance Bharat.
            </p>
          </div>

          {/* Bottom stats row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0px', marginTop: 'auto' }}>
            {[
              { val: '500+', label: 'Institutes' },
              { val: '10L+', label: 'Students' },
              { val: '4.8★', label: 'Rating' },
              { val: '₹999', label: 'Starting/mo' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingRight: '40px',
                  marginRight: '40px',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <span style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>{s.val}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.label}</span>
              </div>
            ))}

            {/* CTA pill */}
            <div
              style={{
                marginLeft: 'auto',
                background: '#2563EB',
                borderRadius: '16px',
                padding: '14px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 0 40px rgba(37,99,235,0.4)',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Get Free Demo
              </span>
              <span style={{ fontSize: '18px', color: '#FFFFFF' }}>→</span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #10B981 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
