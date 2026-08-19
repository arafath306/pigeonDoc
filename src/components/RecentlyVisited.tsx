import { Icon } from './Icon';
import { useRouter } from '@/lib/router';
import { useRecentVisits } from '@/lib/useRecentVisits';

export function RecentlyVisited() {
  const { visits, clearVisits } = useRecentVisits();
  const { navigate } = useRouter();

  if (visits.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Recently visited
        </p>
        <button
          onClick={clearVisits}
          className="text-2xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          Clear
        </button>
      </div>
      <ul className="space-y-1">
        {visits.slice(0, 5).map((v) => (
          <li key={v.path}>
            <button
              onClick={() => navigate(v.path)}
              className="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              <Icon name="Clock" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{v.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
