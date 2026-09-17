import { FormEvent, useEffect, useMemo, useState } from 'react';
import { BackButton } from '../components/BackButton';
import { Pagination } from '../components/Pagination';
import { apiRequest } from '../lib/api';
import {
  PaginatedResponse,
  defaultPaginationMeta,
  toPaginatedResponse
} from '../lib/pagination';
import {
  IconAlertTriangle,
  IconCheckCircle,
  IconInbox,
  IconPencil,
  IconTrash,
  IconCheck
} from '../components/Icons';

interface DomainEntityPageProps { entity: any; }

const STATUS_FIELDS = new Set(['status', 'needtype', 'type', 'state', 'category', 'priority']);

function StatusBadge({ value }: { value: string }) {
  const v = String(value).toLowerCase();
  let cls = 'badge badge-gray';
  if (v === 'active' || v === 'approved' || v === 'completed' || v === 'resolved') cls = 'badge badge-green';
  else if (v === 'pending' || v === 'pending review' || v === 'in review')         cls = 'badge badge-yellow';
  else if (v === 'closed' || v === 'rejected' || v === 'inactive')                 cls = 'badge badge-red';
  else if (v === 'in progress' || v === 'processing' || v === 'ongoing')            cls = 'badge badge-blue';
  else if (v === 'food' || v === 'medical' || v === 'shelter')                     cls = 'badge badge-purple';
  return <span className={cls}>{value}</span>;
}

export function DomainEntityPage({ entity }: DomainEntityPageProps) {

  const formFields = useMemo(() => {
    const seen = new Set<string>();
    return (entity.fields || []).filter((f: any) => {
      if (!f.form || seen.has(f.name)) return false;
      seen.add(f.name); return true;
    });
  }, [entity]);

  const tableColumns = useMemo(() => {
    const seen = new Set<string>();
    return (entity.fields || []).filter((f: any) => {
      if (!f.table || seen.has(f.name)) return false;
      seen.add(f.name); return true;
    });
  }, [entity]);

  const [items,     setItems]     = useState<Record<string, any>[]>([]);
  const [form,      setForm]      = useState<Record<string, string>>({});
  const [page,      setPage]      = useState(1);
  const [meta,      setMeta]      = useState(defaultPaginationMeta);
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async (p = page) => {
    const seed = Array.isArray(entity.seed) ? entity.seed : [];
    setLoading(true);
    try {
      const payload = await apiRequest<PaginatedResponse<Record<string, any>> | Record<string, any>[]>(
        `/domain/${entity.name}?page=${p}&limit=10`
      );
      const data = toPaginatedResponse(payload, p);
      const rows = data.data.length ? data.data : seed;
      setItems(rows);
      setMeta({
        ...data.meta,
        total:      data.data.length ? data.meta.total      : rows.length,
        totalPages: data.data.length ? data.meta.totalPages : Math.max(1, Math.ceil(rows.length / 10))
      });
    } catch {
      setItems(seed);
      setMeta({ page: p, limit: 10, total: seed.length, totalPages: Math.max(1, Math.ceil(seed.length / 10)) });
    } finally { setLoading(false); }
  };

  useEffect(() => {
    setForm({}); setPage(1); setSuccess(''); setError(''); setEditingId(null);
    void load(1);
  }, [entity.name]);

  useEffect(() => { void load(page); }, [page]);

  const create = async (e: FormEvent) => {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      await apiRequest(`/domain/${entity.name}`, { method: 'POST', body: JSON.stringify(form) });
      setForm({});
      setSuccess(entity.page?.successMessage || `${entity.name} saved successfully.`);
      await load(1); setPage(1);
    } catch (err: any) { setError(err.message || `Failed to create ${entity.name}`); }
  };

  const startEdit = (item: Record<string, any>) => {
    if (!item.id) return;
    const ed: Record<string, string> = {};
    formFields.forEach((f: any) => { ed[f.name] = item[f.name] == null ? '' : String(item[f.name]); });
    setForm(ed); setEditingId(item.id); setError(''); setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({}); setError(''); setSuccess(''); };

  const update = async (e: FormEvent) => {
    e.preventDefault(); if (!editingId) return;
    setError(''); setSuccess('');
    try {
      await apiRequest(`/domain/${entity.name}/${editingId}`, { method: 'PUT', body: JSON.stringify(form) });
      setForm({}); setEditingId(null);
      setSuccess(`${entity.name} updated successfully.`);
      await load(page);
    } catch (err: any) { setError(err.message || `Failed to update ${entity.name}`); }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm('Delete this record?')) return;
    setError(''); setSuccess('');
    try {
      await apiRequest(`/domain/${entity.name}/${id}`, { method: 'DELETE' });
      setSuccess(`${entity.name} deleted.`);
      await load(page);
    } catch (err: any) { setError(err.message || `Failed to delete ${entity.name}`); }
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="page-header">
        <div className="flex items-start gap-3">
          <BackButton className="mt-0.5" />
          <div>
            <h1 className="page-title">{entity.page?.title || entity.plural || entity.name}</h1>
            <p className="page-subtitle">{entity.page?.intro || `Manage ${entity.plural || entity.name}.`}</p>
          </div>
        </div>
        <span
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full font-semibold flex-shrink-0"
          style={{ fontSize: '11px', padding: '4px 10px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
        >
          {meta.total} records
        </span>
      </div>

      {/* ── Alerts ── */}
      {error && (
        <div className="ui-alert ui-alert-error mb-4">
          <span className="ui-alert-icon"><IconAlertTriangle size={16} /></span>
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="ui-alert ui-alert-success mb-4">
          <span className="ui-alert-icon"><IconCheckCircle size={16} /></span>
          <span>{success}</span>
        </div>
      )}

      {/* ── Form panel ── */}
      <div className={`form-panel${editingId ? ' editing' : ''} mb-5`}>
        <p className="form-panel-title">
          {editingId ? <><IconPencil size={12} className="inline mr-1" /> Editing record</> : `+ ${entity.page?.createAction || `Add ${entity.name}`}`}
        </p>
        <form
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          onSubmit={editingId ? update : create}
        >
          {formFields.slice(0, 8).map((field: any) =>
            field.type === 'select' && Array.isArray(field.options) ? (
              <div key={field.name}>
                <label className="ui-label" htmlFor={`f-${field.name}`}>{field.label}</label>
                <select
                  id={`f-${field.name}`}
                  className="ui-input"
                  value={form[field.name] || ''}
                  required={Boolean(field.required)}
                  onChange={e => setForm(c => ({ ...c, [field.name]: e.target.value }))}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={field.name}>
                <label className="ui-label" htmlFor={`f-${field.name}`}>{field.label}</label>
                <input
                  id={`f-${field.name}`}
                  className="ui-input"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={form[field.name] || ''}
                  required={Boolean(field.required)}
                  onChange={e => setForm(c => ({ ...c, [field.name]: e.target.value }))}
                />
              </div>
            )
          )}

          <div className="col-span-full flex gap-2 pt-1">
            <button type="submit" className="ui-btn ui-btn-primary ui-btn-sm">
              {editingId ? <><IconCheck size={13} className="inline mr-1" /> Save changes</> : (entity.page?.createAction || `Add ${entity.name}`)}
            </button>
            {editingId && (
              <button type="button" className="ui-btn ui-btn-ghost ui-btn-sm" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="flex h-36 items-center justify-center gap-3">
          <div
            className="rounded-full animate-spin border-[3px]"
            style={{ width: '28px', height: '28px', borderColor: '#e5e7eb', borderTopColor: 'var(--theme-primary)' }}
          />
          <span style={{ fontSize: '13px', color: '#9ca3af' }}>Loading records…</span>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                {tableColumns.slice(0, 7).map((f: any) => <th key={f.name}>{f.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={(tableColumns.length || 1) + 2}>
                    <div className="empty-state">
                      <span className="empty-state-icon flex items-center justify-center">
                        <IconInbox size={36} />
                      </span>
                      <p className="empty-state-title">{entity.page?.emptyState || 'No records found'}</p>
                      <p className="empty-state-sub">Use the form above to add your first record.</p>
                    </div>
                  </td>
                </tr>
              ) : items.map((item, rowIdx) => (
                <tr key={item.id || JSON.stringify(item)}>
                  <td style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 500 }}>
                    {(page - 1) * 10 + rowIdx + 1}
                  </td>
                  {tableColumns.slice(0, 7).map((f: any) => {
                    const val = item[f.name];
                    const isStat = STATUS_FIELDS.has(f.name.toLowerCase());
                    return (
                      <td key={f.name}>
                        {val != null && isStat
                          ? <StatusBadge value={String(val)} />
                          : val != null
                            ? <span style={{ color: '#374151' }}>{String(val)}</span>
                            : <span style={{ color: '#d1d5db' }}>—</span>
                        }
                      </td>
                    );
                  })}
                  <td>
                    {item.id ? (
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          className="ui-btn ui-btn-edit ui-btn-sm"
                          onClick={() => startEdit(item)}
                        >
                          <IconPencil size={11} className="inline mr-1" /> Edit
                        </button>
                        <button
                          type="button"
                          className="ui-btn ui-btn-danger ui-btn-sm"
                          onClick={() => deleteItem(item.id)}
                          aria-label="Delete"
                        >
                          <IconTrash size={12} />
                        </button>
                      </div>
                    ) : <span style={{ color: '#d1d5db' }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination meta={meta} onPageChange={setPage} />
    </div>
  );
}