import yaml from 'yaml';

export function detectFormat(text: string): 'json' | 'yaml' | 'unknown' {
  try {
    const parsed = JSON.parse(text) as object | null;
    if (typeof parsed === 'object' && parsed !== null) {
      return 'json';
    }
  } catch {
    // ignore
  }

  try {
    yaml.parse(text);
    return 'yaml';
  } catch {
    return 'unknown';
  }
}
