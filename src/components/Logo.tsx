export function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <img src="/logo.png" className={className} alt="Pigeon Logo" />
  );
}
