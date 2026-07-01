import type { DataFormat } from '@/shared/types/format';
import yaml from 'yaml';

export function convertToJson(text: string): string | null {
  try {
    const jsObject = yaml.parse(text) as unknown;
    if (typeof jsObject !== 'object' || jsObject === null) return null;
    return JSON.stringify(jsObject, null, 2);
  } catch {
    return null;
  }
}

export function convertToYaml(text: string): string | null {
  try {
    const jsObject = yaml.parse(text) as unknown;
    if (typeof jsObject !== 'object' || jsObject === null) return null;
    return yaml.stringify(jsObject);
  } catch {
    return null;
  }
}

export function convertFormat(text: string, targetFormat: DataFormat): string | null {
  return targetFormat === 'json' ? convertToJson(text) : convertToYaml(text);
}
