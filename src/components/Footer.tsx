import { Logo } from './Logo';
import { Icon } from './Icon';
import { useRouter } from '@/lib/router';

const columns = [
  {
    title: 'Platform',
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
    title: 'Trust',
    links: [
      { label: 'Safety & Privacy', path: '/safety' },
      { label: 'Security overview', path: '/docs/privacy-and-security' },
      { label: 'Terms', path: '/docs/introduction' },
      { label: 'Status', path: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/docs/introduction' },
      { label: 'Contact sales', path: '/docs/introduction' },
      { label: 'Careers', path: '/docs/introduction' },
      { label: 'Press kit', path: '/docs/introduction' },
    ],
  },
];

const socials = [
  { label: 'Facebook', icon: 'Facebook' },
  { label: 'X', icon: 'Twitter' },
  { label: 'YouTube', icon: 'Youtube' },
  { label: 'LinkedIn', icon: 'Linkedin' },
];

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="mt-0 bg-ink-950 text-white">
      {/* Community CTA band */}
      <div className="border-b border-white/10">
        <div className="container-page py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow !text-gold-300">Open &amp; Private</p>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-medium tracking-tight text-balance">
              Experience Pigeon today.
            </h3>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Voice posts, communities, instant encrypted chats, and genuine privacy — built for authentic human connection.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <a
              href="/pigeon.release.apk"
              download="Pigeon.apk"
              className="btn-gold px-5 py-2.5 inline-flex items-center justify-center gap-1.5 text-sm"
            >
              Download App
              <Icon name="ArrowRight" className="h-4 w-4" />
            </a>
            <button onClick={() => navigate('/docs/introduction')} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              Read the docs
            </button>
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                <Logo className="h-7 w-7" />
              </span>
              <span className="leading-none">
                <span className="block text-base font-semibold tracking-tight">Pigeon Social</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  Documentation
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/60 leading-relaxed">
              A modern social platform built around communities, conversations, creators, privacy, and meaningful connections — open, private, and fast.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Private', 'E2E Encrypted', 'No Ads'].map((b) => (
                <span key={b} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  <Icon name="ShieldCheck" className="h-3 w-3 text-brand-300" />
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="https://pigeon.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-colors"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© 2026 Pigeon Social, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <button onClick={() => navigate('/safety')} className="hover:text-white transition-colors">
              Privacy
            </button>
            <button onClick={() => navigate('/docs/introduction')} className="hover:text-white transition-colors">
              Terms
            </button>
            <span className="flex items-center gap-1.5 text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
