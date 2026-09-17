import { FormEvent, useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { apiRequest } from '../lib/api';
import { PaginatedResponse, defaultPaginationMeta, toPaginatedResponse } from '../lib/pagination';
import { projectConfig } from '../project.config';

interface RefItem {
  id: string;
  name: string;
}

export function RecordsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(defaultPaginationMeta);
  const [categories, setCategories] = useState<RefItem[]>([]);
  const [departments, setDepartments] = useState<RefItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [status, setStatus] = useState('active');

  const load = async () => {
    const [recordsData, categoriesData, departmentsData] = await Promise.all([
      apiRequest<PaginatedResponse<any> | any[]>(`/records?page=${page}&limit=10`),
      apiRequest<RefItem[]>('/categories'),
      apiRequest<RefItem[]>('/departments')
    ]);
    const paginatedRecords = toPaginatedResponse(recordsData, page);

    setItems(paginatedRecords.data);
    setMeta(paginatedRecords.meta);
    setCategories(categoriesData);
    setDepartments(departmentsData);

    if (!categoryId && categoriesData.length > 0) setCategoryId(categoriesData[0].id);
    if (!departmentId && departmentsData.length > 0) setDepartmentId(departmentsData[0].id);
  };

  useEffect(() => {
    void load();
  }, [page]);

  const create = async (event: FormEvent) => {
    event.preventDefault();
    await apiRequest('/records', {
      method: 'POST',
      body: JSON.stringify({ title, description, categoryId, departmentId, status })
    });
    setTitle('');
    setDescription('');
    setPage(1);
    await load();
  };

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">{projectConfig.recordPage.title}</h2>
      <p className="mb-4 text-sm text-slate-600">{projectConfig.recordPage.intro}</p>
      <form className="grid gap-2 md:grid-cols-5" onSubmit={create}>
        <input aria-label={projectConfig.recordPage.fields.title.label} className="rounded border px-3 py-2" placeholder={projectConfig.recordPage.fields.title.placeholder} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input aria-label={projectConfig.recordPage.fields.description.label} className="rounded border px-3 py-2" placeholder={projectConfig.recordPage.fields.description.placeholder} value={description} onChange={(e) => setDescription(e.target.value)} />
        <select className="rounded border px-3 py-2" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <select className="rounded border px-3 py-2" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
        </select>
        <button className="rounded bg-primary px-4 py-2 text-white">{projectConfig.recordPage.createAction}</button>
      </form>

      <table className="mt-4 w-full table-auto border-collapse text-left text-sm">
        <thead>
          <tr>
            {projectConfig.recordPage.columns.map((column) => (
              <th key={column.key} className="border-b p-2">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {projectConfig.recordPage.columns.map((column) => (
                <td key={column.key} className="border-b p-2">{item[column.key] || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination meta={meta} onPageChange={setPage} />
    </section>
  );
}
