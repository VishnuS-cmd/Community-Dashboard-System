import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, setToken } from '../lib/api';
import { projectConfig } from '../project.config';
import { DomainVector } from '../theme/vectors';

interface LoginResponse {
  accessToken: string;
  user: { email: string; displayName: string; role: string };
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setToken(response.accessToken);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen items-center gap-8 p-6 lg:grid-cols-[1fr,460px]">
      <section className="mx-auto hidden max-w-2xl lg:block">
        <DomainVector className="w-full drop-shadow-sm" />
        <h1 className="mt-6 text-4xl font-bold text-slate-950">{projectConfig.displayName}</h1>
        <p className="mt-3 text-base text-slate-600">{projectConfig.recordPage.intro}</p>
      </section>
      <form className="theme-surface mx-auto w-full max-w-md border p-6 shadow" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-2xl font-bold">Demo Login</h2>
        <p className="mb-4 text-sm text-slate-600">admin@example.com / Admin@123</p>
        <label className="mb-3 block text-sm">
          Email
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="mb-3 block text-sm">
          Password
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded bg-primary px-4 py-2 text-white" disabled={busy}>
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
