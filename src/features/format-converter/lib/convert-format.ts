import yaml from 'yaml';

export function convertToJson(text: string): string | null {
  try {
    const jsObject = yaml.parse(text) as unknown;
    return JSON.stringify(jsObject, null, 2);
  } catch {
    return null;
  }
}

export function convertToYaml(text: string): string | null {
  try {
    const jsObject = JSON.parse(text) as unknown;
    return yaml.stringify(jsObject);
  } catch {
    return null;
  }
}

export function convertFormat(text: string, targetFormat: 'json' | 'yaml'): string | null {
  return targetFormat === 'json' ? convertToJson(text) : convertToYaml(text);
}
