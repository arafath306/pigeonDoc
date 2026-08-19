import { DocSection } from '@/content/types';
import { Icon } from './Icon';
import { CodeHighlighter } from './CodeHighlighter';

const calloutMap: Record<string, { icon: string; label: string }> = {
  info: { icon: 'Info', label: 'Info' },
  tip: { icon: 'Lightbulb', label: 'Tip' },
  warning: { icon: 'TriangleAlert', label: 'Warning' },
  note: { icon: 'StickyNote', label: 'Note' },
};

export function ArticleRenderer({ sections }: { sections: DocSection[] }) {
  return (
    <div className="doc-content">
      {sections.map((section, i) => {
        switch (section.type) {
          case 'heading': {
            const level = section.level ?? 2;
            const id = section.id ?? `heading-${i}`;
            if (level === 2) {
              return (
                <h2 key={i} id={id} className="scroll-mt-24 mt-10 mb-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {section.title}
                </h2>
              );
            }
            if (level === 3) {
              return (
                <h3 key={i} id={id} className="scroll-mt-24 mt-8 mb-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {section.title}
                </h3>
              );
            }
            return (
              <h4 key={i} id={id} className="scroll-mt-24 mt-6 mb-2 text-base font-semibold text-slate-900 dark:text-white">
                {section.title}
              </h4>
            );
          }

          case 'paragraph':
            return (
              <p key={i} className="my-4 text-[15px] leading-[1.75] text-slate-700 dark:text-slate-300">
                {section.text}
              </p>
            );

          case 'list':
            return section.ordered ? (
              <ol key={i} className="my-4 ml-5 list-decimal space-y-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 marker:text-slate-400">
                {section.items?.map((item, j) => <li key={j}>{item}</li>)}
              </ol>
            ) : (
              <ul key={i} className="my-4 ml-5 list-disc space-y-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 marker:text-brand-500">
                {section.items?.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );

          case 'steps':
            return (
              <ol key={i} className="my-6 space-y-3">
                {section.steps?.map((step, j) => (
                  <li key={j} className="relative pl-12">
                    <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400 text-sm font-semibold">
                      {j + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                    <p className="mt-1 text-sm text-muted leading-relaxed">{step.description}</p>
                  </li>
                ))}
              </ol>
            );

          case 'callout': {
            const cfg = calloutMap[section.calloutType ?? 'note'];
            return (
              <div key={i} className={`callout callout-${section.calloutType ?? 'note'}`}>
                <div className="flex gap-3">
                  <Icon name={cfg.icon} className="h-4 w-4 shrink-0 mt-0.5 opacity-80" />
                  <div className="flex-1">
                    {section.title && <p className="font-semibold text-slate-900 dark:text-white">{section.title}</p>}
                    <p className={section.title ? 'mt-1' : ''}>{section.text}</p>
                  </div>
                </div>
              </div>
            );
          }

          case 'info-box':
            return (
              <div key={i} className="my-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60">
                  <Icon name="Terminal" className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
                    {section.title ?? 'info'}
                  </span>
                </div>
                <div className="p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                  {section.text}
                </div>
              </div>
            );

          case 'code':
            return (
              <pre key={i} className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 text-sm font-mono leading-relaxed">
                <code>
                  <CodeHighlighter code={section.text ?? ''} language={section.language} />
                </code>
              </pre>
            );

          case 'table':
            return (
              <div key={i} className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm">
                  {section.headers && (
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                      <tr>
                        {section.headers.map((h, j) => (
                          <th key={j} className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {section.rows?.map((row, j) => (
                      <tr key={j} className="border-b border-slate-100 dark:border-slate-800/60 last:border-0">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 text-slate-700 dark:text-slate-300 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
