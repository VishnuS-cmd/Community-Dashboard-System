import { FormEvent, useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { apiRequest } from '../lib/api';
import { PaginatedResponse, defaultPaginationMeta, toPaginatedResponse } from '../lib/pagination';
import { projectConfig } from '../project.config';

export function TransactionsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(defaultPaginationMeta);
  const [records, setRecords] = useState<any[]>([]);
  const [recordId, setRecordId] = useState('');
  const [type, setType] = useState('credit');
  const [amount, setAmount] = useState('100');
  const [note, setNote] = useState('');

  const load = async () => {
    const [transactionsData, recordsData] = await Promise.all([
      apiRequest<PaginatedResponse<any> | any[]>(`/transactions?page=${page}&limit=10`),
      apiRequest<any[]>('/records')
    ]);
    const paginatedTransactions = toPaginatedResponse(transactionsData, page);
    setItems(paginatedTransactions.data);
    setMeta(paginatedTransactions.meta);
    setRecords(recordsData);
    if (!recordId && recordsData.length > 0) setRecordId(recordsData[0].id);
  };

  useEffect(() => {
    void load();
  }, [page]);

  const create = async (event: FormEvent) => {
    event.preventDefault();
    await apiRequest('/transactions', {
      method: 'POST',
      body: JSON.stringify({ recordId, type, amount: Number(amount), note })
    });
    setAmount('100');
    setNote('');
    setPage(1);
    await load();
  };

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">{projectConfig.transactionPage.title}</h2>
      <p className="mb-4 text-sm text-slate-600">{projectConfig.transactionPage.intro}</p>
      <form className="grid gap-2 md:grid-cols-5" onSubmit={create}>
        <select className="rounded border px-3 py-2" value={recordId} onChange={(e) => setRecordId(e.target.value)}>
          {records.map((record) => <option key={record.id} value={record.id}>{record.title}</option>)}
        </select>
        <input className="rounded border px-3 py-2" value={type} onChange={(e) => setType(e.target.value)} placeholder={projectConfig.transactionPage.fields.type.placeholder} />
        <input className="rounded border px-3 py-2" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={projectConfig.transactionPage.fields.amount.placeholder} />
        <input className="rounded border px-3 py-2" value={note} onChange={(e) => setNote(e.target.value)} placeholder={projectConfig.transactionPage.fields.note.placeholder} />
        <button className="rounded bg-primary px-4 py-2 text-white">{projectConfig.transactionPage.createAction}</button>
      </form>

      <table className="mt-4 w-full table-auto border-collapse text-left text-sm">
        <thead>
          <tr>
            {projectConfig.transactionPage.columns.map((column) => (
              <th key={column.key} className="border-b p-2">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {projectConfig.transactionPage.columns.map((column) => (
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
