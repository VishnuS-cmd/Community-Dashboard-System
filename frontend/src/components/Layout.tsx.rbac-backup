import { Link, Outlet, useNavigate } from 'react-router-dom';
import { clearToken } from '../lib/api';
import { projectConfig } from '../project.config';

export function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-[var(--theme-sidebar)] text-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">{projectConfig.displayName}</h1>
          <button className="rounded bg-accent px-3 py-1 text-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[240px,1fr]">
        <nav className="theme-surface border p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase text-slate-500">{projectConfig.theme.sidebarTitle}</p>
          <ul className="space-y-2 text-sm">
            {projectConfig.navigationLabels.map((link) => (
              <li key={link.to}>
                <Link className="theme-link block rounded px-3 py-2" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="theme-surface border p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
