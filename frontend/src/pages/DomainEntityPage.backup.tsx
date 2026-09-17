import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { apiRequest } from '../lib/api';
import { PaginatedResponse, defaultPaginationMeta, toPaginatedResponse } from '../lib/pagination';

interface DomainEntityPageProps {
  entity: any;
}

export function DomainEntityPage({ entity }: DomainEntityPageProps) {
  const formFields = useMemo(() => {
    const seen = new Set<string>();
    return (entity.fields || []).filter((f: any) => {
      if (!f.form || seen.has(f.name)) return false;
      seen.add(f.name);
      return true;
    });
  }, [entity]);

  const tableColumns = useMemo(() => {
    const seen = new Set<string>();
    return (entity.fields || []).filter((f: any) => {
      if (!f.table || seen.has(f.name)) return false;
      seen.add(f.name);
      return true;
    });
  }, [entity]);

  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(defaultPaginationMeta);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const load = async (currentPage = page) => {
    const seedRows = Array.isArray(entity.seed) ? entity.seed : [];
    setLoading(true);
    try {
      const payload = await apiRequest<PaginatedResponse<Record<string, any>> | Record<string, any>[]>(
        `/domain/${entity.name}?page=${currentPage}&limit=10`
      );
      const data = toPaginatedResponse(payload, currentPage);
      const rows = data.data.length ? data.data : seedRows;
      setItems(rows);
      setMeta({
        ...data.meta,
        total: data.data.length ? data.meta.total : rows.length,
        totalPages: data.data.length ? data.meta.totalPages : Math.max(1, Math.ceil(rows.length / 10))
      });
    } catch {
      setItems(seedRows);
      setMeta({
        page: currentPage,
        limit: 10,
        total: seedRows.length,
        totalPages: Math.max(1, Math.ceil(seedRows.length / 10))
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm({});
    setPage(1);
    void load(1);
  }, [entity.name]);

  useEffect(() => {
    void load(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const create = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    try {
      await apiRequest(`/domain/${entity.name}`, {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setForm({});
      setSuccess(entity.page?.successMessage || `${entity.name} saved successfully.`);
      await load(1);
      setPage(1);
    } catch (e: any) {
      setError(e.message || `Failed to create ${entity.name}`);
    }
  };

  return (
    <section>
      <h1 className="mb-1 text-2xl font-semibold">{entity.page?.title || entity.plural || entity.name}</h1>
      <p className="mb-4 text-sm text-slate-600">{entity.page?.intro || `Manage ${entity.plural || entity.name}.`}</p>

      <form className="mb-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3" onSubmit={create}>
        {formFields.slice(0, 8).map((field: any) =>
          field.type === 'select' && Array.isArray(field.options) ? (
            <select
              key={field.name}
              aria-label={field.label}
              className="rounded border px-3 py-2 bg-white"
              value={form[field.name] || ''}
              required={Boolean(field.required)}
              onChange={(e) => setForm((cur) => ({ ...cur, [field.name]: e.target.value }))}
            >
              <option value="">{field.label}</option>
              {field.options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              key={field.name}
              aria-label={field.label}
              className="rounded border px-3 py-2"
              placeholder={field.label}
              type={field.type === 'number' ? 'number' : 'text'}
              value={form[field.name] || ''}
              required={Boolean(field.required)}
              onChange={(e) => setForm((cur) => ({ ...cur, [field.name]: e.target.value }))}
            />
          )
        )}
        <button className="rounded bg-primary px-4 py-2 text-white font-medium col-span-full md:col-span-1">
          {entity.page?.createAction || `Add ${entity.name}`}
        </button>
      </form>

      {error && <p className="mb-3 rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">{error}</p>}
      {success && <p className="mb-3 rounded border border-green-300 bg-green-50 p-2 text-sm text-green-700">{success}</p>}

      {loading ? (
        <div className="flex h-24 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50">
                {tableColumns.slice(0, 7).map((field: any) => (
                  <th key={field.name} className="border-b px-3 py-2 font-semibold text-slate-700">{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length || 1} className="py-8 text-center text-sm text-slate-500">
                    {entity.page?.emptyState || 'No records found.'}
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id || JSON.stringify(item)} className="hover:bg-slate-50">
                    {tableColumns.slice(0, 7).map((field: any) => (
                      <td key={field.name} className="border-b px-3 py-2">{item[field.name] ?? '-'}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <Pagination meta={meta} onPageChange={handlePageChange} />
    </section>
  );
}