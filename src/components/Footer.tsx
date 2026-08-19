import { Logo } from './Logo';
import { Icon } from './Icon';
import { useRouter } from '@/lib/router';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', path: '/features' },
      { label: 'Use Cases', path: '/use-cases' },
      { label: 'Premium', path: '/docs/pigeon-premium' },
      { label: 'Changelog', path: '/changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', path: '/docs/introduction' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Help Center', path: '/docs/getting-started' },
      { label: 'Community', path: '/use-cases/communities' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/docs/introduction' },
      { label: 'Contact', path: '/docs/introduction' },
      { label: 'Privacy', path: '/safety' },
      { label: 'Terms', path: '/docs/introduction' },
    ],
  },
];

const socials = [
  { label: 'Facebook', icon: 'Facebook' },
  { label: 'X', icon: 'Twitter' },
  { label: 'YouTube', icon: 'Youtube' },
];

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0a0e16]">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <Logo className="h-7 w-7" />
              <span className="text-base font-semibold text-slate-900 dark:text-white">Pigeon Social</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted leading-relaxed">
              A modern social platform built around communities, conversations, creators, privacy, and meaningful connections.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="https://pigeon.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-300 dark:hover:border-brand-500/40 transition-colors"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-subtle">© 2026 Pigeon Social. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-subtle">
            <button onClick={() => navigate('/safety')} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Privacy
            </button>
            <button onClick={() => navigate('/docs/introduction')} className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Terms
            </button>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
