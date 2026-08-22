import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { SectionHeading, Reveal } from '@/components/Reveal';
import { useRouter } from '@/lib/router';
import { docArticles } from '@/content/docs';

const categories = [
  { name: 'Getting Started', icon: 'Compass', desc: 'Set up your account and find your way around.', path: '/docs/getting-started' },
  { name: 'Features', icon: 'Sparkles', desc: 'Explore everything Pigeon can do.', path: '/features' },
  { name: 'Communities', icon: 'Users', desc: 'Create, join, and moderate communities.', path: '/docs/joining-communities' },
  { name: 'Messaging', icon: 'MessageCircle', desc: 'Private, end-to-end encrypted conversations.', path: '/docs/sending-encrypted-messages' },
  { name: 'Creators', icon: 'Palette', desc: 'Build an audience and grow sustainably.', path: '/use-cases/creators' },
  { name: 'Businesses', icon: 'Briefcase', desc: 'Reach customers and build brand presence.', path: '/use-cases/businesses' },
  { name: 'Privacy & Security', icon: 'ShieldCheck', desc: 'How Pigeon protects you and your data.', path: '/safety' },
  { name: 'Premium', icon: 'Crown', desc: 'Advanced tools for creators and power users.', path: '/docs/pigeon-premium' },
  { name: 'Moderation', icon: 'Scale', desc: 'Keep communities healthy and safe.', path: '/docs/creating-a-community' },
  { name: 'Account & Settings', icon: 'Settings', desc: 'Manage your profile, preferences, and security.', path: '/docs/creating-your-account' },
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
  const [query, setQuery] = useState('');

  const popular = popularSlugs
    .map((slug) => docArticles.find((a) => a.slug === slug))
    .filter(Boolean) as typeof docArticles;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch();
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div
          className="absolute inset-0 -z-10 opacity-[0.5] dark:opacity-[0.25]"
          style={{
            backgroundImage:
              'radial-gradient(60% 50% at 50% 0%, rgba(31,174,140,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(70% 60% at 50% 0%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(70% 60% at 50% 0%, black 30%, transparent 80%)',
          }}
        />

        <div className="container-page pt-20 pb-20 sm:pt-28 sm:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-muted shadow-soft animate-fade-in-up">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-500" />
              Pigeon Social Documentation · v4.2
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white text-balance animate-fade-in-up">
              Everything you need to know about{' '}
              <span className="text-brand-600 dark:text-brand-400">Pigeon.</span>
            </h1>

            <p
              className="mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '80ms' }}
            >
              Explore Pigeon, discover what you can do with it, and learn how communities, creators, businesses, and
              everyday users can connect, communicate, and grow.
            </p>

            <form
              onSubmit={submitSearch}
              className="mt-8 mx-auto max-w-xl animate-fade-in-up"
              style={{ animationDelay: '160ms' }}
            >
              <div className="relative group">
                <Icon
                  name="Search"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={onOpenSearch}
                  placeholder="Search Pigeon documentation…"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 pl-12 pr-20 py-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 text-2xs font-mono px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-400 bg-slate-50 dark:bg-slate-800/60">
                  ⌘K
                </kbd>
              </div>
            </form>

            <div
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-subtle animate-fade-in-up"
              style={{ animationDelay: '240ms' }}
            >
              <span>Popular:</span>
              {['What is Pigeon?', 'Encrypted messaging', 'Communities', 'Premium'].map((t) => (
                <button
                  key={t}
                  onClick={onOpenSearch}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Browse"
          title="Documentation categories"
          description="Start with any area of Pigeon. Each category pulls together the guides, references, and examples you need."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 40}>
              <button
                onClick={() => navigate(cat.path)}
                className="card-hover group w-full h-full text-left p-5 flex flex-col"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 dark:group-hover:text-white transition-colors">
                  <Icon name={cat.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{cat.name}</h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed flex-1">{cat.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Popular docs */}
      <section className="container-page py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeading
            eyebrow="Most read"
            title="Popular documentation"
            description="The guides Pigeon users come back to most often."
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
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 dark:group-hover:bg-brand-500/10 dark:group-hover:text-brand-400 transition-colors">
                  <Icon name="FileText" className="h-4 w-4" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-medium text-brand-600 dark:text-brand-400">
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
                  className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 transition-colors"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="container-page py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-900/20 p-8 sm:p-12">
            <div
              className="absolute inset-0 -z-10 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(40% 60% at 80% 20%, rgba(31,174,140,0.15) 0%, transparent 70%)',
              }}
            />
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                  <Logo className="h-6 w-6" />
                  <span className="text-sm font-semibold">Ready to try Pigeon?</span>
                </div>
                <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white text-balance">
                  Start meaningful conversations today.
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Join communities, message privately, and discover content that actually matters to you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="/pigeon.release.apk"
                  download="Pigeon.apk"
                  className="btn-primary px-5 py-2.5 inline-flex items-center justify-center gap-1.5"
                >
                  Get Started
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </a>
                <a
                  href="/pigeon.release.apk"
                  download="Pigeon.apk"
                  className="btn-secondary px-5 py-2.5 inline-flex items-center justify-center"
                >
                  Open Pigeon
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
