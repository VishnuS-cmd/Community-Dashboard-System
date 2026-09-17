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
  const lastItem  = Math.min(meta.page * meta.limit, meta.total);
  const total     = meta.totalPages;

  // Build compact page number array
  const pages: (number | '…')[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (meta.page > 3)       pages.push('…');
    for (let i = Math.max(2, meta.page - 1); i <= Math.min(total - 1, meta.page + 1); i++) pages.push(i);
    if (meta.page < total - 2) pages.push('…');
    pages.push(total);
  }

  if (meta.total === 0) return null;

  return (
    <div
      className="flex flex-col gap-3 mt-4 pt-3 md:flex-row md:items-center md:justify-between"
      style={{ borderTop: '1px solid #f3f4f6' }}
    >
      {/* Count */}
      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>
        Showing <strong style={{ color: '#374151' }}>{firstItem}–{lastItem}</strong> of{' '}
        <strong style={{ color: '#374151' }}>{meta.total}</strong> records
      </span>

      {/* Controls */}
      {total > 1 && (
        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            type="button"
            disabled={meta.page <= 1}
            onClick={() => onPageChange(meta.page - 1)}
            aria-label="Previous page"
            style={{
              width: '30px', height: '30px', borderRadius: '7px',
              border: '1px solid #e5e7eb', background: 'transparent',
              cursor: meta.page <= 1 ? 'not-allowed' : 'pointer',
              opacity: meta.page <= 1 ? 0.4 : 1,
              fontSize: '14px', color: '#374151',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .12s',
            }}
            onMouseEnter={e => { if (meta.page > 1) (e.currentTarget as HTMLElement).style.background = '#f9fafb'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            ‹
          </button>

          {/* Page numbers */}
          {pages.map((p, i) =>
            p === '…' ? (
              <span
                key={`e-${i}`}
                style={{ width: '30px', textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p as number)}
                aria-label={`Page ${p}`}
                style={{
                  width: '30px', height: '30px', borderRadius: '7px',
                  border: p === meta.page ? 'none' : '1px solid #e5e7eb',
                  background: p === meta.page ? 'var(--theme-primary)' : 'transparent',
                  color: p === meta.page ? '#fff' : '#374151',
                  fontSize: '12px', fontWeight: p === meta.page ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'background .12s',
                }}
                onMouseEnter={e => { if (p !== meta.page) (e.currentTarget as HTMLElement).style.background = '#f9fafb'; }}
                onMouseLeave={e => { if (p !== meta.page) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            type="button"
            disabled={meta.page >= total}
            onClick={() => onPageChange(meta.page + 1)}
            aria-label="Next page"
            style={{
              width: '30px', height: '30px', borderRadius: '7px',
              border: '1px solid #e5e7eb', background: 'transparent',
              cursor: meta.page >= total ? 'not-allowed' : 'pointer',
              opacity: meta.page >= total ? 0.4 : 1,
              fontSize: '14px', color: '#374151',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .12s',
            }}
            onMouseEnter={e => { if (meta.page < total) (e.currentTarget as HTMLElement).style.background = '#f9fafb'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
