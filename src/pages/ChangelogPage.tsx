import { Icon } from '@/components/Icon';
import { changelog } from '@/content/changelog';

const labelStyles: Record<string, string> = {
  New: 'bg-ink-950 text-white dark:bg-white dark:text-ink-950',
  Improved: 'bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300 border border-accent-200 dark:border-accent-500/20',
  Fixed: 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-white/60 border border-slate-200 dark:border-white/10',
  Security: 'bg-gold-100 text-gold-700 dark:bg-gold-500/15 dark:text-gold-300 border border-gold-200 dark:border-gold-500/25',
  Removed: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 border border-rose-200 dark:border-rose-500/25',
};

const labelIcons: Record<string, string> = {
  New: 'Plus',
  Improved: 'ArrowUp',
  Fixed: 'Wrench',
  Security: 'ShieldCheck',
  Removed: 'Trash2',
};

export function ChangelogPage() {
  return (
    <div className="bg-white dark:bg-ink-950">
      <div className="relative overflow-hidden bg-ink-950 text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(50% 60% at 50% 0%, rgba(208,165,72,0.16) 0%, transparent 70%), radial-gradient(40% 50% at 80% 20%, rgba(31,174,140,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-corporate-grid opacity-30 [mask-image:radial-gradient(70%_80%_at_50%_0%,black,transparent)]" />
        <div className="relative container-page py-14 sm:py-20">
          <p className="eyebrow !text-gold-300">Changelog · Release notes</p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-medium tracking-tight text-balance max-w-2xl">
            What&apos;s new in Pigeon.
          </h1>
          <p className="mt-4 text-base text-white/65 leading-relaxed max-w-2xl">
            Every release, newest first — what shipped, what improved, what got fixed. Subscribe via RSS or community updates.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wide bg-brand-500/20 text-brand-200 border border-brand-400/30">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
              v2.4 — current release
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wide text-white/70">
              <Icon name="Calendar" className="h-3 w-3" />
              Updated weekly
            </span>
          </div>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/60 via-slate-200 dark:via-white/10 to-transparent" />

            <ol className="space-y-8">
              {changelog.map((v) => (
                <li key={v.version} className="relative pl-14">
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-950 text-white dark:bg-white dark:text-ink-950 shadow-corporate">
                    <Icon name="GitBranch" className="h-4 w-4" />
                  </span>

                  <div className="card p-5 sm:p-6">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-xl font-medium text-slate-900 dark:text-white">
                        Version {v.version}
                      </h3>
                      {v.tag && (
                        <span className="badge-gold">
                          {v.tag}
                        </span>
                      )}
                      <span className="ml-auto text-xs text-slate-400 dark:text-white/40 inline-flex items-center gap-1">
                        <Icon name="Calendar" className="h-3 w-3" />
                        {v.date}
                      </span>
                    </div>

                    <div className="mt-5 space-y-5">
                      {v.sections.map((s, j) => (
                        <div key={j} className={j > 0 ? 'pt-5 border-t border-slate-100 dark:border-white/5' : ''}>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${labelStyles[s.label]}`}>
                            <Icon name={labelIcons[s.label]} className="h-3 w-3" />
                            {s.label}
                          </span>
                          <ul className="mt-3 space-y-2">
                            {s.items.map((item, k) => (
                              <li key={k} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-white/70 leading-relaxed">
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
