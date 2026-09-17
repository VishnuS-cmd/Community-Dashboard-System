interface WorkflowPageProps {
  workflow: any;
}

export function WorkflowPage({ workflow }: WorkflowPageProps) {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">{workflow.label}</h2>
      <p className="mb-4 text-sm text-slate-600">{workflow.description}</p>
      <div className="grid gap-3 md:grid-cols-5">
        {(workflow.steps || []).map((step: string, index: number) => (
          <article key={step} className="theme-card p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-medium">{step}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
