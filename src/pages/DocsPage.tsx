import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { ArticleRenderer } from '@/components/ArticleRenderer';
import { ReadingProgress } from '@/components/ReadingProgress';
import { MobileToc } from '@/components/MobileToc';
import { RecentlyVisited } from '@/components/RecentlyVisited';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { docArticles } from '@/content/docs';
import { useRouter } from '@/lib/router';
import { useRecentVisits } from '@/lib/useRecentVisits';
import { TocItem } from '@/content/types';

const sidebarGroups = [
  {
    label: 'Get Started',
    items: [
      { slug: 'introduction', label: 'Introduction' },
      { slug: 'getting-started', label: 'Getting Started' },
      { slug: 'keyboard-shortcuts', label: 'Keyboard Shortcuts' },
    ],
  },
  {
    label: 'Account',
    items: [
      { slug: 'creating-your-account', label: 'Account' },
      { slug: 'account-settings', label: 'Account Settings' },
      { slug: 'managing-notifications', label: 'Notifications' },
    ],
  },
  {
    label: 'Content',
    items: [
      { slug: 'creating-your-first-post', label: 'Posts' },
      { slug: 'live-polls', label: 'Live Polls' },
      { slug: 'music-attachments', label: 'Music Attachments' },
      { slug: 'search-and-discovery', label: 'Search & Discovery' },
      { slug: 'for-you-feed', label: 'For You Feed' },
    ],
  },
  {
    label: 'Communities',
    items: [
      { slug: 'creating-a-community', label: 'Creating a Community' },
      { slug: 'joining-communities', label: 'Joining Communities' },
      { slug: 'community-moderation', label: 'Community Moderation' },
      { slug: 'sending-encrypted-messages', label: 'Messaging' },
    ],
  },
  {
    label: 'Growth',
    items: [
      { slug: 'creator-features', label: 'Creator Tools' },
      { slug: 'verification-badges', label: 'Verification' },
      { slug: 'pigeon-premium', label: 'Premium' },
    ],
  },
  {
    label: 'Trust & Safety',
    items: [{ slug: 'privacy-and-security', label: 'Privacy & Security' }],
  },
  {
    label: 'Help',
    items: [{ slug: 'troubleshooting', label: 'Troubleshooting' }],
  },
];

const allSidebarSlugs = sidebarGroups.flatMap((g) => g.items.map((i) => i.slug));

function buildToc(article: (typeof docArticles)[number]): TocItem[] {
  return article.sections
    .filter((s) => s.type === 'heading' && (s.level ?? 2) <= 3)
    .map((s) => ({ id: s.id!, title: s.title!, level: s.level ?? 2 }));
}

export function DocsPage({ slug }: { slug: string }) {
  const { navigate, path } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeToc, setActiveToc] = useState<string>('');
  const { recordVisit } = useRecentVisits();

  const article = docArticles.find((a) => a.slug === slug) ?? docArticles[0];
  const toc = buildToc(article);

  const idx = allSidebarSlugs.indexOf(article.slug);
  const prev = idx > 0 ? allSidebarSlugs[idx - 1] : null;
  const next = idx >= 0 && idx < allSidebarSlugs.length - 1 ? allSidebarSlugs[idx + 1] : null;
  const prevArticle = prev ? docArticles.find((a) => a.slug === prev) : null;
  const nextArticle = next ? docArticles.find((a) => a.slug === next) : null;
  const related = (article.related ?? [])
    .map((s) => docArticles.find((a) => a.slug === s))
    .filter(Boolean) as typeof docArticles;

  useEffect(() => {
    setSidebarOpen(false);
  }, [path]);

  useEffect(() => {
    recordVisit(path, article.title);
  }, [path, article.title, recordVisit]);

  useEffect(() => {
    const headings = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (headings.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveToc(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [toc]);

  const SidebarContent = (
    <nav className="space-y-6">
      {sidebarGroups.map((group) => (
        <div key={group.label}>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {group.label}
          </p>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const target = `/docs/${item.slug}`;
              const active = path === target;
              return (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate(target)}
                    className={`relative w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      active
                        ? 'font-medium text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-brand-500" />
                    )}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="container-doc">
      <ReadingProgress />
      <div className="flex gap-8 lg:gap-12 py-8 lg:py-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pr-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 text-sm transition-colors"
            >
              <Logo className="h-4 w-4 text-brand-500" />
              Pigeon Docs
            </button>
            {SidebarContent}
            <RecentlyVisited />
          </div>
        </aside>

        {/* Mobile sidebar trigger */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72 max-w-[80vw] bg-white dark:bg-[#0d111a] border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-4 animate-slide-in-right" style={{ animationName: 'slide-in-right', animationDuration: '0.25s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                  <Logo className="h-5 w-5" />
                  <span className="font-semibold text-slate-900 dark:text-white">Documentation</span>
                </span>
                <button onClick={() => setSidebarOpen(false)} className="btn-ghost p-1.5 rounded-md">
                  <Icon name="X" className="h-4 w-4" />
                </button>
              </div>
              {SidebarContent}
            </div>
          </div>
        )}

        {/* Article */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Mobile sidebar button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5"
          >
            <Icon name="PanelLeft" className="h-4 w-4" />
            Contents
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
            <button onClick={() => navigate('/')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Docs
            </button>
            <Icon name="ChevronRight" className="h-3 w-3 text-slate-300 dark:text-slate-600" />
            <span className="text-slate-500 dark:text-slate-400">{article.category}</span>
            <Icon name="ChevronRight" className="h-3 w-3 text-slate-300 dark:text-slate-600" />
            <span className="text-slate-700 dark:text-slate-200 truncate">{article.title}</span>
          </nav>

          {/* Mobile TOC */}
          <MobileToc items={toc} activeId={activeToc} />

          {/* Title block */}
          <header className="mt-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white text-balance">
              {article.title}
            </h1>
            <p className="mt-3 text-base text-muted leading-relaxed">{article.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="Calendar" className="h-3.5 w-3.5" />
                Updated {article.lastUpdated}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="inline-flex items-center gap-1.5">
                <Icon name="BookOpen" className="h-3.5 w-3.5" />
                {article.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors print:hidden"
              >
                <Icon name="Printer" className="h-3.5 w-3.5" />
                Print
              </button>
            </div>
          </header>

          {/* Body */}
          <ArticleRenderer sections={article.sections} />

          {/* Feedback */}
          <FeedbackWidget pageSlug={article.slug} pageType="docs" />

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Related articles
              </p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <button
                      onClick={() => navigate(`/docs/${r.slug}`)}
                      className="card-hover group w-full text-left p-4 flex items-start gap-3"
                    >
                      <Icon name="FileText" className="h-4 w-4 mt-0.5 text-slate-400 group-hover:text-brand-500 transition-colors" />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{r.title}</span>
                        <span className="block mt-0.5 text-xs text-muted line-clamp-2">{r.description}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prev/Next */}
          {(prevArticle || nextArticle) && (
            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {prevArticle ? (
                <button
                  onClick={() => navigate(`/docs/${prevArticle.slug}`)}
                  className="card-hover group text-left p-4 flex flex-col"
                >
                  <span className="flex items-center gap-1 text-xs text-subtle">
                    <Icon name="ArrowLeft" className="h-3.5 w-3.5" />
                    Previous
                  </span>
                  <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {prevArticle.title}
                  </span>
                </button>
              ) : (
                <span />
              )}
              {nextArticle ? (
                <button
                  onClick={() => navigate(`/docs/${nextArticle.slug}`)}
                  className="card-hover group text-right p-4 flex flex-col sm:items-end"
                >
                  <span className="flex items-center gap-1 text-xs text-subtle">
                    Next
                    <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {nextArticle.title}
                  </span>
                </button>
              ) : (
                <span />
              )}
            </div>
          )}
        </main>

        {/* TOC */}
        {toc.length > 1 && (
          <aside className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                On this page
              </p>
              <ul className="space-y-1.5 border-l border-slate-200 dark:border-slate-800">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setActiveToc(item.id);
                      }}
                      className={`block text-sm transition-colors -ml-px border-l-2 ${
                        item.level === 3 ? 'pl-6' : 'pl-3'
                      } ${
                        activeToc === item.id
                          ? 'text-brand-700 dark:text-brand-400 border-brand-500 font-medium'
                          : 'text-muted border-transparent hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Icon name="ArrowUp" className="h-3.5 w-3.5" />
                  Back to top
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
