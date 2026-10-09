import { Suspense, lazy } from 'react';
import { Icon } from '@/components/Icon';

// ThreeUI is heavy (three.js) — load lazily so docs stay fast.
const EmeraldHorizonBackground = lazy(() =>
  import('@designcodeio/threeui/components/EmeraldHorizonBackground').then((m) => ({
    default: m.EmeraldHorizonBackground,
  })),
);

function HeroFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(60% 55% at 50% 0%, rgba(31,174,140,0.22) 0%, transparent 70%), linear-gradient(180deg, #080d18 0%, #0f1729 60%, transparent 100%)',
      }}
    />
  );
}

interface CorporateHeroProps {
  onOpenSearch: () => void;
  onNavigate: (path: string) => void;
}

export function CorporateHero({ onOpenSearch, onNavigate }: CorporateHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* ThreeUI 3D horizon — corporate emerald depth */}
      <div className="absolute inset-0" aria-hidden>
        <Suspense fallback={<HeroFallback />}>
          <EmeraldHorizonBackground className="h-full w-full" speed={0.7} glow={1.1} vignette={1.1} />
        </Suspense>
        {/* Corporate legibility overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/55 to-white dark:to-ink-950" />
        <div className="absolute inset-0 bg-corporate-grid opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black_30%,transparent_80%)]" />
      </div>

      <div className="relative container-page pt-16 pb-16 sm:pt-24 sm:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Official badge row — BoardUI-style pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
              <Icon name="BookOpen" className="h-3.5 w-3.5 text-gold-300" />
              Official documentation
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/30 bg-brand-500/15 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
              v2.4 — now live
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-balance animate-fade-in-up">
            The trusted home for
            <br />
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-gold-300 bg-clip-text text-transparent">
              Pigeon Social.
            </span>
          </h1>

          <p
            className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '80ms' }}
          >
            Official guides, feature walkthroughs, safety policies and answers for communities, creators and
            friends — designed for privacy, built for real connection.
          </p>

          {/* Search — corporate command bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onOpenSearch();
            }}
            className="mt-8 mx-auto max-w-xl animate-fade-in-up"
            style={{ animationDelay: '160ms' }}
          >
            <div className="relative group">
              <Icon
                name="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-brand-300 transition-colors"
              />
              <input
                onFocus={onOpenSearch}
                readOnly
                placeholder="Search guides, policies, changelog…"
                className="w-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl pl-12 pr-20 py-4 text-sm text-white placeholder:text-white/40 shadow-corporate-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-300/50 transition-all cursor-pointer"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 text-[11px] font-mono px-2 py-1 rounded-md border border-white/15 text-white/50 bg-white/5">
                ⌘K
              </kbd>
            </div>
          </form>

          {/* Corporate CTAs */}
          <div
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: '220ms' }}
          >
            <button
              onClick={() => onNavigate('/docs/introduction')}
              className="btn-brand px-6 py-3 text-sm font-semibold w-full sm:w-auto"
            >
              Start with documentation
              <Icon name="ArrowRight" className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('/safety')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              <Icon name="ShieldCheck" className="h-4 w-4 text-brand-300" />
              Trust &amp; safety
            </button>
          </div>

          {/* Value highlights strip */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/45 animate-fade-in-up"
            style={{ animationDelay: '280ms' }}
          >
            {['100% E2E Encrypted', 'Zero Ads & Tracking', 'Open Communities', '99.99% Uptime'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Icon name="Check" className="h-3.5 w-3.5 text-brand-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Social stat band */}
      <div className="relative border-t border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <div className="container-page grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {[
            { k: '42M+', v: 'Active members' },
            { k: '180+', v: 'Countries connected' },
            { k: '100%', v: 'End-to-end encrypted' },
            { k: '24/7', v: 'Community support' },
          ].map((s) => (
            <div key={s.v} className="px-6 py-5 text-center">
              <p className="font-display text-2xl sm:text-3xl font-medium text-white">{s.k}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
