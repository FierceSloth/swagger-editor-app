import yaml from 'yaml';

export function parseToObject(text: string): Record<string, unknown> | null {
  try {
    const parsed = yaml.parse(text) as unknown;
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // not valid YAML/JSON
  }

  return null;
}
