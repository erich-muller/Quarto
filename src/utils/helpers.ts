/**
 * Helpers para formatação e utilitários do site Quarto Analytics
 */

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  // Remove marcações HTML / Markdown
  const cleanText = content.replace(/<[^>]*>?/gm, '').replace(/[#*`_\[\]()]/g, '');
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

