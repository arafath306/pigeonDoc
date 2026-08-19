import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const translations: Record<string, { en: string; bn: string }> = {
  // Nav
  'nav.documentation': { en: 'Documentation', bn: '\u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f\u09c7\u09b6\u09a8' },
  'nav.useCases': { en: 'Use Cases', bn: '\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u09c7\u09b0 \u0995\u09cd\u09b7\u09c7\u09a4\u09cd\u09b0' },
  'nav.features': { en: 'Features', bn: '\u09ab\u09bf\u099a\u09be\u09b0' },
  'nav.safety': { en: 'Safety & Privacy', bn: '\u09a8\u09bf\u09b0\u09be\u09aa\u09a4\u09cd\u09a4\u09be \u0993 \u0997\u09cb\u09aa\u09a8\u09c0\u09df\u09a4\u09be' },
  'nav.changelog': { en: 'Changelog', bn: '\u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09a8 \u09b2\u0997' },
  'nav.faq': { en: 'FAQ', bn: '\u09aa\u09cd\u09b0\u09b6\u09cd\u09a8\u09cb\u09a4\u09cd\u09a4\u09b0' },
  'nav.openPigeon': { en: 'Open Pigeon', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u0996\u09c1\u09b2\u09c1\u09a8' },
  'nav.getStarted': { en: 'Get Started', bn: '\u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09c1\u09a8' },

  // Search
  'search.placeholder': { en: 'Search Pigeon documentation\u2026', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f\u09c7\u09b6\u09a8 \u09b8\u09be\u09b0\u09cd\u099a \u0995\u09b0\u09c1\u09a8\u2026' },
  'search.searchDocs': { en: 'Search docs\u2026', bn: '\u09a1\u0995\u09cd\u09b8 \u09b8\u09be\u09b0\u09cd\u099a \u0995\u09b0\u09c1\u09a8\u2026' },
  'search.noResults': { en: 'No results for', bn: '\u0995\u09cb\u09a8 \u09ab\u09b2\u09be\u09ab\u09b2 \u09a8\u09c7\u0987' },
  'search.didYouMean': { en: 'Did you mean?', bn: '\u0986\u09aa\u09a8\u09bf \u0995\u09bf \u09ac\u09cb\u099d\u09be\u099a\u09cd\u099b\u09c7\u09a8?' },
  'search.recent': { en: 'Recent', bn: '\u09b8\u09be\u09ae\u09cd\u09aa\u09cd\u09b0\u09a4\u09bf\u0995' },
  'search.clear': { en: 'Clear', bn: '\u09ae\u09c1\u099b\u09c1\u09a8' },
  'search.toNavigate': { en: 'to navigate', bn: '\u09a8\u09c7\u09ad\u09bf\u0997\u09c7\u099f \u0995\u09b0\u09a4\u09c7' },
  'search.toOpen': { en: 'to open', bn: '\u0996\u09c1\u09b2\u09a4\u09c7' },
  'search.poweredBy': { en: 'Powered by Pigeon', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u09a6\u09cd\u09ac\u09be\u09b0\u09be \u099a\u09be\u09b2\u09bf\u09a4' },

  // Footer
  'footer.product': { en: 'Product', bn: '\u09aa\u09cd\u09b0\u09cb\u09a1\u09be\u0995\u09cd\u099f' },
  'footer.resources': { en: 'Resources', bn: '\u09b8\u09ae\u09cd\u09aa\u09a6' },
  'footer.company': { en: 'Company', bn: '\u0995\u09cb\u09ae\u09cd\u09aa\u09be\u09a8\u09bf' },
  'footer.about': { en: 'About', bn: '\u09ac\u09bf\u09b7\u09df\u09c7' },
  'footer.contact': { en: 'Contact', bn: '\u09af\u09cb\u0997\u09be\u09af\u09cb\u0997' },
  'footer.privacy': { en: 'Privacy', bn: '\u0997\u09cb\u09aa\u09a8\u09c0\u09df\u09a4\u09be' },
  'footer.terms': { en: 'Terms', bn: '\u09b6\u09b0\u09cd\u09a4\u09be\u09ac\u09b2\u09c0' },
  'footer.helpCenter': { en: 'Help Center', bn: '\u09b9\u09c7\u09b2\u09cd\u09aa \u09b8\u09c7\u09a8\u09cd\u099f\u09be\u09b0' },
  'footer.community': { en: 'Community', bn: '\u0995\u09ae\u09bf\u0989\u09a8\u09bf\u099f\u09bf' },
  'footer.premium': { en: 'Premium', bn: '\u09aa\u09cd\u09b0\u09bf\u09ae\u09bf\u09af\u09bc\u09be\u09ae' },
  'footer.rights': { en: '\u00a9 2026 Pigeon Social. All rights reserved.', bn: '\u00a9 \u09e8\u09e6\u09e8\u09ec \u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u09b8\u09cb\u09b6\u09cd\u09af\u09be\u09b2\u0964 \u09b8\u09b0\u09cd\u09ac\u09be\u09a7\u09bf\u0995\u09be\u09b0 \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4\u0964' },
  'footer.allSystems': { en: 'All systems operational', bn: '\u09b8\u09ac \u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae \u099a\u09be\u09b2\u09c1\u099b\u09c7' },

  // Home
  'home.badge': { en: 'Pigeon Social Documentation \u00b7 v4.2', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u09b8\u09cb\u09b6\u09cd\u09af\u09be\u09b2 \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f\u09c7\u09b6\u09a8 \u00b7 \u09ad\u09e8\u0964\u09e8' },
  'home.heroTitle1': { en: 'Everything you need to know about', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7 \u09af\u09be \u099c\u09be\u09a8\u09be \u09a6\u09b0\u0995\u09be\u09b0' },
  'home.heroTitle2': { en: 'Pigeon.', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8\u0964' },
  'home.heroDesc': {
    en: 'Explore Pigeon, discover what you can do with it, and learn how communities, creators, businesses, and everyday users can connect, communicate, and grow.',
    bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u0985\u09a8\u09cd\u09ac\u09c7\u09b7\u09a3 \u0995\u09b0\u09c1\u09a8, \u0986\u09aa\u09a8\u09bf \u098f\u09b0 \u09b8\u09be\u09a5\u09c7 \u0995\u09c0 \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7\u09a8 \u09a4\u09be \u099c\u09be\u09a8\u09c1\u09a8, \u098f\u09ac\u0982 \u099c\u09be\u09a8\u09c1\u09a8 \u0995\u09ae\u09bf\u0989\u09a8\u09bf\u099f\u09bf, \u0995\u09cd\u09b0\u09bf\u09af\u09bc\u09c7\u099f\u09b0, \u09ac\u09cd\u09af\u09ac\u09b8\u09be \u098f\u09ac\u0982 \u09b8\u09be\u09a7\u09be\u09b0\u09a3 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0\u09b0\u09be \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u09b8\u0982\u09af\u09cb\u0997, \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0993 \u09ac\u09c7\u09b0\u09be\u099a\u09c7 \u09aa\u09be\u09b0\u09c7\u09a8\u0964',
  },
  'home.popular': { en: 'Popular:', bn: '\u099c\u09a8\u09aa\u09cd\u09b0\u09bf\u09df:' },
  'home.browse': { en: 'Browse', bn: '\u09ac\u09cd\u09b0\u09be\u0989\u099c' },
  'home.catTitle': { en: 'Documentation categories', bn: '\u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f\u09c7\u09b6\u09a8 \u0995\u09cd\u09af\u09be\u099f\u09be\u0997\u09b0\u09bf' },
  'home.catDesc': { en: 'Start with any area of Pigeon. Each category pulls together the guides, references, and examples you need.', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8\u09c7\u09b0 \u09af\u09c7\u0995\u09cb\u09a8\u09cb \u0995\u09cd\u09b7\u09c7\u09a4\u09cd\u09b0 \u09a5\u09c7\u0995\u09c7 \u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09c1\u09a8\u0964 \u09aa\u09cd\u09b0\u09a4\u09bf\u099f\u09bf \u0995\u09cd\u09af\u09be\u099f\u09be\u0997\u09b0\u09bf \u0986\u09aa\u09a8\u09be\u09b0 \u09aa\u09cd\u09b0\u09df\u09cb\u099c\u09a8\u09c0\u09df \u0997\u09be\u0987\u09a1, \u09b0\u09c7\u09ab\u09be\u09b0\u09c7\u09a8\u09cd\u09b8 \u098f\u09ac\u0982 \u0989\u09a6\u09be\u09b9\u09b0\u09a3 \u098f\u0995\u09b8\u09be\u09a5\u09c7 \u09a6\u09c7\u09df\u0964' },
  'home.explore': { en: 'Explore', bn: '\u0985\u09a8\u09cd\u09ac\u09c7\u09b7\u09a3' },
  'home.mostRead': { en: 'Most read', bn: '\u09b8\u09ac\u099a\u09c7\u09df\u09c7 \u09aa\u09a0\u09bf\u09a4' },
  'home.popularTitle': { en: 'Popular documentation', bn: '\u099c\u09a8\u09aa\u09cd\u09b0\u09bf\u09df \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f\u09c7\u09b6\u09a8' },
  'home.popularDesc': { en: 'The guides Pigeon users come back to most often.', bn: '\u09af\u09c7\u09b8\u09ac \u0997\u09be\u0987\u09a1 \u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0\u09b0\u09be \u09ac\u09be\u09b0\u09ac\u09be\u09b0 \u09ab\u09bf\u09b0\u09c7 \u0986\u09b8\u09c7\u09a8\u0964' },
  'home.allDocs': { en: 'All documentation', bn: '\u09b8\u09ac \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f\u09c7\u09b6\u09a8' },

  // Demo
  'demo.eyebrow': { en: 'Interactive Preview', bn: '\u0987\u09a8\u09cd\u099f\u09be\u09b0\u09c7\u0995\u09cd\u099f\u09bf\u09ad \u09aa\u09cd\u09b0\u09bf\u09ad\u09bf\u0989' },
  'demo.title': { en: 'See Pigeon in action', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u0995\u09be\u099c\u09c7 \u09a6\u09c7\u0996\u09c1\u09a8' },
  'demo.desc': { en: 'Switch between perspectives to explore how Pigeon works for different users.', bn: '\u09ac\u09bf\u09ad\u09bf\u09a8\u09cd\u09a8 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u0995\u09be\u09b0\u09c0\u09b0 \u099c\u09a8\u09cd\u09af \u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u0995\u09be\u099c \u0995\u09b0\u09c7 \u09a4\u09be \u09a6\u09c7\u0996\u09a4\u09c7 \u09aa\u09b0\u09cd\u09b8\u09cd\u09aa\u09c7\u0995\u09cd\u099f\u09bf\u09ad \u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09a8 \u0995\u09b0\u09c1\u09a8\u0964' },

  // CTA
  'cta.ready': { en: 'Ready to try Pigeon?', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09a4\u09c7 \u09aa\u09cd\u09b0\u09b8\u09cd\u09a4\u09c1\u09a4?' },
  'cta.title': { en: 'Start meaningful conversations today.', bn: '\u0986\u099c\u0987 \u0985\u09b0\u09cd\u09a5\u09aa\u09c2\u09b0\u09cd\u09a3 \u0995\u09a5\u09cb\u09ac\u09be\u09b0\u09cd\u09a4\u09be \u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09c1\u09a8\u0964' },
  'cta.desc': { en: 'Join communities, message privately, and discover content that actually matters to you.', bn: '\u0995\u09ae\u09bf\u0989\u09a8\u09bf\u099f\u09bf\u09a4\u09c7 \u09af\u09cb\u0997 \u09a6\u09bf\u09a8, \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u0997\u09a4 \u09ae\u09c7\u09b8\u09c7\u099c \u0995\u09b0\u09c1\u09a8, \u098f\u09ac\u0982 \u0986\u09aa\u09a8\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09b8\u09a4\u09cd\u09af\u09bf \u0997\u09c1\u09b0\u09c1\u09a4\u09cd\u09ac\u09aa\u09c2\u09b0\u09cd\u09a3 \u0995\u09a8\u09cd\u099f\u09c7\u09a8\u09cd\u099f \u0986\u09ac\u09bf\u09b7\u09cd\u0995\u09be\u09b0 \u0995\u09b0\u09c1\u09a8\u0964' },
  'cta.getStarted': { en: 'Get Started', bn: '\u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09c1\u09a8' },
  'cta.openPigeon': { en: 'Open Pigeon', bn: '\u09aa\u09bf\u099c\u09bf\u09df\u09a8 \u0996\u09c1\u09b2\u09c1\u09a8' },

  // Docs
  'docs.updated': { en: 'Updated', bn: '\u0986\u09aa\u09a1\u09c7\u099f' },
  'docs.print': { en: 'Print', bn: '\u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f' },
  'docs.onThisPage': { en: 'On this page', bn: '\u098f\u0987 \u09aa\u09c3\u09b7\u09cd\u09a0\u09be\u09df' },
  'docs.backToTop': { en: 'Back to top', bn: '\u0989\u09aa\u09b0\u09c7 \u09ab\u09bf\u09b0\u09c7 \u09af\u09be\u09a8' },
  'docs.related': { en: 'Related articles', bn: '\u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09bf\u09a4 \u09a8\u099f\u09bf' },
  'docs.previous': { en: 'Previous', bn: '\u09aa\u09c7\u099b\u09c7\u09b0' },
  'docs.next': { en: 'Next', bn: '\u09aa\u09b0\u09ac\u09b0\u09cd\u09a4\u09c0' },
  'docs.contents': { en: 'Contents', bn: '\u09ac\u09bf\u09b7\u09df\u09ac\u09b8\u09cd\u09a4\u09c1' },
  'docs.docs': { en: 'Docs', bn: '\u09a1\u0995\u09cd\u09b8' },
  'docs.recentlyVisited': { en: 'Recently visited', bn: '\u09b8\u09be\u09ae\u09cd\u09aa\u09cd\u09b0\u09a4\u09bf\u0995 \u09a6\u09c7\u0996\u09be' },

  // Misc
  'misc.features': { en: 'Features', bn: '\u09ab\u09bf\u099a\u09be\u09b0' },
  'misc.allFeatures': { en: 'All features', bn: '\u09b8\u09ac \u09ab\u09bf\u099a\u09be\u09b0' },
  'misc.featureNotFound': { en: 'Feature not found.', bn: '\u09ab\u09bf\u099a\u09be\u09b0 \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df\u09a8\u09bf\u0964' },
  'misc.relatedFeatures': { en: 'Related features', bn: '\u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09bf\u09a4 \u09ab\u09bf\u099a\u09be\u09b0' },
  'misc.pageNotFound': { en: 'This page could not be found.', bn: '\u098f\u0987 \u09aa\u09c3\u09b7\u09cd\u09a0\u099f\u09bf \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df\u09a8\u09bf\u0964' },
  'misc.backToHome': { en: 'Back to home', bn: '\u09b9\u09cb\u09ae \u098f \u09ab\u09bf\u09b0\u09c7 \u09af\u09be\u09a8' },
};

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('pigeon-lang');
  if (stored === 'en' || stored === 'bn') return stored;
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  useEffect(() => {
    localStorage.setItem('pigeon-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Language) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'bn' : 'en')), []);

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang],
  );

  return <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
