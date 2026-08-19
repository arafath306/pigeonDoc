import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

const allowed = Icons as unknown as Record<string, LucideIcon>;

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = allowed[name] ?? Icons.Circle;
  return <Cmp className={className} />;
}

export function iconNames(): string[] {
  return Object.keys(allowed);
}
