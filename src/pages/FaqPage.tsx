import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { faqItems } from '@/content/faq';
import { SectionHeading } from '@/components/Reveal';

export function FaqPage() {
  const [open, setOpen] = useState<string | null>(faqItems[0]?.question ?? null);
  const [category, setCategory] = useState<string>('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(faqItems.map((f) => f.category)))], []);

  const filtered = useMemo(
    () => (category === 'All' ? faqItems : faqItems.filter((f) => f.category === category)),
    [category]
  );

  return (
    <div className="container-page py-14 sm:py-20">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers to the questions Pigeon users ask most. Use search (⌘K) for anything not covered here."
      />

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              category === c
                ? 'bg-brand-600 text-white'
                : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 max-w-3xl space-y-3">
        {filtered.map((item) => {
          const isOpen = open === item.question;
          return (
            <div
              key={item.question}
              className={`rounded-xl border transition-colors ${
                isOpen
                  ? 'border-brand-300 dark:border-brand-500/40 bg-brand-50/30 dark:bg-brand-500/5'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40'
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : item.question)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-medium text-brand-600 dark:text-brand-400 shrink-0">{item.category}</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{item.question}</span>
                </span>
                <Icon
                  name="ChevronDown"
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out-expo ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm text-muted leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
