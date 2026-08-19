import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { ReadingProgress } from '@/components/ReadingProgress';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { safetyTopics } from '@/content/safety';
import { useRouter } from '@/lib/router';
import { SectionHeading, Reveal } from '@/components/Reveal';

export function SafetyPage() {
  const { navigate } = useRouter();
  const [active, setActive] = useState(safetyTopics[0].slug);

  const topic = safetyTopics.find((t) => t.slug === active) ?? safetyTopics[0];

  return (
    <div className="container-doc py-10 lg:py-14">
      <ReadingProgress />
      <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="xl:w-64 shrink-0">
          <div className="xl:sticky xl:top-24">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 text-sm transition-colors">
              <Icon name="ShieldCheck" className="h-4 w-4 text-brand-500" />
              Safety & Privacy
            </button>
            <nav className="space-y-0.5">
              {safetyTopics.map((t) => {
                const isActive = active === t.slug;
                return (
                  <button
                    key={t.slug}
                    onClick={() => setActive(t.slug)}
                    className={`relative w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                      isActive
                        ? 'font-medium text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-brand-500" />}
                    <Icon name={t.icon} className="h-4 w-4 shrink-0" />
                    <span className="truncate">{t.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          <SectionHeading
            eyebrow="Safety & Privacy"
            title="How Pigeon keeps you safe"
            description="Clear, plain-language explanations of how Pigeon protects your account, your conversations, and your data — without the legal jargon."
          />

          <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center gap-3 p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Icon name={topic.icon} className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{topic.title}</h2>
                <p className="text-sm text-muted">{topic.summary}</p>
              </div>
            </div>

            <div className="p-6">
              {topic.sections.map((s, i) => (
                <div key={i} className={i > 0 ? 'mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60' : ''}>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{s.heading}</h3>
                  <p className="mt-2 text-[15px] leading-[1.75] text-slate-700 dark:text-slate-300">{s.body}</p>
                  {s.bullets && (
                    <ul className="mt-3 ml-5 list-disc space-y-1.5 text-[15px] text-slate-700 dark:text-slate-300 marker:text-brand-500">
                      {s.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="mt-10 rounded-2xl border border-brand-200 dark:border-brand-500/20 bg-brand-50/50 dark:bg-brand-500/10 p-6">
              <div className="flex items-start gap-3">
                <Icon name="ShieldCheck" className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Our commitment</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    Privacy and safety are not features we add later — they are part of how Pigeon is built. If something
                    here is unclear, let us know and we will improve this guide.
                  </p>
                  <button onClick={() => navigate('/docs/privacy-and-security')} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-400 hover:underline">
                    Read the full privacy guide
                    <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <FeedbackWidget pageSlug={topic.slug} pageType="safety" />
        </main>
      </div>
    </div>
  );
}
