import { SearchEntry } from './types';
import { docArticles } from './docs';
import { features } from './features';
import { useCases } from './useCases';
import { changelog } from './changelog';
import { faqItems } from './faq';

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  docArticles.forEach((a) => {
    entries.push({
      title: a.title,
      category: a.category,
      description: a.description,
      path: `/docs/${a.slug}`,
      kind: 'Documentation',
    });
  });

  features.forEach((f) => {
    entries.push({
      title: f.name,
      category: f.category,
      description: f.tagline,
      path: `/features/${f.slug}`,
      kind: 'Feature',
    });
  });

  useCases.forEach((u) => {
    entries.push({
      title: u.name,
      category: 'Use Case',
      description: u.tagline,
      path: `/use-cases/${u.slug}`,
      kind: 'Use Case',
    });
  });

  faqItems.forEach((q) => {
    entries.push({
      title: q.question,
      category: q.category,
      description: q.answer.slice(0, 140),
      path: `/faq`,
      kind: 'FAQ',
    });
  });

  changelog.forEach((v) => {
    entries.push({
      title: `Version ${v.version}`,
      category: 'Changelog',
      description: `Released ${v.date}. ${v.tag ?? ''}`.trim(),
      path: `/changelog`,
      kind: 'Changelog',
    });
  });

  return entries;
}

export const searchIndex: SearchEntry[] = buildSearchIndex();
