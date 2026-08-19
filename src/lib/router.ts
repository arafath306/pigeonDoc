import { useEffect, useState, useCallback } from 'react';

export interface RouteState {
  path: string;
  segments: string[];
}

function getCurrentPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export function useRouter() {
  const [path, setPath] = useState<string>(getCurrentPath());

  useEffect(() => {
    const onChange = () => {
      setPath(getCurrentPath());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    if (!window.location.hash) {
      window.location.replace('#/');
    }
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = to.startsWith('#') ? to : `#${to.startsWith('/') ? to : `/${to}`}`;
    if (window.location.hash === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = target;
  }, []);

  const segments = path.split('/').filter(Boolean);

  return { path, segments, navigate };
}

export function useRouteMatch(prefix: string, path: string): boolean {
  return path === prefix || path.startsWith(prefix + '/') || path.startsWith(prefix);
}
