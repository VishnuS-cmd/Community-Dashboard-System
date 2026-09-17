import { useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';
import { apiRequest } from '../lib/api';
import { isAdmin } from '../lib/auth';
import { AccessDeniedPage } from './AccessDeniedPage';
import { projectConfig } from '../project.config';
import {
  IconBarChart,
  IconTrendingUp,
  IconTrendingDown,
  IconClipboardList,
  IconFiles,
  IconFlask,
  IconDownload,
  IconAlertTriangle,
  IconZap,
  IconSearch
} from '../components/Icons';

export function ReportsPage() {
  // Defense-in-depth: block rendering and API calls before the route guard can fire.
  if (!isAdmin()) {
    return <AccessDeniedPage />;
  }
  return <ReportsContent />;
}

/** Inner component — only mounted when isAdmin() is true. */
function ReportsContent() {
  const [summary,        setSummary]        = useState<any>(null);
  const [csvError,       setCsvError]       = useState('');
  const [csvLoading,     setCsvLoading]     = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setSummaryLoading(true);
      try {
        const data = await apiRequest('/reports/summary');
        setSummary(data);
      } finally {
        setSummaryLoading(false);
      }
    })();
  }, []);

  const exportCsv = async () => {
    setCsvError('');
    setCsvLoading(true);
    try {
      const csv = await apiRequest<string>('/reports/transactions-csv');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'transactions.csv'; link.click();
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      setCsvError(e instanceof Error ? e.message : 'CSV export failed');
    } finally {
      setCsvLoading(false);
    }
  };

  const summaryEntries: [string, number][] = summary
    ? Object.entries(summary).map(([k, v]) => [k, Number(v)])
    : [];

  const SECTION_ICONS: React.ReactNode[] = [
    <IconBarChart size={18} />,
    <IconTrendingUp size={18} />,
    <IconTrendingDown size={18} />,
    <IconClipboardList size={18} />,
    <IconFiles size={18} />,
    <IconFlask size={18} />
  ];

  return (
    <div>
      {/* ── Page header ── */}
      <div className="page-header">
        <div className="flex items-start gap-3">
          <BackButton className="mt-1" />
          <div className="icon-box icon-box-blue flex-shrink-0 mt-0.5" style={{ width: '42px', height: '42px', fontSize: '20px', color: '#1d4ed8' }}>
            <IconBarChart size={20} />
          </div>
          <div>
            <h1 className="page-title">Reports &amp; Analytics</h1>
            <p className="page-subtitle">Summary statistics, data insights and CSV export</p>
          </div>
        </div>
        <button
          id="reports-export-csv-btn"
          className="ui-btn ui-btn-primary ui-btn-sm flex-shrink-0"
          onClick={exportCsv}
          disabled={csvLoading}
        >
          {csvLoading ? (
            <>
              <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Exporting…
            </>
          ) : (
            <>
              <IconDownload size={13} className="mr-1 inline" /> Export CSV
            </>
          )}
        </button>
      </div>

      {/* CSV error */}
      {csvError && (
        <div className="ui-alert ui-alert-error mb-5">
          <span className="ui-alert-icon"><IconAlertTriangle size={16} /></span>
          <span>{csvError}</span>
        </div>
      )}

      {/* ── Live summary cards ── */}
      {summaryLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="kpi-card">
              <div className="skeleton h-8 w-8 rounded-lg mb-3" />
              <div className="skeleton h-6 w-16 mb-2" />
              <div className="skeleton h-3 w-24" />
            </div>
          ))}
        </div>
      ) : summaryEntries.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-7">
          {summaryEntries.map(([key, value], i) => (
            <div key={key} className="kpi-card">
              <div
                className="inline-flex items-center justify-center rounded-xl mb-3"
                style={{ width: '36px', height: '36px', background: '#dbeafe', color: '#1d4ed8', fontSize: '16px' }}
              >
                {SECTION_ICONS[i % SECTION_ICONS.length]}
              </div>
              <p className="font-extrabold" style={{ fontSize: '24px', color: '#111827', lineHeight: 1 }}>
                {value.toLocaleString()}
              </p>
              <p className="font-semibold mt-1 capitalize" style={{ fontSize: '12px', color: '#374151' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Report sections ── */}
      {projectConfig.reportSections?.length > 0 && (
        <div className="mb-6">
          <div className="section-header">
            <h2>Report Sections</h2>
            <div className="section-header-line" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {projectConfig.reportSections.map((section: any, i: number) => (
              <div
                key={section.heading}
                className="flex items-start gap-3 rounded-xl p-4 transition-shadow hover:shadow-md"
                style={{ background: '#fafafa', border: '1px solid #f0f0f0' }}
              >
                <div className="icon-box icon-box-green flex-shrink-0 mt-0.5" style={{ color: '#15803d' }}>
                  {SECTION_ICONS[i % SECTION_ICONS.length]}
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: '13px', color: '#1f2937' }}>{section.heading}</p>
                  <p className="mt-0.5" style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5 }}>{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Workflow validation ── */}
      {projectConfig.majorProject?.workflows?.length > 0 && (
        <div className="mb-6">
          <div className="section-header">
            <h2>Workflow Validation</h2>
            <div className="section-header-line" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projectConfig.majorProject.workflows.map((wf: any) => (
              <div key={wf.name} className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
                <div className="flex items-center gap-2 mb-3">
                  <IconZap size={14} className="text-amber-500" />
                  <p className="font-bold" style={{ fontSize: '13px', color: '#111827' }}>{wf.name}</p>
                </div>
                <ol className="space-y-2 pl-1">
                  {wf.steps.map((step: string, idx: number) => (
                    <li key={step} className="flex items-start gap-2">
                      <span
                        className="flex-shrink-0 flex items-center justify-center rounded-full font-bold text-white mt-0.5"
                        style={{ width: '18px', height: '18px', fontSize: '9px', background: '#15803d' }}
                      >
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: '12px', color: '#4b5563' }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Raw API response (collapsible) ── */}
      {summary && (
        <details
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #e5e7eb' }}
        >
          <summary
            className="flex items-center gap-2 cursor-pointer select-none font-semibold transition-colors"
            style={{ padding: '0.75rem 1rem', background: '#f9fafb', fontSize: '12px', color: '#4b5563' }}
          >
            <IconSearch size={14} /> Raw API Response
          </summary>
          <pre
            style={{
              margin: 0, padding: '1rem', fontSize: '11px',
              color: '#374151', background: '#fff', overflowX: 'auto',
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            {JSON.stringify(summary, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
