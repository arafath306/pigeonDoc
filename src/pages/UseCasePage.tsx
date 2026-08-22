import { Icon } from '@/components/Icon';
import { useCases } from '@/content/useCases';
import { useRouter } from '@/lib/router';
import { SectionHeading, Reveal } from '@/components/Reveal';
import { FeedbackWidget } from '@/components/FeedbackWidget';

export function UseCasesIndexPage() {
  const { navigate } = useRouter();

  return (
    <div className="container-page py-14 sm:py-20">
      <SectionHeading
        eyebrow="Use Cases"
        title="How people use Pigeon"
        description="Different people use Pigeon in different ways. Explore the scenarios below to see how Pigeon fits each one."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((uc, i) => (
          <Reveal key={uc.slug} delay={i * 40}>
            <button
              onClick={() => navigate(`/use-cases/${uc.slug}`)}
              className="card-hover group w-full h-full text-left p-6 flex flex-col"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 transition-colors">
                <Icon name={uc.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{uc.name}</h3>
              <p className="mt-1.5 text-sm text-muted leading-relaxed flex-1">{uc.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore use case <Icon name="ArrowRight" className="h-3.5 w-3.5" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function UseCasePage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const uc = useCases.find((u) => u.slug === slug);

  if (!uc) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-muted">Use case not found.</p>
        <button onClick={() => navigate('/use-cases')} className="btn-secondary mt-4">
          Back to use cases
        </button>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <button
        onClick={() => navigate('/use-cases')}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
      >
        <Icon name="ArrowLeft" className="h-4 w-4" />
        All use cases
      </button>

      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <Icon name={uc.icon} className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{uc.name}</h1>
            <p className="mt-1.5 text-sm text-muted">{uc.tagline}</p>
          </div>
        </div>

        {/* Problem → How Pigeon Helps */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Icon name="CircleAlert" className="h-4 w-4" />
              The problem
            </div>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{uc.problem}</p>
          </div>
          <div className="rounded-xl border border-brand-200 dark:border-brand-500/20 bg-brand-50/50 dark:bg-brand-500/10 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-400">
              <Icon name="Sparkles" className="h-4 w-4" />
              How Pigeon helps
            </div>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{uc.howPigeonHelps}</p>
          </div>
        </div>

        {/* Features used */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Features used</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {uc.featuresUsed.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                <Icon name="Check" className="h-3 w-3 text-brand-500" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Example workflow */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Example workflow</h2>
          <ol className="mt-5 space-y-4">
            {uc.workflow.map((step, i) => (
              <li key={i} className="relative pl-12">
                <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-semibold shadow-soft">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Benefits</h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
            {uc.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400 mt-0.5">
                  <Icon name="Check" className="h-3 w-3" />
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <FeedbackWidget pageSlug={uc.slug} pageType="use-case" />

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-900/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Ready to get started?</h3>
            <p className="mt-1 text-sm text-muted">Join Pigeon and put this workflow into practice today.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/pigeon.release.apk"
              download="Pigeon.apk"
              className="btn-primary px-4 py-2 inline-flex items-center justify-center gap-1.5"
            >
              Get Started
              <Icon name="ArrowRight" className="h-4 w-4" />
            </a>
            <button onClick={() => navigate('/docs/getting-started')} className="btn-secondary px-4 py-2">
              Read docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
