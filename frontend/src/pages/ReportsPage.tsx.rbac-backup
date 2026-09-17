import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { projectConfig } from '../project.config';

export function ReportsPage() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    void (async () => {
      const data = await apiRequest('/reports/summary');
      setSummary(data);
    })();
  }, []);

  const exportCsv = async () => {
    const csv = await apiRequest<string>('/reports/transactions-csv');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Reports</h2>
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        {projectConfig.reportSections.map((section) => (
          <article key={section.heading} className="theme-card p-4">
            <h3 className="font-semibold">{section.heading}</h3>
            <p className="mt-1 text-sm text-slate-600">{section.description}</p>
          </article>
        ))}
      </div>
      {projectConfig.majorProject ? (
        <div className="theme-surface mb-4 border p-4">
          <h3 className="font-semibold">Workflow Validation</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {projectConfig.majorProject.workflows.map((workflow) => (
              <article key={workflow.name} className="theme-card p-3">
                <p className="font-medium">{workflow.name}</p>
                <ol className="mt-2 list-decimal pl-5 text-sm text-slate-600">
                  {workflow.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      ) : null}
      <button className="mb-4 rounded bg-primary px-4 py-2 text-white" onClick={exportCsv}>
        Export CSV
      </button>
      <pre className="rounded border bg-slate-50 p-4 text-sm">{JSON.stringify(summary, null, 2)}</pre>
    </section>
  );
}
