import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { SectionHeading, Reveal } from '@/components/Reveal';
import { CorporateHero } from '@/components/corporate/CorporateHero';
import { TrustBar } from '@/components/corporate/TrustBar';
import { useRouter } from '@/lib/router';
import { docArticles } from '@/content/docs';

const categories = [
  { name: 'Getting Started', icon: 'Compass', desc: 'Set up your account and find your way around.', path: '/docs/getting-started', meta: '12 guides' },
  { name: 'Features', icon: 'Sparkles', desc: 'Explore everything Pigeon can do.', path: '/features', meta: '48 features' },
  { name: 'Communities', icon: 'Users', desc: 'Create, join, and moderate communities.', path: '/docs/joining-communities', meta: 'Community' },
  { name: 'Messaging', icon: 'MessageCircle', desc: 'Private, end-to-end encrypted conversations.', path: '/docs/sending-encrypted-messages', meta: 'E2E' },
  { name: 'Creators', icon: 'Palette', desc: 'Build an audience and grow sustainably.', path: '/use-cases/creators', meta: 'Creator' },
  { name: 'Businesses', icon: 'Briefcase', desc: 'Reach customers and build brand presence.', path: '/use-cases/businesses', meta: 'Brands' },
  { name: 'Privacy & Security', icon: 'ShieldCheck', desc: 'How Pigeon protects you and your data.', path: '/safety', meta: 'Privacy' },
  { name: 'Premium', icon: 'Crown', desc: 'Advanced tools for creators and power users.', path: '/docs/pigeon-premium', meta: 'Pro' },
  { name: 'Moderation', icon: 'Scale', desc: 'Keep communities healthy and safe.', path: '/docs/creating-a-community', meta: 'Policy' },
  { name: 'Account & Settings', icon: 'Settings', desc: 'Manage your profile, preferences, and security.', path: '/docs/creating-your-account', meta: '8 guides' },
];

const popularSlugs = [
  'introduction',
  'creating-your-account',
  'creating-your-first-post',
  'joining-communities',
  'creating-a-community',
  'sending-encrypted-messages',
  'managing-notifications',
  'verification-badges',
  'pigeon-premium',
  'privacy-and-security',
];

interface HomePageProps {
  onOpenSearch: () => void;
}

export function HomePage({ onOpenSearch }: HomePageProps) {
  const { navigate } = useRouter();

  const popular = popularSlugs
    .map((slug) => docArticles.find((a) => a.slug === slug))
    .filter(Boolean) as typeof docArticles;

  return (
    <div className="bg-white dark:bg-ink-950">
      {/* ThreeUI corporate hero */}
      <CorporateHero onOpenSearch={onOpenSearch} onNavigate={navigate} />

      {/* Trust / compliance */}
      <TrustBar />

      {/* Categories — platform directory */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="max-w-2xl">
            <p className="eyebrow">Explore the platform</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900 dark:text-white text-balance">
              Documentation, crafted for everyone.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-white/60 leading-relaxed">
              Start with any part of Pigeon. Find clear guides, tutorials, policies, and pro-tips for members, creators, and moderators.
            </p>
          </div>
          <button
            onClick={() => navigate('/docs/introduction')}
            className="btn-secondary text-sm px-4 py-2"
          >
            All documentation
            <Icon name="ArrowRight" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 40}>
              <button
                onClick={() => navigate(cat.path)}
                className="card-hover group w-full h-full text-left p-5 flex flex-col border-t-2 border-t-transparent hover:border-t-brand-500"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 text-white dark:bg-white dark:text-ink-950 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 transition-colors">
                    <Icon name={cat.icon} className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-slate-200 dark:border-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                    {cat.meta}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed flex-1">{cat.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ink-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Popular docs — BoardUI list style */}
      <section className="border-y border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02]">
        <div className="container-page py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <SectionHeading
              eyebrow="Most read"
              title="Popular with communities & creators"
              description="The essential guides members, moderators, and creators return to most often."
            />
            <button
              onClick={() => navigate('/docs/introduction')}
              className="btn-secondary text-sm px-3.5 py-2"
            >
              All documentation
              <Icon name="ArrowRight" className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {popular.map((article, i) => (
              <Reveal key={article.slug} delay={i * 30}>
                <button
                  onClick={() => navigate(`/docs/${article.slug}`)}
                  className="card-hover group w-full text-left p-5 flex items-start gap-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 group-hover:bg-ink-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-ink-950 transition-colors">
                    <Icon name="FileText" className="h-4 w-4" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {article.category}
                    </span>
                    <span className="block mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                      {article.title}
                    </span>
                    <span className="block mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                      {article.description}
                    </span>
                  </span>
                  <Icon
                    name="ArrowUpRight"
                    className="h-4 w-4 text-slate-300 dark:text-white/20 group-hover:text-brand-500 transition-colors"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA — ink panel with gold accent */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 text-white p-8 sm:p-12 shadow-corporate-lg">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(45% 65% at 85% 15%, rgba(31,174,140,0.25) 0%, transparent 70%), radial-gradient(30% 50% at 10% 90%, rgba(208,165,72,0.18) 0%, transparent 70%)',
              }}
            />
            <div className="absolute inset-0 bg-corporate-grid opacity-20 [mask-image:radial-gradient(60%_80%_at_80%_20%,black,transparent)]" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                    <Logo className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold">Ready to connect?</span>
                  <span className="badge-gold">Official App</span>
                </div>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl font-medium tracking-tight text-balance">
                  Start meaningful conversations today.
                </h3>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">
                  Join communities, share voice posts, message with end-to-end encryption, and discover content that actually matters — free from ads and algorithms.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                <a
                  href="/pigeon.release.apk"
                  download="Pigeon.apk"
                  className="btn-brand px-5 py-2.5 inline-flex items-center justify-center gap-1.5 text-sm"
                >
                  Download App (APK)
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </a>
                <button
                  onClick={() => navigate('/docs/introduction')}
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Explore Guides
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
