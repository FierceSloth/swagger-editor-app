import type { DetectedFormat } from '@/shared/types/format';
import yaml from 'yaml';

export function detectFormat(text: string): DetectedFormat {
  if (!text.trim()) return 'unknown';

  try {
    const parsed = JSON.parse(text) as unknown;
    if (typeof parsed === 'object' && parsed !== null) {
      return 'json';
    }
  } catch {
    // not JSON
  }

  try {
    const parsed = yaml.parse(text) as unknown;
    if (typeof parsed === 'object' && parsed !== null) {
      return 'yaml';
    }
  } catch {
    // not YAML
  }

  return 'unknown';
}
