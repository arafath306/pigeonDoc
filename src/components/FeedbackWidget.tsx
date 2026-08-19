import { useState } from 'react';
import { Icon } from './Icon';
import { supabase } from '@/lib/supabase';

interface FeedbackWidgetProps {
  pageSlug: string;
  pageType?: 'docs' | 'feature' | 'safety' | 'use-case';
}

type FeedbackState = 'idle' | 'submitted' | 'error';

export function FeedbackWidget({ pageSlug, pageType = 'docs' }: FeedbackWidgetProps) {
  const [state, setState] = useState<FeedbackState>('idle');
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (wasHelpful: boolean) => {
    setHelpful(wasHelpful);
    setShowComment(true);
  };

  const submitWithComment = async () => {
    if (helpful === null) return;
    setSubmitting(true);
    const { error } = await supabase.from('article_feedback').insert({
      page_slug: pageSlug,
      page_type: pageType,
      helpful,
      comment: comment.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      setState('error');
    } else {
      setState('submitted');
    }
  };

  if (state === 'submitted') {
    return (
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden">
        <div className="flex items-center gap-3 rounded-xl border border-brand-200 dark:border-brand-500/30 bg-brand-50 dark:bg-brand-500/10 px-4 py-3">
          <Icon name="CheckCircle2" className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0" />
          <p className="text-sm text-brand-800 dark:text-brand-300">
            Thank you for your feedback! It helps us improve Pigeon documentation.
          </p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden">
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-4 py-3">
          <Icon name="TriangleAlert" className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        Was this helpful?
      </p>
      {!showComment ? (
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => submit(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500/40 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors"
          >
            <Icon name="ThumbsUp" className="h-4 w-4" />
            Yes
          </button>
          <button
            onClick={() => submit(false)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500/40 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors"
          >
            <Icon name="ThumbsDown" className="h-4 w-4" />
            No
          </button>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Icon name={helpful ? 'ThumbsUp' : 'ThumbsDown'} className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            <span>
              {helpful ? 'Great! Glad it helped.' : 'Thanks for letting us know.'}
            </span>
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us more (optional)…"
              rows={3}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-400 transition-all resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={submitWithComment}
              disabled={submitting}
              className="btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit feedback'}
            </button>
            <button
              onClick={() => {
                setShowComment(false);
                setHelpful(null);
              }}
              className="btn-ghost px-3 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
