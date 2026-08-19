import { useState } from 'react';
import { Icon } from './Icon';
import type { TocItem } from '@/content/types';

interface MobileTocProps {
  items: TocItem[];
  activeId: string;
}

export function MobileToc({ items, activeId }: MobileTocProps) {
  const [open, setOpen] = useState(false);

  if (items.length <= 1) return null;

  return (
    <div className="xl:hidden mb-6 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Icon name="List" className="h-4 w-4 text-brand-500" />
          On this page
        </span>
        <Icon
          name="ChevronDown"
          className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <ul className="border-t border-slate-200 dark:border-slate-800 p-2 space-y-0.5 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setOpen(false);
                }}
                className={`block text-sm rounded-md px-3 py-2 transition-colors ${
                  item.level === 3 ? 'pl-6' : 'pl-3'
                } ${
                  activeId === item.id
                    ? 'text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
