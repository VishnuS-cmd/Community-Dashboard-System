import { FormEvent, useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { apiRequest } from '../lib/api';
import { PaginatedResponse, defaultPaginationMeta, toPaginatedResponse } from '../lib/pagination';
import { projectConfig } from '../project.config';

interface EntityPageProps {
  endpoint: string;
  title: string;
}

export function EntityPage({ endpoint, title }: EntityPageProps) {
  const pageConfig = projectConfig.entityPages[endpoint as keyof typeof projectConfig.entityPages];
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(defaultPaginationMeta);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    const payload = await apiRequest<PaginatedResponse<Record<string, any>> | Record<string, any>[]>(
      `/${endpoint}?page=${page}&limit=10`
    );
    const data = toPaginatedResponse(payload, page);
    setItems(data.data);
    setMeta(data.meta);
  };

  useEffect(() => {
    void load();
  }, [endpoint, page]);

  const create = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const payload: Record<string, string> = { name };
      if (description) payload.description = description;
      await apiRequest(`/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setName('');
      setDescription('');
      setPage(1);
      await load();
    } catch (e: any) {
      setError(e.message || 'Failed to create');
    }
  };

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">{pageConfig?.title || title}</h2>
      <form className="mb-4 grid gap-3 md:grid-cols-3" onSubmit={create}>
        <input
          className="rounded border px-3 py-2"
          aria-label={pageConfig?.nameLabel || 'Name'}
          placeholder={pageConfig?.namePlaceholder || 'Name'}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="rounded border px-3 py-2"
          aria-label={pageConfig?.descriptionLabel || 'Description'}
          placeholder={pageConfig?.descriptionPlaceholder || 'Description'}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button className="rounded bg-primary px-4 py-2 text-white">{pageConfig?.createAction || 'Create'}</button>
      </form>
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
      <table className="w-full table-auto border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">{pageConfig?.nameLabel || 'Name'}</th>
            <th className="border-b p-2">{pageConfig?.descriptionLabel || 'Description'}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border-b p-2">{item.id}</td>
              <td className="border-b p-2">{item.name || item.title || '-'}</td>
              <td className="border-b p-2">{item.description || item.status || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination meta={meta} onPageChange={setPage} />
    </section>
  );
}
