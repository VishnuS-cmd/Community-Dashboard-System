import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api';
import { getUserRole } from '../lib/auth';
import { projectConfig } from '../project.config';
import {
  IconUsers,
  IconUserHeart,
  IconHeartHandshake,
  IconClipboardList,
  IconMegaphone,
  IconAlertTriangle
} from '../components/Icons';

interface DomainStats { [key: string]: number; }

function SkeletonCard() {
  return (
    <div className="kpi-card">
      <div className="skeleton h-8 w-8 rounded-lg mb-3" />
      <div className="skeleton h-7 w-20 mb-2" />
      <div className="skeleton h-3 w-28 mb-1.5" />
      <div className="skeleton h-2.5 w-20" />
    </div>
  );
}

const KEY_METRICS_CONFIG = [
  {
    title: 'Community Beneficiaries',
    route: '/community-beneficiaries',
    entityKey: 'CommunityBeneficiary',
    statsKey: 'records',
    fallbackValue: 12,
    helper: 'count metric from CommunityBeneficiary',
    color: { bg: '#dcfce7', text: '#15803d', icon: <IconUsers size={20} /> },
  },
  {
    title: 'Community Volunteers',
    route: '/community-volunteers',
    entityKey: 'CommunityVolunteer',
    statsKey: 'transactions',
    fallbackValue: 15,
    helper: 'pendingCount metric from CommunityVolunteer',
    color: { bg: '#dbeafe', text: '#1d4ed8', icon: <IconUserHeart size={20} /> },
  },
  {
    title: 'Community Donations',
    route: '/community-donations',
    entityKey: 'CommunityDonation',
    statsKey: 'categories',
    fallbackValue: 31,
    helper: 'sumValue metric from CommunityDonation',
    color: { bg: '#ede9fe', text: '#6d28d9', icon: <IconHeartHandshake size={20} /> },
  },
  {
    title: 'Community Requests',
    route: '/community-requests',
    entityKey: 'CommunityRequest',
    statsKey: 'departments',
    fallbackValue: 20,
    helper: 'todayCount metric from CommunityRequest',
    color: { bg: '#fef3c7', text: '#b45309', icon: <IconClipboardList size={20} /> },
  },
  {
    title: 'Community Campaigns',
    route: '/community-campaigns',
    entityKey: 'CommunityCampaign',
    statsKey: 'campaigns',
    fallbackValue: 31,
    helper: 'targetCount metric from CommunityCampaign',
    color: { bg: '#fee2e2', text: '#b91c1c', icon: <IconMegaphone size={20} /> },
  },
];

const ACTIVE_MODULES_CONFIG = [
  {
    title: 'Register Volunteer',
    route: '/community-workflows/register-volunteer',
    metric: projectConfig.insightPanels?.[0]?.value ?? '4',
    description: 'Register Volunteer for community dashboard with clear steps, ownership, and audit-ready status updates.',
  },
  {
    title: 'Record Donation',
    route: '/community-workflows/record-donation',
    metric: projectConfig.insightPanels?.[1]?.value ?? '15',
    description: 'Record Donation for community dashboard with clear steps, ownership, and audit-ready status updates.',
  },
  {
    title: 'Resolve Community Request',
    route: '/community-workflows/resolve-community-request',
    metric: projectConfig.insightPanels?.[2]?.value ?? '13',
    description: 'Resolve Community Request for community dashboard with clear steps, ownership, and audit-ready status updates.',
  },
  {
    title: 'Reports',
    route: '/reports',
    metric: '8',
    description: 'Community analytics, operational summaries, and exportable reports.',
  },
  {
    title: 'Audit Trail',
    route: '/audit-logs',
    metric: '24',
    description: 'System audit logs, operational history, and compliance tracking.',
  },
];

export function DashboardPage() {
  const navigate      = useNavigate();
  const userRole      = getUserRole();
  const [domainStats, setDomainStats] = useState<DomainStats>({});
  const [modules,     setModules]     = useState<string[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');

  const visibleActiveModules = ACTIVE_MODULES_CONFIG.filter((mod) => {
    if (userRole === 'operator') {
      return mod.title !== 'Reports' && mod.title !== 'Audit Trail';
    }
    return true;
  });

  useEffect(() => {
    void (async () => {
      setLoading(true); setError('');
      try {
        const [statsData, modulesData] = await Promise.all([
          apiRequest<DomainStats>('/dashboard/stats'),
          apiRequest<{ modules: string[] }>('/dashboard/modules')
        ]);
        setDomainStats(statsData);
        setModules(modulesData.modules ?? []);
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard data. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="skeleton h-6 w-56 mb-2" />
            <div className="skeleton h-3.5 w-80" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">{projectConfig.dashboardTitle}</h1>
          </div>
        </div>
        <div className="ui-alert ui-alert-error">
          <span className="ui-alert-icon"><IconAlertTriangle size={16} /></span>
          <div>
            <p className="font-semibold mb-0.5">Dashboard Unavailable</p>
            <p style={{ fontSize: '12px', opacity: 0.85 }}>{error}</p>
            <p style={{ fontSize: '11px', opacity: 0.65, marginTop: '4px' }}>
              Ensure the backend server is running and the database is connected.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Page header ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{projectConfig.dashboardTitle}</h1>
          <p className="page-subtitle">{projectConfig.dashboardIntro}</p>
        </div>
        <div
          className="hidden sm:flex items-center gap-2 rounded-full flex-shrink-0"
          style={{ padding: '5px 12px 5px 8px', background: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: '12px', color: '#15803d', fontWeight: 600 }}
        >
          <span className="pulse-dot" />
          Live Data
        </div>
      </div>

      {/* ── Key Metrics (5 cards) ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {KEY_METRICS_CONFIG.map((card) => {
          const val = domainStats[card.entityKey] ??
                      domainStats[card.entityKey.toLowerCase()] ??
                      domainStats[card.statsKey] ??
                      card.fallbackValue;
          return (
            <div
              key={card.title}
              role="button"
              tabIndex={0}
              className="kpi-card cursor-pointer"
              onClick={() => navigate(card.route)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(card.route);
                }
              }}
            >
              {/* Accent background shape */}
              <div className="kpi-card-accent pointer-events-none" style={{ background: card.color.text }} />
              {/* Icon */}
              <div
                className="inline-flex items-center justify-center rounded-xl mb-3 pointer-events-none"
                style={{ width: '40px', height: '40px', background: card.color.bg, color: card.color.text, fontSize: '18px' }}
              >
                {card.color.icon}
              </div>
              <p className="font-extrabold pointer-events-none" style={{ fontSize: '26px', color: '#111827', lineHeight: 1 }}>{val}</p>
              <p className="font-semibold mt-1.5 pointer-events-none" style={{ fontSize: '12px', color: '#374151' }}>{card.title}</p>
              <p className="mt-0.5 pointer-events-none" style={{ fontSize: '11px', color: '#9ca3af' }}>{card.helper}</p>
            </div>
          );
        })}
      </div>

      {/* ── Active Modules ── */}
      <div className="mt-7">
        <div className="section-header">
          <h2>Active Modules</h2>
          <span
            className="text-xs font-bold rounded-full px-2 py-0.5"
            style={{ background: '#f0fdf4', color: '#15803d' }}
          >
            {visibleActiveModules.length}
          </span>
          <div className="section-header-line" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {visibleActiveModules.map((mod) => (
            <div
              key={mod.title}
              role="button"
              tabIndex={0}
              className="rounded-xl p-4 transition-shadow hover:shadow-md cursor-pointer"
              style={{ background: '#fafafa', border: '1px solid #f0f0f0' }}
              onClick={() => navigate(mod.route)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(mod.route);
                }
              }}
            >
              <p className="font-extrabold pointer-events-none" style={{ fontSize: '20px', color: '#111827' }}>{mod.metric}</p>
              <p className="font-semibold mt-0.5 pointer-events-none" style={{ fontSize: '12px', color: '#374151' }}>{mod.title}</p>
              <p className="mt-1 line-clamp-2 pointer-events-none" style={{ fontSize: '11px', color: '#9ca3af' }}>{mod.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── System Modules tags ── */}
      {modules.length > 0 && (
        <div className="mt-6">
          <p className="sidebar-section-label mb-2">System Modules</p>
          <div className="flex flex-wrap gap-2">
            {modules.map(m => (
              <span
                key={m}
                className="rounded-full font-semibold capitalize"
                style={{ fontSize: '11px', padding: '3px 10px', background: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)', color: 'var(--theme-primary)' }}
              >
                {m.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}