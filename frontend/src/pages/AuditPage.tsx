import { useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';
import { Pagination } from '../components/Pagination';
import { apiRequest } from '../lib/api';
import { isAdmin } from '../lib/auth';
import { PaginatedResponse, defaultPaginationMeta, toPaginatedResponse } from '../lib/pagination';
import { AccessDeniedPage } from './AccessDeniedPage';
import { IconSearch, IconLock } from '../components/Icons';

export function AuditPage() {
  // Defense-in-depth: block rendering and API calls before the route guard fires.
  if (!isAdmin()) {
    return <AccessDeniedPage />;
  }
  return <AuditContent />;
}

/** Inner component — only mounted when isAdmin() is true. */
function AuditContent() {
  const [items,   setItems]   = useState<any[]>([]);
  const [page,    setPage]    = useState(1);
  const [meta,    setMeta]    = useState(defaultPaginationMeta);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const payload = await apiRequest<PaginatedResponse<any> | any[]>(
          `/audit-logs?page=${page}&limit=10`
        );
        const data = toPaginatedResponse(payload, page);
        setItems(data.data);
        setMeta(data.meta);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  function actionBadgeClass(action: string) {
    const a = (action || '').toUpperCase();
    if (a === 'CREATE') return 'badge badge-green';
    if (a === 'UPDATE') return 'badge badge-blue';
    if (a === 'DELETE') return 'badge badge-red';
    if (a === 'LOGIN')  return 'badge badge-purple';
    return 'badge badge-gray';
  }

  function avatarColor(name: string) {
    const colors = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ef4444'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = (name.charCodeAt(i) + ((hash << 5) - hash)) | 0;
    return colors[Math.abs(hash) % colors.length];
  }

  return (
    <div>
      {/* ── Page header ── */}
      <div className="page-header">
        <div className="flex items-start gap-3">
          <BackButton className="mt-1" />
          <div className="icon-box icon-box-purple flex-shrink-0 mt-0.5" style={{ width: '42px', height: '42px', fontSize: '20px', color: '#6d28d9' }}>
            <IconSearch size={20} />
          </div>
          <div>
            <h1 className="page-title">Audit Trail</h1>
            <p className="page-subtitle">
              Immutable log of all create, update and delete operations · {meta.total} entries
            </p>
          </div>
        </div>
        <div
          className="hidden sm:flex items-center gap-2 rounded-full font-semibold flex-shrink-0"
          style={{ fontSize: '11px', padding: '4px 12px', background: '#ede9fe', color: '#6d28d9', border: '1px solid #ddd6fe' }}
        >
          <IconLock size={12} className="inline mr-1" /> Admin Only
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="flex h-40 items-center justify-center gap-3">
          <div
            className="rounded-full animate-spin border-[3px]"
            style={{ width: '28px', height: '28px', borderColor: '#e5e7eb', borderTopColor: '#6366f1' }}
          />
          <span style={{ fontSize: '13px', color: '#9ca3af' }}>Loading audit entries…</span>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon flex items-center justify-center">
            <IconSearch size={36} />
          </span>
          <p className="empty-state-title">No audit entries yet</p>
          <p className="empty-state-sub">Entries appear when users perform create, update, or delete actions.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Record ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const name  = item.actor ?? 'System';
                const color = avatarColor(name);
                return (
                  <tr key={item.id ?? idx}>
                    <td style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 500 }}>
                      {(page - 1) * 10 + idx + 1}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-full font-bold text-white flex-shrink-0"
                          style={{ width: '28px', height: '28px', fontSize: '11px', background: color }}
                        >
                          {name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontSize: '12px', color: '#1f2937' }}>{name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={actionBadgeClass(item.action)}>
                        {item.action ?? '—'}
                      </span>
                    </td>
                    <td>
                      <span
                        className="font-mono font-semibold rounded"
                        style={{ fontSize: '11px', padding: '2px 7px', background: '#f3f4f6', color: '#374151' }}
                      >
                        {item.entity ?? '—'}
                      </span>
                    </td>
                    <td style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace' }}>
                      {item.entityId ?? item.recordId ?? '—'}
                    </td>
                    <td style={{ fontSize: '11px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })
                        : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Pagination meta={meta} onPageChange={setPage} />
    </div>
  );
}
