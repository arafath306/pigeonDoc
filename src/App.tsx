import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/lib/theme';
import { LanguageProvider } from '@/lib/language';
import { useRouter } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchPalette } from '@/components/SearchPalette';
import { HomePage } from '@/pages/HomePage';
import { DocsPage } from '@/pages/DocsPage';
import { FeaturesIndexPage, FeaturePage } from '@/pages/FeaturePage';
import { UseCasesIndexPage, UseCasePage } from '@/pages/UseCasePage';
import { SafetyPage } from '@/pages/SafetyPage';
import { ChangelogPage } from '@/pages/ChangelogPage';
import { FaqPage } from '@/pages/FaqPage';

function Routes() {
  const { path, segments, navigate } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Ctrl/Cmd + K to open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Update document title per route
  useEffect(() => {
    const title = routeTitle(path);
    document.title = title;
  }, [path]);

  let content: React.ReactNode;
  if (path === '/' || path === '') {
    content = <HomePage onOpenSearch={() => setSearchOpen(true)} />;
  } else if (segments[0] === 'docs') {
    const slug = segments[1] ?? 'introduction';
    content = <DocsPage slug={slug} />;
  } else if (segments[0] === 'features' && segments[1]) {
    content = <FeaturePage slug={segments[1]} />;
  } else if (segments[0] === 'features') {
    content = <FeaturesIndexPage />;
  } else if (segments[0] === 'use-cases' && segments[1]) {
    content = <UseCasePage slug={segments[1]} />;
  } else if (segments[0] === 'use-cases') {
    content = <UseCasesIndexPage />;
  } else if (segments[0] === 'safety') {
    content = <SafetyPage />;
  } else if (segments[0] === 'changelog') {
    content = <ChangelogPage />;
  } else if (segments[0] === 'faq') {
    content = <FaqPage />;
  } else {
    content = (
      <div className="container-page py-32 text-center">
        <p className="text-6xl font-semibold text-brand-500">404</p>
        <p className="mt-4 text-muted">This page could not be found.</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-6">
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080b11]">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1 animate-fade-in" key={path}>
        {content}
      </main>
      <Footer />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function routeTitle(path: string): string {
  const seg = path.split('/').filter(Boolean);
  if (seg.length === 0) return 'Pigeon Social — Documentation';
  if (seg[0] === 'docs') return 'Documentation · Pigeon Social';
  if (seg[0] === 'features') return 'Features · Pigeon Social';
  if (seg[0] === 'use-cases') return 'Use Cases · Pigeon Social';
  if (seg[0] === 'safety') return 'Safety & Privacy · Pigeon Social';
  if (seg[0] === 'changelog') return 'Changelog · Pigeon Social';
  if (seg[0] === 'faq') return 'FAQ · Pigeon Social';
  return 'Pigeon Social';
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes />
      </LanguageProvider>
    </ThemeProvider>
  );
}
