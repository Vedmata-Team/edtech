import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'EduCore ERP — All-in-One Coaching & School Management Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function TwitterImage() {
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
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
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 72px',
            height: '100%',
          }}
        >
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
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF' }}>
              Edu<span style={{ color: '#2563EB' }}>Core</span> ERP
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={{ fontSize: '52px', fontWeight: 900, color: '#F8FAFC', lineHeight: 1.1, letterSpacing: '-1px' }}>
              Run Your <span style={{ color: '#10B981' }}>School</span> or
            </span>
            <span style={{ fontSize: '52px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px' }}>
              <span style={{ color: '#F97316' }}>Coaching</span>
              <span style={{ color: '#F8FAFC' }}> on One Platform.</span>
            </span>
            <p style={{ fontSize: '20px', color: '#94A3B8', fontWeight: 600, marginTop: '24px' }}>
              Trusted by 500+ institutes across India. Start free today.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['500+ Institutes', '10L+ Students', '4.8★ Rating'].map((s) => (
              <span key={s} style={{ fontSize: '14px', fontWeight: 700, color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 50%, #10B981 100%)' }} />
      </div>
    ),
    { ...size }
  )
}
