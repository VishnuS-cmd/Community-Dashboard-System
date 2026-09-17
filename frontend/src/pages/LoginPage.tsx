import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, setToken, setCurrentUser } from '../lib/api';
import type { CurrentUser } from '../lib/auth';
import { projectConfig } from '../project.config';
import { DomainVector } from '../theme/vectors';
import { IconHandshake, IconCheck, IconAlertTriangle } from '../components/Icons';

interface LoginResponse {
  accessToken: string;
  user: CurrentUser & { roleName: string };
}

export function LoginPage() {
  const navigate  = useNavigate();
  const [email,   setEmail]    = useState('admin@example.com');
  const [password,setPassword] = useState('Admin@123');
  const [error,   setError]    = useState('');
  const [busy,    setBusy]     = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      // Persist token and the resolved user object (including roleName) so that
      // role-guard helpers in lib/auth.ts can read it without decoding the JWT.
      setToken(response.accessToken);
      setCurrentUser(response.user);
      navigate('/dashboard');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 100%)',
      }}
    >
      {/* ── Left panel (illustration) ── */}
      <div className="hidden lg:flex flex-col justify-between flex-1 p-12 max-w-2xl">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-2xl font-bold text-white flex-shrink-0"
            style={{ width: '44px', height: '44px', fontSize: '22px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <IconHandshake size={24} />
          </div>
          <div>
            <p className="font-bold text-white" style={{ fontSize: '16px' }}>{projectConfig.displayName}</p>
            <p className="font-medium" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Management Platform
            </p>
          </div>
        </div>

        {/* Illustration + headline */}
        <div>
          <div
            className="rounded-3xl overflow-hidden mb-8"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', padding: '2rem' }}
          >
            <DomainVector className="w-full drop-shadow-xl" />
          </div>
          <h1 className="font-bold text-white mb-3" style={{ fontSize: '28px', lineHeight: '1.25' }}>
            Community Impact<br />Made Measurable
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', maxWidth: '400px' }}>
            {projectConfig.shortDescription}
          </p>

          {/* Feature list */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            {['Beneficiary CRUD', 'Volunteer Tracking', 'Donation Records', 'Audit Trail', 'Workflow Engine', 'CSV Reports'].map(f => (
              <div key={f} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>
                <IconCheck size={14} style={{ color: '#4ade80' }} />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          Community Dashboard Management System · Academic Project
        </p>
      </div>

      {/* ── Right panel (login card) ── */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: '100%', maxWidth: '480px', padding: '2rem', background: '#f4f6f8' }}
      >
        <div className="w-full" style={{ maxWidth: '400px' }}>

          {/* Mobile brand */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="flex items-center justify-center rounded-xl" style={{ width: '40px', height: '40px', fontSize: '20px', background: '#14532d', color: '#fff' }}><IconHandshake size={20} /></div>
            <p className="font-bold text-slate-900" style={{ fontSize: '16px' }}>{projectConfig.displayName}</p>
          </div>

          <h2 className="font-bold mb-1" style={{ fontSize: '22px', color: '#111827' }}>Welcome back</h2>
          <p className="mb-6" style={{ fontSize: '13px', color: '#6b7280' }}>Sign in to your account to continue</p>

          {/* Demo credentials */}
          <div
            className="mb-6 rounded-xl"
            style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.875rem 1rem' }}
          >
            <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#15803d', marginBottom: '0.5rem' }}>
              Demo Credentials
            </p>
            <div className="space-y-1.5">
              {[
                { role: 'Administrator', email: 'admin@example.com', pass: 'Admin@123' },
                { role: 'Operator',      email: 'operator@example.com', pass: 'Operator@123' },
              ].map(cred => (
                <button
                  key={cred.role}
                  type="button"
                  className="w-full text-left rounded-lg transition-colors"
                  style={{ padding: '0.375rem 0.5rem', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}
                  onClick={() => { setEmail(cred.email); setPassword(cred.pass); }}
                >
                  <span className="font-semibold" style={{ fontSize: '11px', color: '#166534' }}>{cred.role}</span>
                  <span className="font-mono ml-2" style={{ fontSize: '11px', color: '#6b7280' }}>{cred.email}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="ui-label" htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                className="ui-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="ui-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                className="ui-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="ui-alert ui-alert-error">
                <span className="ui-alert-icon"><IconAlertTriangle size={16} /></span>
                <span>{error}</span>
              </div>
            )}

            <button
              id="login-submit-btn"
              type="submit"
              disabled={busy}
              className="ui-btn ui-btn-primary w-full"
              style={{ padding: '0.6875rem', fontSize: '13px', marginTop: '0.25rem' }}
            >
              {busy ? (
                <>
                  <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Signing in…
                </>
              ) : 'Sign in →'}
            </button>
          </form>

          <p className="mt-6 text-center" style={{ fontSize: '11px', color: '#9ca3af' }}>
            Secured by JWT · Role-Based Access Control · Audit Logged
          </p>
        </div>
      </div>
    </div>
  );
}
