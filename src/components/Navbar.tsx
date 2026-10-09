import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { AnnouncementBar } from './corporate/AnnouncementBar';
import { useTheme } from '@/lib/theme';
import { useLanguage } from '@/lib/language';
import { useRouter } from '@/lib/router';

const navItems = [
  { labelKey: 'nav.documentation', path: '/docs/introduction' },
  { labelKey: 'nav.useCases', path: '/use-cases' },
  { labelKey: 'nav.features', path: '/features' },
  { labelKey: 'nav.safety', path: '/safety' },
  { labelKey: 'nav.changelog', path: '/changelog' },
  { labelKey: 'nav.faq', path: '/faq' },
];

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const { t } = useLanguage();
  const { path, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (p: string) => path === p || path.startsWith(p + '/');

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-ink-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-corporate'
            : 'bg-white/70 dark:bg-ink-950/70 backdrop-blur-md border-b border-transparent'
        }`}
      >
        {/* Corporate hairline — gold trust accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-brand-500 via-gold-400 to-brand-500" />
        <nav className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-slate-900 dark:text-white hover:opacity-90 transition-opacity"
              aria-label="Pigeon home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-950 dark:bg-white shadow-corporate">
                <Logo className="h-7 w-7" />
              </span>
              <span className="leading-none">
                <span className="block text-[15px] font-semibold tracking-tight">Pigeon</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
                  Docs
                </span>
              </span>
            </button>
            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'text-ink-950 dark:text-white bg-slate-100 dark:bg-white/10'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 w-56 md:w-64 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-colors shadow-soft"
              aria-label="Search documentation"
            >
              <Icon name="Search" className="h-4 w-4" />
              <span className="flex-1 text-left">Search docs…</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 text-2xs font-mono px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/15 text-slate-400 dark:text-white/40">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={onOpenSearch}
              className="sm:hidden btn-ghost p-2 rounded-lg"
              aria-label="Search documentation"
            >
              <Icon name="Search" className="h-5 w-5" />
            </button>

            <button
              onClick={toggle}
              className="btn-ghost p-2 rounded-lg"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-5 w-5" />
            </button>

            <a
              href="/pigeon.release.apk"
              download="Pigeon.apk"
              className="hidden md:inline-flex btn-secondary text-sm px-3 py-1.5 items-center justify-center"
            >
              Open Pigeon
            </a>
            <a
              href="/pigeon.release.apk"
              download="Pigeon.apk"
              className="btn-primary text-sm px-3.5 py-1.5 items-center justify-center"
            >
              Get Started
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden btn-ghost p-2 rounded-lg"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[80vw] bg-white dark:bg-ink-900 border-l border-slate-200 dark:border-white/10 shadow-corporate-lg animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 dark:border-white/10">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-950 dark:bg-white">
                  <Logo className="h-6 w-6" />
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">Pigeon</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="btn-ghost p-2 rounded-lg" aria-label="Close menu">
                <Icon name="X" className="h-5 w-5" />
              </button>
            </div>
            <ul className="p-3 space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-ink-950 text-white dark:bg-white dark:text-ink-950'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-3 border-t border-slate-200 dark:border-white/10 space-y-2">
              <a
                href="/pigeon.release.apk"
                download="Pigeon.apk"
                className="btn-secondary w-full text-sm py-2 items-center justify-center"
              >
                Open Pigeon
              </a>
              <a
                href="/pigeon.release.apk"
                download="Pigeon.apk"
                className="btn-primary w-full text-sm py-2 items-center justify-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
