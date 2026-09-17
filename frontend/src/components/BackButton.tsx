import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/dashboard')}
      className={`inline-flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0 ${className}`}
      style={{
        width: '32px',
        height: '32px',
        border: '1px solid #e5e7eb',
        background: '#fff',
        fontSize: '16px',
        lineHeight: 1,
      }}
      title="Back to Dashboard"
      aria-label="Back to Dashboard"
    >
      ←
    </button>
  );
}
