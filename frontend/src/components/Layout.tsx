import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clearToken } from '../lib/api';
import { getCurrentUser, getRoleLabel } from '../lib/auth';
import { projectConfig } from '../project.config';
import {
  IconDashboard,
  IconUsers,
  IconUserHeart,
  IconHeartHandshake,
  IconClipboardList,
  IconMegaphone,
  IconUserCheck,
  IconCoins,
  IconWrench,
  IconBarChart,
  IconSearch,
  IconHandshake,
  IconLogOut
} from './Icons';

/** Map nav labels to clean UI outline icons */
const NAV_ICONS: Record<string, React.ReactNode> = {
  'Dashboard':                  <IconDashboard size={15} />,
  'Community Beneficiaries':    <IconUsers size={15} />,
  'Community Volunteers':       <IconUserHeart size={15} />,
  'Community Donations':        <IconHeartHandshake size={15} />,
  'Community Requests':         <IconClipboardList size={15} />,
  'Community Campaigns':        <IconMegaphone size={15} />,
  'Register Volunteer':         <IconUserCheck size={15} />,
  'Record Donation':            <IconCoins size={15} />,
  'Resolve Community Request':  <IconWrench size={15} />,
  'Reports':                    <IconBarChart size={15} />,
  'Audit Trail':                <IconSearch size={15} />,
};

export function Layout() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const currentUser = getCurrentUser();
  const roleLabel   = getRoleLabel(currentUser?.roleName ?? null);
  const isAdmin     = currentUser?.roleName === 'admin';

  const logout = () => {
    clearToken();
    navigate('/login');
  };

  const userRole     = currentUser?.roleName ?? null;
  const visibleLinks = (projectConfig.navigationLabels as Array<{
    to: string; label: string; roles?: string[];
  }>).filter((link) => {
    if (!link.roles || link.roles.length === 0) return true;
    return userRole !== null && link.roles.includes(userRole);
  });

  /** Derive page title from current path for breadcrumb */
  const activeLinkLabel = visibleLinks.find(
    (l) => location.pathname === l.to || location.pathname.startsWith(l.to + '/')
  )?.label ?? 'Dashboard';

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#f4f6f8', fontFamily: "'Inter',system-ui,sans-serif" }}>

      {/* ════════════════════════════════════════════
          TOP NAVBAR
          ════════════════════════════════════════════ */}
      <header
        className="flex-shrink-0 z-40 sticky top-0"
        style={{
          height: '60px',
          background: 'var(--theme-sidebar, #14532d)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.08), 0 3px 16px rgba(0,0,0,0.24)',
        }}
      >
        <div
          className="flex items-center justify-between h-full px-4"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          {/* Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className="flex items-center justify-center rounded-xl font-bold text-white flex-shrink-0"
              style={{
                width: '36px', height: '36px', fontSize: '18px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <IconHandshake size={20} />
            </div>
            <div>
              <p className="font-bold text-white leading-none" style={{ fontSize: '14px', letterSpacing: '0.01em' }}>
                {projectConfig.displayName}
              </p>
              <p className="font-medium leading-none mt-0.5" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Management System
              </p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-white" style={{ opacity: 0.55, fontSize: '12px' }}>
            <span>Home</span>
            <span>›</span>
            <span style={{ opacity: 1, color: '#fff', fontWeight: 600 }}>{activeLinkLabel}</span>
          </div>

          {/* Right: user + logout */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2.5 mr-1">
                {/* Avatar circle */}
                <div
                  className="flex items-center justify-center rounded-full font-bold text-white flex-shrink-0"
                  style={{
                    width: '32px', height: '32px', fontSize: '12px',
                    background: isAdmin ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.2)',
                    border: isAdmin ? '1px solid rgba(251,191,36,0.5)' : '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  {currentUser.displayName?.charAt(0)?.toUpperCase() ?? '?'}
                </div>
                <div className="leading-tight">
                  <p className="font-semibold text-white leading-none" style={{ fontSize: '12px' }}>
                    {currentUser.displayName}
                  </p>
                  <span
                    className="font-bold uppercase tracking-widest rounded-full"
                    style={{
                      fontSize: '9px',
                      padding: '1px 7px',
                      marginTop: '2px',
                      display: 'inline-block',
                      background: isAdmin ? 'rgba(251,191,36,0.25)' : 'rgba(255,255,255,0.15)',
                      color: isAdmin ? '#fde68a' : '#bbf7d0',
                      letterSpacing: '0.09em',
                    }}
                  >
                    {roleLabel}
                  </span>
                </div>
              </div>
            )}

            <button
              id="layout-logout-btn"
              onClick={logout}
              className="flex items-center gap-1.5 font-semibold rounded-lg transition-all"
              style={{
                padding: '0.375rem 0.875rem',
                fontSize: '12px',
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, { background: 'rgba(255,255,255,0.22)' })}
              onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, { background: 'rgba(255,255,255,0.12)' })}
            >
              <IconLogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          BODY: SIDEBAR + MAIN
          ════════════════════════════════════════════ */}
      <div
        className="flex flex-1"
        style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', alignItems: 'flex-start' }}
      >
        {/* ── Sidebar ─────────────────────────── */}
        <aside
          className="hidden md:flex flex-col flex-shrink-0"
          style={{
            width: '232px',
            minWidth: '232px',
            background: '#fff',
            borderRight: '1px solid #eaecef',
            minHeight: 'calc(100vh - 60px)',
            position: 'sticky',
            top: '60px',
            overflowY: 'auto',
            boxShadow: '2px 0 8px rgba(0,0,0,0.03)',
          }}
        >
          {/* Nav section label */}
          <p className="sidebar-section-label">Main Menu</p>

          {/* Nav links */}
          <nav className="pb-4">
            {visibleLinks.map((link) => {
              const active = location.pathname === link.to ||
                (link.to !== '/dashboard' && location.pathname.startsWith(link.to + '/'));
              const icon = NAV_ICONS[link.label] ?? '·';
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-item${active ? ' active' : ''}`}
                  title={link.label}
                >
                  <span
                    className="nav-icon"
                    style={active ? {
                      background: 'color-mix(in srgb, var(--theme-primary) 14%, transparent)',
                    } : {}}
                  >
                    {icon}
                  </span>
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          {currentUser && (
            <div className="mt-auto pb-4 px-3">
              <div
                className="rounded-xl px-3 py-3"
                style={{ background: '#f8faf9', border: '1px solid #e8f5e9' }}
              >
                <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#9ca3af' }}>
                  Signed in as
                </p>
                <p className="font-semibold truncate mt-0.5" style={{ fontSize: '12px', color: '#1f2937' }}>
                  {currentUser.displayName}
                </p>
                <p className="italic mt-0.5" style={{ fontSize: '11px', color: '#6b7280' }}>{roleLabel}</p>
                {isAdmin && (
                  <span
                    className="inline-block mt-1.5 font-bold uppercase rounded-full"
                    style={{
                      fontSize: '9px', padding: '2px 8px', letterSpacing: '0.07em',
                      background: '#fef9c3', color: '#92400e',
                    }}
                  >
                    Administrator
                  </span>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* ── Main content ─────────────────────── */}
        <main
          className="flex-1 min-w-0"
          style={{ padding: '1.5rem', minHeight: 'calc(100vh - 60px)' }}
        >
          <div
            className="rounded-xl"
            style={{
              background: '#fff',
              border: '1px solid #eaecef',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              padding: '1.5rem',
              minHeight: '400px',
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
