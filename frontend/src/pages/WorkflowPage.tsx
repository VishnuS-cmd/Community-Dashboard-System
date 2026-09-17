import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { apiRequest } from '../lib/api';
import { IconZap, IconCheck, IconClose, IconCheckCircle } from '../components/Icons';

interface WorkflowPageProps { workflow: any; }

type StepState = 'idle' | 'busy' | 'done' | 'error';

export function WorkflowPage({ workflow }: WorkflowPageProps) {
  const [stepStates, setStepStates] = useState<Record<string, StepState>>({});
  const [messages,   setMessages]   = useState<Record<string, string>>({});
  const [lastDone,   setLastDone]   = useState<string | null>(null);

  const steps: string[] = workflow.steps || [];

  async function handleStepClick(step: string) {
    setStepStates(s => ({ ...s, [step]: 'busy' }));
    setMessages(m => ({ ...m, [step]: '' }));
    try {
      await apiRequest(`/domain/${workflow.name}`, {
        method: 'POST',
        body: JSON.stringify({ workflow: workflow.name, step, status: 'Completed' })
      });
      setStepStates(s => ({ ...s, [step]: 'done' }));
      setMessages(m => ({ ...m, [step]: `${step} completed successfully.` }));
      setLastDone(step);
    } catch (error) {
      setStepStates(s => ({ ...s, [step]: 'error' }));
      setMessages(m => ({ ...m, [step]: error instanceof Error ? error.message : 'Something went wrong.' }));
    }
  }

  const doneCount = Object.values(stepStates).filter(s => s === 'done').length;

  return (
    <div>
      {/* ── Page header ── */}
      <div className="page-header">
        <div className="flex items-start gap-3">
          <BackButton className="mt-1" />
          <div
            className="icon-box icon-box-green flex-shrink-0 mt-0.5"
            style={{ width: '42px', height: '42px', fontSize: '20px', color: '#15803d' }}
          >
            <IconZap size={20} />
          </div>
          <div>
            <h1 className="page-title">{workflow.label}</h1>
            <p className="page-subtitle">{workflow.description}</p>
          </div>
        </div>
        {/* Progress indicator */}
        {doneCount > 0 && (
          <div
            className="hidden sm:flex items-center gap-2 rounded-full font-semibold flex-shrink-0"
            style={{ fontSize: '11px', padding: '4px 12px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
          >
            <IconCheck size={12} /> {doneCount}/{steps.length} completed
          </div>
        )}
      </div>

      {/* ── Progress bar ── */}
      {steps.length > 0 && (
        <div className="mb-5 rounded-full overflow-hidden" style={{ height: '4px', background: '#f3f4f6' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(doneCount / steps.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--theme-primary), color-mix(in srgb, var(--theme-primary) 70%, #22c55e))'
            }}
          />
        </div>
      )}

      {/* ── Steps grid ── */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {steps.map((step: string, idx: number) => {
          const state = stepStates[step] ?? 'idle';
          const msg   = messages[step] ?? '';
          const isDone  = state === 'done';
          const isBusy  = state === 'busy';
          const isError = state === 'error';

          return (
            <button
              key={step}
              type="button"
              disabled={isBusy}
              onClick={() => handleStepClick(step)}
              className="text-left rounded-xl p-4 transition-all duration-200 group"
              style={{
                background: isDone ? '#f0fdf4' : isError ? '#fff1f2' : '#fff',
                border: `1.5px solid ${isDone ? '#bbf7d0' : isError ? '#fecdd3' : '#e5e7eb'}`,
                boxShadow: isDone ? '0 2px 8px rgba(21,128,61,.1)' : '0 1px 3px rgba(0,0,0,.05)',
                cursor: isBusy ? 'wait' : 'pointer',
                transform: 'translateY(0)',
              }}
              onMouseEnter={e => { if (!isBusy) (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              {/* Step badge */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="flex items-center justify-center rounded-full font-bold text-white"
                  style={{
                    width: '32px', height: '32px', fontSize: '13px',
                    background: isDone ? '#15803d' : isError ? '#dc2626' : isBusy ? '#6b7280' : '#d1d5db',
                    transition: 'background .2s',
                  }}
                >
                  {isBusy ? (
                    <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : isDone ? (
                    <IconCheck size={14} strokeWidth={2.5} />
                  ) : isError ? (
                    <IconClose size={14} strokeWidth={2.5} />
                  ) : idx + 1}
                </div>
                <span
                  className="font-bold uppercase rounded-full"
                  style={{
                    fontSize: '9px', padding: '2px 8px', letterSpacing: '0.07em',
                    background: isDone ? '#dcfce7' : isError ? '#fee2e2' : '#f3f4f6',
                    color:      isDone ? '#15803d' : isError ? '#b91c1c' : '#9ca3af',
                  }}
                >
                  {isDone ? 'Done' : isError ? 'Failed' : isBusy ? 'Running' : `Step ${idx + 1}`}
                </span>
              </div>

              <p className="font-semibold leading-snug" style={{ fontSize: '13px', color: isDone ? '#166534' : isError ? '#9f1239' : '#111827' }}>
                {step}
              </p>

              {msg && (
                <p className="mt-2" style={{ fontSize: '11px', color: isDone ? '#15803d' : '#b91c1c' }}>
                  {msg}
                </p>
              )}

              {!isDone && !isError && !isBusy && (
                <p className="mt-2 group-hover:text-green-700 transition-colors" style={{ fontSize: '11px', color: '#9ca3af' }}>
                  Click to execute →
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Result summary ── */}
      {lastDone && (
        <div className="mt-5 ui-alert ui-alert-success">
          <span className="ui-alert-icon"><IconCheckCircle size={16} /></span>
          <div>
            <p className="font-semibold" style={{ fontSize: '13px' }}>Step executed successfully</p>
            <p style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
              "{lastDone}" has been logged to the audit trail.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}