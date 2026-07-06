import type { DetectedFormat } from '@/shared/types/format';
import { parseToObject } from '@/shared/lib/parse-to-object';

export function detectFormat(text: string): DetectedFormat {
  if (!text.trim()) return null;

  try {
    const parsed = JSON.parse(text) as unknown;
    if (typeof parsed === 'object' && parsed !== null) {
      return 'json';
    }
  } catch {
    // not JSON
  }

  if (parseToObject(text) !== null) {
    return 'yaml';
  }

  return null;
}
