import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClasses = 'border-emerald-500/40 text-emerald-400 bg-[#121E18]/95';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClasses = 'border-rose-500/40 text-rose-400 bg-[#221215]/95';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClasses = 'border-amber-500/40 text-amber-400 bg-[#221B12]/95';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClasses = 'border-[#4f46e5]/40 text-[#818cf8] bg-[#121422]/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200 ${colorClasses}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white">{toast.title}</p>
              {toast.message && (
                <p className="text-[11px] text-[#A0A0A8] mt-0.5">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#88888C] hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
