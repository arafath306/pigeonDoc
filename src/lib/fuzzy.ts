export interface FuzzyMatch {
  score: number;
  matched: boolean;
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return 100 - (t.indexOf(q) === 0 ? 0 : 10);
  const words = t.split(/\s+/);
  let bestSub = 0;
  for (const w of words) {
    if (w.startsWith(q)) bestSub = Math.max(bestSub, 80 - w.length);
  }
  if (bestSub > 0) return bestSub;
  const dist = levenshtein(q, t);
  const maxLen = Math.max(q.length, t.length);
  const similarity = 1 - dist / maxLen;
  if (similarity > 0.6) return Math.round(similarity * 70);
  return 0;
}

export interface RankedResult<T> {
  item: T;
  score: number;
}

export function fuzzyFilter<T>(
  query: string,
  items: T[],
  getText: (item: T) => string,
): RankedResult<T>[] {
  const q = query.trim().toLowerCase();
  if (!q) return items.map((item) => ({ item, score: 0 }));
  return items
    .map((item) => ({ item, score: fuzzyScore(q, getText(item)) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function didYouMean(query: string, candidates: string[], threshold = 3): string[] {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];
  return candidates
    .map((c) => ({ word: c, dist: levenshtein(q, c.toLowerCase()) }))
    .filter((x) => x.dist <= threshold && x.dist > 0)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3)
    .map((x) => x.word);
}
