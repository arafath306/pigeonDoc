import { Icon } from '@/components/Icon';
import { changelog } from '@/content/changelog';
import { SectionHeading } from '@/components/Reveal';

const labelStyles: Record<string, string> = {
  New: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400',
  Improved: 'bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-400',
  Fixed: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  Security: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
};

const labelIcons: Record<string, string> = {
  New: 'Plus',
  Improved: 'ArrowUp',
  Fixed: 'Wrench',
  Security: 'ShieldCheck',
};

export function ChangelogPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <SectionHeading
        eyebrow="Changelog"
        title="What's new in Pigeon"
        description="Every release, organized newest first. See what shipped, what improved, and what got fixed."
      />

      <div className="mt-12 max-w-3xl">
        <div className="relative">
          {/* timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800" />

          <ol className="space-y-10">
            {changelog.map((v, i) => (
              <li key={v.version} className="relative pl-12">
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#0d111a] border-2 border-brand-500 text-brand-600 dark:text-brand-400 shadow-soft">
                  <Icon name="GitBranch" className="h-4 w-4" />
                </span>

                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Version {v.version}</h3>
                  {v.tag && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 text-white text-2xs font-semibold px-2 py-0.5 uppercase tracking-wide">
                      {v.tag}
                    </span>
                  )}
                  <span className="text-xs text-subtle">{v.date}</span>
                </div>

                <div className="mt-4 space-y-4">
                  {v.sections.map((s, j) => (
                    <div key={j}>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wide ${labelStyles[s.label]}`}>
                          <Icon name={labelIcons[s.label]} className="h-3 w-3" />
                          {s.label}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {s.items.map((item, k) => (
                          <li key={k} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="mt-2 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
