import { Icon } from '@/components/Icon';

const communities = [
  { name: 'Indie Creators', icon: 'Sparkles' },
  { name: 'Campus Clubs', icon: 'GraduationCap' },
  { name: 'Audio Hangouts', icon: 'Mic' },
  { name: 'Gamer Lounges', icon: 'Gamepad2' },
  { name: 'Design Circles', icon: 'Palette' },
  { name: 'Dev Guilds', icon: 'Code' },
];

const assurances = [
  { icon: 'Lock', title: 'E2E Encryption', desc: 'Private conversations' },
  { icon: 'ShieldCheck', title: 'Community Safety', desc: 'Healthy moderation' },
  { icon: 'EyeOff', title: 'Zero Tracking', desc: 'No ads or selling data' },
  { icon: 'Zap', title: 'Real-time Sync', desc: 'Instant & ultra-light' },
];

export function TrustBar() {
  return (
    <section className="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-ink-950">
      <div className="container-page py-10">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-white/40">
          Connecting vibrant communities, creators &amp; friend circles worldwide
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {communities.map((c) => (
            <span
              key={c.name}
              className="inline-flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors"
            >
              <Icon name={c.icon} className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-tight">{c.name}</span>
            </span>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {assurances.map((a) => (
            <div
              key={a.title}
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.03] px-4 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-white dark:bg-white dark:text-ink-950">
                <Icon name={a.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900 dark:text-white leading-none">
                  {a.title}
                </span>
                <span className="block mt-1 text-xs text-slate-500 dark:text-white/50">{a.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
