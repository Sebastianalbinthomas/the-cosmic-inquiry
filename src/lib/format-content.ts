/**
 * Formats cosmic content strings into rich, semantic HTML without raw markdown artifacts.
 * Strips raw # and * copy-paste remnants, converts headers, lists, math formulas, and emphasis into styled HTML.
 */
export function formatCosmicContent(rawContent: string): string {
  if (!rawContent) return '';

  // Clean any accidental #* or *# copy-paste artifacts
  let cleanContent = rawContent.replace(/#\*/g, '').replace(/\*#/g, '');

  const lines = cleanContent.split('\n');
  const htmlParts: string[] = [];
  let inList: 'ul' | 'ol' | null = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Empty line closes active lists
    if (!trimmed) {
      if (inList) {
        htmlParts.push(inList === 'ul' ? '</ul>' : '</ol>');
        inList = null;
      }
      continue;
    }

    // Heading 1 / 2: ## Title or # Title
    if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      if (inList) {
        htmlParts.push(inList === 'ul' ? '</ul>' : '</ol>');
        inList = null;
      }
      const title = trimmed.replace(/^#{1,2}\s+/, '');
      htmlParts.push(
        `<h2 class="text-2xl sm:text-3xl font-bold font-heading text-white mt-10 mb-4 pb-2 border-b border-violet-500/20 text-gradient-cosmic">${formatInline(title)}</h2>`
      );
      continue;
    }

    // Heading 3: ### Title
    if (trimmed.startsWith('### ')) {
      if (inList) {
        htmlParts.push(inList === 'ul' ? '</ul>' : '</ol>');
        inList = null;
      }
      const title = trimmed.replace(/^###\s+/, '');
      htmlParts.push(
        `<h3 class="text-xl sm:text-2xl font-bold font-heading text-cyan-300 mt-8 mb-3 flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></span><span>${formatInline(title)}</span></h3>`
      );
      continue;
    }

    // Heading 4: #### Title
    if (trimmed.startsWith('#### ')) {
      if (inList) {
        htmlParts.push(inList === 'ul' ? '</ul>' : '</ol>');
        inList = null;
      }
      const title = trimmed.replace(/^####\s+/, '');
      htmlParts.push(
        `<h4 class="text-lg sm:text-xl font-semibold font-heading text-violet-300 mt-6 mb-2">${formatInline(title)}</h4>`
      );
      continue;
    }

    // Blockquote: > text
    if (trimmed.startsWith('> ')) {
      if (inList) {
        htmlParts.push(inList === 'ul' ? '</ul>' : '</ol>');
        inList = null;
      }
      const quote = trimmed.replace(/^>\s+/, '');
      htmlParts.push(
        `<blockquote class="border-l-4 border-violet-500 pl-4 py-2 my-4 italic text-violet-200 bg-violet-950/20 rounded-r-xl font-body">${formatInline(quote)}</blockquote>`
      );
      continue;
    }

    // Ordered list: 1. text
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (inList !== 'ol') {
        if (inList === 'ul') htmlParts.push('</ul>');
        htmlParts.push('<ol class="space-y-3 my-5 list-decimal list-inside text-slate-300 font-body">');
        inList = 'ol';
      }
      htmlParts.push(
        `<li class="leading-relaxed pl-1 marker:text-cyan-400 marker:font-mono marker:font-bold">${formatInline(olMatch[2])}</li>`
      );
      continue;
    }

    // Unordered list: - text or * text
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (inList !== 'ul') {
        if (inList === 'ol') htmlParts.push('</ol>');
        htmlParts.push('<ul class="space-y-3 my-5 text-slate-300 font-body">');
        inList = 'ul';
      }
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      htmlParts.push(
        `<li class="flex items-start gap-3 leading-relaxed"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0"></span><span>${formatInline(itemText)}</span></li>`
      );
      continue;
    }

    // Normal paragraph
    if (inList) {
      htmlParts.push(inList === 'ul' ? '</ul>' : '</ol>');
      inList = null;
    }

    htmlParts.push(
      `<p class="leading-relaxed text-slate-300 font-body mb-5 text-base sm:text-lg">${formatInline(trimmed)}</p>`
    );
  }

  if (inList) {
    htmlParts.push(inList === 'ul' ? '</ul>' : '</ol>');
  }

  return htmlParts.join('\n');
}

/**
 * Replaces inline markdown syntax with styled HTML
 */
function formatInline(text: string): string {
  let res = text;

  // Convert **bold** or __bold__
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  res = res.replace(/__(.*?)__/g, '<strong class="text-white font-semibold">$1</strong>');

  // Convert *italic* or _italic_ (avoiding already replaced tags)
  res = res.replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, '<em class="text-violet-200 italic">$1</em>');
  res = res.replace(/(?<!_)_(!?_)([^_]+)(?<!_)_(?!_)/g, '<em class="text-violet-200 italic">$2</em>');

  // Convert LaTeX math equations $E = mc^2$ into sleek badges
  res = res.replace(/\$([^$]+)\$/g, '<code class="px-2 py-0.5 rounded bg-violet-950/70 border border-violet-500/30 text-cyan-300 font-mono text-xs sm:text-sm">$1</code>');

  // Remove any leftover stray # or * at word boundaries that look like copy-paste artifacts
  res = res.replace(/#\*/g, '').replace(/\*#/g, '').replace(/^\s*#+\s*/, '');

  return res;
}
