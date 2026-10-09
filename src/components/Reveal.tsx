import { ReactNode } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="eyebrow">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 dark:text-white text-balance">
        {title}
      </h2>
      {description && <p className="mt-3 text-base text-muted leading-relaxed">{description}</p>}
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
