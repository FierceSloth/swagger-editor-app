import { describe, expect, it } from 'vitest';
import { convertFormat, convertToJson, convertToYaml } from './convert-format';

describe('convertToJson', () => {
  it('should convert YAML to formatted JSON', () => {
    const yaml = 'openapi: 3.0.0\ninfo:\n  title: Test API\n';
    const result = convertToJson(yaml) as string;
    const parsed = JSON.parse(result) as Record<string, unknown>;
    expect(parsed).toEqual({ openapi: '3.0.0', info: { title: 'Test API' } });
  });

  it('should convert JSON to formatted JSON (idempotent)', () => {
    const json = '{"openapi":"3.0.0"}';
    const result = convertToJson(json);
    expect(result).toBe(JSON.stringify({ openapi: '3.0.0' }, null, 2));
  });

  it('should return null for plain scalar text', () => {
    expect(convertToJson('hello world')).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(convertToJson('')).toBeNull();
  });
});

describe('convertToYaml', () => {
  it('should convert JSON to YAML', () => {
    const json = '{"openapi":"3.0.0","info":{"title":"Test API"}}';
    const result = convertToYaml(json);
    expect(result).toContain('openapi: 3.0.0');
    expect(result).toContain('title: Test API');
  });

  it('should convert YAML to YAML (idempotent)', () => {
    const yaml = 'openapi: 3.0.0\ninfo:\n  title: Test API\n';
    const result = convertToYaml(yaml);
    expect(result).toContain('openapi: 3.0.0');
  });

  it('should handle arrays', () => {
    const json = '{"servers":[{"url":"https://api.example.com"}]}';
    const result = convertToYaml(json);
    expect(result).toContain('- url: https://api.example.com');
  });

  it('should return null for plain scalar text', () => {
    expect(convertToYaml('hello world')).toBeNull();
  });
});

describe('convertFormat', () => {
  const yamlInput = 'openapi: 3.0.0\ninfo:\n  title: Test API\n';
  const jsonInput = '{"openapi":"3.0.0","info":{"title":"Test API"}}';

  it('should convert to json when target is json', () => {
    const result = convertFormat(yamlInput, 'json') as string;
    const parsed = JSON.parse(result) as Record<string, unknown>;
    expect(parsed).toEqual({ openapi: '3.0.0', info: { title: 'Test API' } });
  });

  it('should convert to yaml when target is yaml', () => {
    const result = convertFormat(jsonInput, 'yaml');
    expect(result).toContain('openapi: 3.0.0');
  });

  it('should round-trip without data loss', () => {
    const original = { openapi: '3.0.0', info: { title: 'Test' }, servers: [{ url: 'https://example.com' }] };
    const json = JSON.stringify(original);
    const yaml = convertFormat(json, 'yaml') as string;
    const backToJson = convertFormat(yaml, 'json') as string;
    expect(JSON.parse(backToJson)).toEqual(original);
  });
});
