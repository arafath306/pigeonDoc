import { useEffect } from 'react';
import { Icon } from '@/components/Icon';
import { ArticleRenderer } from '@/components/ArticleRenderer';
import { ReadingProgress } from '@/components/ReadingProgress';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { features } from '@/content/features';
import { useRouter } from '@/lib/router';
import { useRecentVisits } from '@/lib/useRecentVisits';
import { SectionHeading, Reveal } from '@/components/Reveal';
import { FeatureStatus } from '@/content/types';

const statusBadge: Record<FeatureStatus, { label: string; cls: string }> = {
  available: { label: 'Available', cls: 'badge-available' },
  planned: { label: 'Planned', cls: 'badge-planned' },
  beta: { label: 'Beta', cls: 'badge-beta' },
};

export function FeaturesIndexPage() {
  const { navigate } = useRouter();

  const groups = features.reduce<Record<string, typeof features>>((acc, f) => {
    (acc[f.category] ??= []).push(f);
    return acc;
  }, {});

  return (
    <div className="container-page py-14 sm:py-20">
      <SectionHeading
        eyebrow="Features"
        title="Everything Pigeon can do"
        description="A complete reference of Pigeon features — what is available today, what is in beta, and what is planned next."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.slug} delay={i * 30}>
            <button
              onClick={() => navigate(`/features/${f.slug}`)}
              className="card-hover group w-full h-full text-left p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 transition-colors">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <span className={statusBadge[f.status].cls}>{statusBadge[f.status].label}</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{f.name}</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed flex-1">{f.tagline}</p>
              <span className="mt-3 text-xs font-medium text-brand-600 dark:text-brand-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <Icon name="ArrowRight" className="h-3.5 w-3.5" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Status legend */}
      <div className="mt-12 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Feature status legend</h3>
        <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="badge-available mt-0.5">Available</span>
            <span className="text-muted text-xs leading-relaxed">Generally available to all users today.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="badge-beta mt-0.5">Beta</span>
            <span className="text-muted text-xs leading-relaxed">Rolling out gradually; behavior may change.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="badge-planned mt-0.5">Planned</span>
            <span className="text-muted text-xs leading-relaxed">On the roadmap but not yet shipped.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturePage({ slug }: { slug: string }) {
  const { navigate, path } = useRouter();
  const { recordVisit } = useRecentVisits();
  const feature = features.find((f) => f.slug === slug);

  useEffect(() => {
    if (feature) recordVisit(path, feature.name);
  }, [path, feature, recordVisit]);

  if (!feature) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-muted">Feature not found.</p>
        <button onClick={() => navigate('/features')} className="btn-secondary mt-4">
          Back to features
        </button>
      </div>
    );
  }

  const related = (feature.related ?? [])
    .map((s) => {
      const docMatch = features.find((f) => f.slug === s);
      return docMatch;
    })
    .filter(Boolean) as typeof features;

  return (
    <div className="container-page py-10 lg:py-14">
      <ReadingProgress />
      <button
        onClick={() => navigate('/features')}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
      >
        <Icon name="ArrowLeft" className="h-4 w-4" />
        All features
      </button>

      <div className="max-w-3xl">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <Icon name={feature.icon} className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {feature.name}
              </h1>
              <span className={statusBadge[feature.status].cls}>{statusBadge[feature.status].label}</span>
            </div>
            <p className="mt-1.5 text-sm text-muted">{feature.tagline}</p>
          </div>
        </div>

        <p className="mt-6 text-[15px] leading-[1.75] text-slate-700 dark:text-slate-300">{feature.description}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {feature.highlights.map((h) => (
            <div key={h} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3">
              <div className="flex items-start gap-2">
                <Icon name="Check" className="h-4 w-4 mt-0.5 text-brand-600 dark:text-brand-400 shrink-0" />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{h}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
          <ArticleRenderer sections={feature.details} />
        </div>

        <FeedbackWidget pageSlug={feature.slug} pageType="feature" />

        {related.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Related features
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <button
                    onClick={() => navigate(`/features/${r.slug}`)}
                    className="card-hover group w-full text-left p-4 flex items-center gap-3"
                  >
                    <Icon name={r.icon} className="h-4 w-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{r.name}</span>
                    <Icon name="ArrowUpRight" className="ml-auto h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
