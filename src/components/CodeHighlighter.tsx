interface Token {
  text: string;
  type: 'plain' | 'keyword' | 'string' | 'comment' | 'number' | 'function' | 'operator' | 'property';
}

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'break', 'continue', 'new', 'class', 'extends', 'super', 'this',
  'import', 'export', 'from', 'default', 'async', 'await', 'try', 'catch', 'finally',
  'throw', 'typeof', 'instanceof', 'in', 'of', 'delete', 'void', 'yield', 'static',
  'public', 'private', 'protected', 'readonly', 'interface', 'type', 'enum', 'namespace',
  'true', 'false', 'null', 'undefined', 'as', 'implements', 'get', 'set',
]);

const CSS_KEYWORDS = new Set([
  'color', 'background', 'margin', 'padding', 'border', 'display', 'flex', 'grid',
  'position', 'width', 'height', 'font', 'text', 'align', 'justify', 'gap', 'top',
  'left', 'right', 'bottom', 'z-index', 'opacity', 'transition', 'transform', 'animation',
]);

function tokenizeLine(line: string, lang: string): Token[] {
  if (lang === 'css' || lang === 'scss') {
    return tokenizeCss(line);
  }
  if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
    return tokenizeBash(line);
  }
  return tokenizeJs(line);
}

function tokenizeJs(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < line.length) {
    const rest = line.slice(i);
    if (rest.startsWith('//')) {
      tokens.push({ text: rest, type: 'comment' });
      break;
    }
    if (rest.startsWith('/*')) {
      const end = rest.indexOf('*/');
      const chunk = end >= 0 ? rest.slice(0, end + 2) : rest;
      tokens.push({ text: chunk, type: 'comment' });
      i += chunk.length;
      continue;
    }
    const stringMatch = rest.match(/^(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/);
    if (stringMatch) {
      tokens.push({ text: stringMatch[0], type: 'string' });
      i += stringMatch[0].length;
      continue;
    }
    const commentMatch = rest.match(/^(\s+)/);
    if (commentMatch) {
      tokens.push({ text: commentMatch[0], type: 'plain' });
      i += commentMatch[0].length;
      continue;
    }
    const wordMatch = rest.match(/^([A-Za-z_$][A-Za-z0-9_$]*)/);
    if (wordMatch) {
      const word = wordMatch[0];
      const nextChar = line[i + word.length];
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else if (nextChar === '(') {
        tokens.push({ text: word, type: 'function' });
      } else {
        tokens.push({ text: word, type: 'plain' });
      }
      i += word.length;
      continue;
    }
    const numMatch = rest.match(/^(\d+\.?\d*)/);
    if (numMatch) {
      tokens.push({ text: numMatch[0], type: 'number' });
      i += numMatch[0].length;
      continue;
    }
    const opMatch = rest.match(/^([+\-*/=<>!&|%^~?:.]+)/);
    if (opMatch) {
      tokens.push({ text: opMatch[0], type: 'operator' });
      i += opMatch[0].length;
      continue;
    }
    tokens.push({ text: line[i], type: 'plain' });
    i++;
  }
  return tokens;
}

function tokenizeCss(line: string): Token[] {
  const tokens: Token[] = [];
  const parts = line.split(/(:|;|{|}|,)/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!part) continue;
    if (part === ':' || part === ';' || part === '{' || part === '}' || part === ',') {
      tokens.push({ text: part, type: 'operator' });
    } else if (trimmed.startsWith('/*') || trimmed.startsWith('//')) {
      tokens.push({ text: part, type: 'comment' });
    } else if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
      tokens.push({ text: part, type: 'string' });
    } else if (CSS_KEYWORDS.has(trimmed.toLowerCase())) {
      tokens.push({ text: part, type: 'keyword' });
    } else if (/^\d+/.test(trimmed)) {
      tokens.push({ text: part, type: 'number' });
    } else {
      tokens.push({ text: part, type: 'property' });
    }
  }
  return tokens;
}

function tokenizeBash(line: string): Token[] {
  const tokens: Token[] = [];
  if (line.trimStart().startsWith('#')) {
    tokens.push({ text: line, type: 'comment' });
    return tokens;
  }
  const parts = line.split(/(\s+)/);
  for (let j = 0; j < parts.length; j++) {
    if (!parts[j]) continue;
    if (j === 0 && parts[j].trim()) {
      tokens.push({ text: parts[j], type: 'function' });
    } else if (parts[j].trim().startsWith('-')) {
      tokens.push({ text: parts[j], type: 'keyword' });
    } else if (parts[j].trim().startsWith('$')) {
      tokens.push({ text: parts[j], type: 'number' });
    } else {
      tokens.push({ text: parts[j], type: 'plain' });
    }
  }
  return tokens;
}

const tokenColors: Record<Token['type'], string> = {
  plain: 'text-slate-700 dark:text-slate-300',
  keyword: 'text-brand-600 dark:text-brand-400 font-medium',
  string: 'text-emerald-600 dark:text-emerald-400',
  comment: 'text-slate-400 dark:text-slate-500 italic',
  number: 'text-amber-600 dark:text-amber-400',
  function: 'text-accent-600 dark:text-accent-400',
  operator: 'text-slate-500 dark:text-slate-400',
  property: 'text-sky-600 dark:text-sky-400',
};

export function CodeHighlighter({ code, language }: { code: string; language?: string }) {
  const lang = (language ?? 'js').toLowerCase();
  const lines = code.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const tokens = tokenizeLine(line, lang);
        return (
          <div key={i}>
            {tokens.length === 0 ? (
              '\u00A0'
            ) : (
              tokens.map((tok, j) => (
                <span key={j} className={tokenColors[tok.type]}>
                  {tok.text}
                </span>
              ))
            )}
          </div>
        );
      })}
    </>
  );
}
