import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getRoleLabel } from '../lib/auth';
import { IconLock, IconBan, IconCheck } from '../components/Icons';

/**
 * AccessDeniedPage — shown when an authenticated user navigates to a route
 * or triggers an API call they are not authorised to access.
 */
export function AccessDeniedPage() {
  const navigate   = useNavigate();
  const user       = getCurrentUser();
  const roleLabel  = getRoleLabel(user?.roleName ?? null);
  const isAdmin    = user?.roleName === 'admin';

  return (
    <div
      className="flex min-h-[78vh] flex-col items-center justify-center px-6 text-center"
      style={{ background: '#fff' }}
    >
      {/* ── Illustration ── */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: '#fee2e2', opacity: 0.35, animationDuration: '2.5s' }}
        />
        {/* Middle ring */}
        <div
          className="relative flex items-center justify-center rounded-full mx-auto"
          style={{ width: '120px', height: '120px', background: '#fff1f2', border: '2px solid #fecdd3' }}
        >
          {/* Inner circle */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: '80px', height: '80px',
              background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
              fontSize: '36px',
              boxShadow: '0 8px 24px rgba(220,38,38,0.2)',
              color: '#dc2626',
            }}
          >
            <IconLock size={36} />
          </div>
        </div>
      </div>

      {/* ── 403 pill ── */}
      <div
        className="inline-flex items-center gap-2 rounded-full font-bold uppercase mb-4"
        style={{
          fontSize: '10px', padding: '5px 14px', letterSpacing: '0.09em',
          background: '#fff1f2', color: '#9f1239', border: '1px solid #fecdd3',
        }}
      >
        <IconBan size={12} /> 403 — Access Denied
      </div>

      {/* ── Heading ── */}
      <h1 className="font-bold mb-3" style={{ fontSize: '22px', color: '#111827', maxWidth: '360px', lineHeight: 1.3 }}>
        You don&apos;t have permission to view this page
      </h1>

      {/* ── Body ── */}
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, maxWidth: '360px' }}>
        This section is restricted to{' '}
        <strong className="font-semibold" style={{ color: '#374151' }}>Administrators</strong> only.
        {user && !isAdmin && (
          <>
            {' '}You are signed in as{' '}
            <strong style={{ color: '#374151' }}>{user.displayName}</strong>{' '}
            with role{' '}
            <span
              className="inline-block font-bold rounded-full"
              style={{ fontSize: '10px', padding: '2px 10px', background: '#f0fdf4', color: '#15803d' }}
            >
              {roleLabel}
            </span>
            .
          </>
        )}
      </p>

      {/* ── What you can access ── */}
      {user && !isAdmin && (
        <div
          className="mt-5 rounded-xl text-left"
          style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem 1.25rem', maxWidth: '360px', width: '100%' }}
        >
          <p className="font-semibold mb-2" style={{ fontSize: '11px', color: '#15803d' }}>
            ✓ You have access to:
          </p>
          <ul className="space-y-1">
            {['Dashboard', 'Community Beneficiaries', 'Community Volunteers', 'Community Donations', 'Community Requests', 'Community Campaigns', 'Workflows'].map(item => (
              <li key={item} className="flex items-center gap-2" style={{ fontSize: '12px', color: '#374151' }}>
                <IconCheck size={13} style={{ color: '#15803d' }} /> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Actions ── */}
      <div className="mt-7 flex items-center gap-3">
        <button
          id="access-denied-dashboard-btn"
          className="ui-btn ui-btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </button>
        <button
          id="access-denied-back-btn"
          className="ui-btn ui-btn-ghost"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>

      <p className="mt-8" style={{ fontSize: '11px', color: '#d1d5db' }}>
        If you believe this is a mistake, contact your system administrator.
      </p>
    </div>
  );
}
