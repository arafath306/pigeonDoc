import { Icon } from '@/components/Icon';

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-ink-950 text-white dark:bg-black">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-4 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="hidden sm:inline">All systems operational</span>
            <span className="sm:hidden">Operational</span>
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline text-white/60">
            Pigeon Social — Voice Posts, Communities &amp; End-to-End Encrypted DMs
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden lg:inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-300">
            <Icon name="Crown" className="h-3 w-3" />
            v2.4
          </span>
          <a
            href="/docs/introduction"
            className="hidden sm:inline text-white/60 hover:text-white transition-colors"
          >
            Quick start
          </a>
          <a href="/changelog" className="text-white/60 hover:text-white transition-colors">
            What&apos;s new
          </a>
        </div>
      </div>
    </div>
  );
}
