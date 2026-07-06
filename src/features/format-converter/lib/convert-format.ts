import type { DataFormat } from '@/shared/types/format';
import { parseToObject } from '@/shared/lib/parse-to-object';
import yaml from 'yaml';

export function convertToJson(text: string): string | null {
  const jsObject = parseToObject(text);
  if (jsObject === null) return null;

  return JSON.stringify(jsObject, null, 2);
}

export function convertToYaml(text: string): string | null {
  const jsObject = parseToObject(text);
  if (jsObject === null) return null;

  return yaml.stringify(jsObject);
}

export function convertFormat(text: string, targetFormat: DataFormat): string | null {
  return targetFormat === 'json' ? convertToJson(text) : convertToYaml(text);
}
