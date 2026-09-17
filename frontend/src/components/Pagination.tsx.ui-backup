interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  const firstItem = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const lastItem = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="mt-4 flex flex-col gap-3 border-t pt-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
      <span>
        Showing {firstItem}-{lastItem} of {meta.total}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
        >
          Previous
        </button>
        <span className="min-w-24 text-center">
          Page {meta.page} of {meta.totalPages}
        </span>
        <button
          type="button"
          className="rounded border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPageChange(meta.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
