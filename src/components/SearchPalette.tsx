import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './Icon';
import { searchIndex } from '@/content/searchIndex';
import { useRouter } from '@/lib/router';
import { fuzzyFilter, didYouMean } from '@/lib/fuzzy';
import type { SearchEntry } from '@/content/types';

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
}

const kindIcon: Record<string, string> = {
  Documentation: 'FileText',
  Feature: 'Sparkles',
  'Use Case': 'Users',
  FAQ: 'HelpCircle',
  Changelog: 'GitBranch',
};

const RECENT_KEY = 'pigeon-recent-searches';
const MAX_RECENT = 5;

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecent(term: string) {
  const trimmed = term.trim();
  if (!trimmed) return;
  const existing = loadRecent().filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
  const updated = [trimmed, ...existing].slice(0, MAX_RECENT);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {
    /* ignore */
  }
}

function clearRecent() {
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    /* ignore */
  }
}

export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const rankedResults = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return fuzzyFilter(q, searchIndex, (e) => `${e.title} ${e.category} ${e.description} ${e.kind}`);
  }, [query]);

  const results = useMemo(() => {
    if (query.trim()) {
      return rankedResults.slice(0, 12).map((r) => r.item);
    }
    return searchIndex.slice(0, 8);
  }, [query, rankedResults]);

  const suggestions = useMemo(() => {
    if (!query.trim() || results.length > 0) return [];
    const allTitles = searchIndex.map((e) => e.title);
    return didYouMean(query, allTitles, 3);
  }, [query, results]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setRecent(loadRecent());
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const sel = results[active];
        if (sel) {
          saveRecent(query || sel.title);
          navigate(sel.path);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, active, onClose, navigate, query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const showRecent = !query.trim() && recent.length > 0;

  const handleNavigate = (entry: SearchEntry) => {
    saveRecent(query || entry.title);
    navigate(entry.path);
    onClose();
  };

  const handleSuggestion = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative mx-auto mt-[12vh] w-full max-w-xl px-4">
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#0d111a] border border-slate-200 dark:border-slate-800 shadow-soft-lg animate-scale-in">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <Icon name="Search" className="h-5 w-5 text-slate-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Pigeon documentation…"
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
            />
            <kbd className="text-2xs font-mono px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              ESC
            </kbd>
          </div>

          {/* Recent searches */}
          {showRecent && (
            <div className="px-4 pt-3 pb-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Recent
                </span>
                <button
                  onClick={() => {
                    clearRecent();
                    setRecent([]);
                  }}
                  className="text-2xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pb-2">
                {recent.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    <Icon name="Clock" className="h-3 w-3" />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-10 text-center">
                <Icon name="SearchX" className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
                <p className="mt-3 text-sm text-muted">No results for &ldquo;{query}&rdquo;</p>
                {suggestions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-subtle mb-2">Did you mean?</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSuggestion(s)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 dark:border-brand-500/30 bg-brand-50 dark:bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors"
                        >
                          <Icon name="CornerDownRight" className="h-3 w-3" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ul className="space-y-0.5">
                {results.map((r, i) => (
                  <li key={`${r.path}-${r.title}-${i}`}>
                    <button
                      data-idx={i}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => handleNavigate(r)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        active === i
                          ? 'bg-brand-50 dark:bg-brand-500/10'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          active === i
                            ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <Icon name={kindIcon[r.kind] ?? 'FileText'} className="h-4 w-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-slate-900 dark:text-white truncate">
                          {r.title}
                        </span>
                        <span className="block text-xs text-muted truncate">{r.description}</span>
                      </span>
                      <span className="shrink-0 text-2xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {r.kind}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 text-2xs text-subtle">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="font-mono px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">↑</kbd>
                <kbd className="font-mono px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-mono px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">↵</kbd>
                to open
              </span>
            </div>
            <span>Powered by Pigeon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
