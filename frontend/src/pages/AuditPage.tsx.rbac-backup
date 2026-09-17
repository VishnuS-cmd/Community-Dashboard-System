import { useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { apiRequest } from '../lib/api';
import { PaginatedResponse, defaultPaginationMeta, toPaginatedResponse } from '../lib/pagination';

export function AuditPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(defaultPaginationMeta);

  useEffect(() => {
    void (async () => {
      const payload = await apiRequest<PaginatedResponse<any> | any[]>(`/audit-logs?page=${page}&limit=10`);
      const data = toPaginatedResponse(payload, page);
      setItems(data.data);
      setMeta(data.meta);
    })();
  }, [page]);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Audit Log</h2>
      <table className="w-full table-auto border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="border-b p-2">Actor</th>
            <th className="border-b p-2">Action</th>
            <th className="border-b p-2">Entity</th>
            <th className="border-b p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border-b p-2">{item.actor}</td>
              <td className="border-b p-2">{item.action}</td>
              <td className="border-b p-2">{item.entity}</td>
              <td className="border-b p-2">{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination meta={meta} onPageChange={setPage} />
    </section>
  );
}
