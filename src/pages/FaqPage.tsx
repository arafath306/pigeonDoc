import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { faqItems } from '@/content/faq';

export function FaqPage() {
  const [open, setOpen] = useState<string | null>(faqItems[0]?.question ?? null);
  const [category, setCategory] = useState<string>('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(faqItems.map((f) => f.category)))], []);

  const filtered = useMemo(
    () => (category === 'All' ? faqItems : faqItems.filter((f) => f.category === category)),
    [category]
  );

  return (
    <div className="bg-white dark:bg-ink-950">
      {/* Corporate page hero */}
      <div className="relative overflow-hidden bg-ink-950 text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(50% 60% at 50% 0%, rgba(31,174,140,0.22) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-corporate-grid opacity-30 [mask-image:radial-gradient(70%_80%_at_50%_0%,black,transparent)]" />
        <div className="relative container-page py-14 sm:py-20 max-w-3xl">
          <p className="eyebrow !text-brand-300">FAQ · Help center</p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-medium tracking-tight text-balance">
            Answers, without the runaround.
          </h1>
          <p className="mt-4 text-base text-white/65 leading-relaxed">
            Quick answers to the questions Pigeon users ask most — reviewed by support, legal and security. Use search (⌘K) for anything not covered here.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
              <Icon name="Clock" className="h-3 w-3 text-brand-300" />
              Updated weekly
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
              <Icon name="ShieldCheck" className="h-3 w-3 text-brand-300" />
              Verified by Pigeon team
            </span>
          </div>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16 max-w-3xl">
        {/* Category filter — BoardUI pill style */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                category === c
                  ? 'bg-ink-950 text-white dark:bg-white dark:text-ink-950 shadow-corporate'
                  : 'border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-ink-900 dark:hover:border-white/30 hover:text-ink-950 dark:hover:text-white bg-white dark:bg-white/[0.03]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {filtered.map((item) => {
            const isOpen = open === item.question;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-ink-900 dark:border-white/20 bg-slate-50 dark:bg-white/[0.04] shadow-corporate'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.question)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-3 min-w-0">
                    <span className="mt-0.5 inline-flex shrink-0 rounded-full bg-brand-50 dark:bg-brand-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                      {item.category}
                    </span>
                    <span className="text-[15px] font-semibold text-slate-900 dark:text-white leading-snug">
                      {item.question}
                    </span>
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-ink-950 text-white dark:bg-white dark:text-ink-950' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50'
                    }`}
                  >
                    <Icon
                      name="ChevronDown"
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-slate-600 dark:text-white/65 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4 mt-1 mx-5 px-0!">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community support card */}
        <div className="mt-10 rounded-2xl bg-ink-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-300">Still have questions?</p>
            <p className="mt-1 font-display text-xl font-medium">Our community support team is here to help.</p>
          </div>
          <button className="btn-gold px-4 py-2 text-sm shrink-0">
            Ask in Community
            <Icon name="ArrowRight" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
