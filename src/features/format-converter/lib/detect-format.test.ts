import { describe, expect, it } from 'vitest';
import { detectFormat } from './detect-format';

describe('detectFormat', () => {
  it('should detect valid JSON', () => {
    const jsonString = '{"openapi": "3.0.0", "info": {"title": "Test API"}}';
    expect(detectFormat(jsonString)).toBe('json');
  });

  it('should detect valid YAML', () => {
    const yamlString = 'openapi: 3.0.0\ninfo:\n  title: Test API\n';
    expect(detectFormat(yamlString)).toBe('yaml');
  });

  it('should handle invalid string as unknown', () => {
    const invalidString = 'openapi "3.0.0" \n : \n invalid syntax';
    expect(detectFormat(invalidString)).toBe('unknown');
  });

  it('should handle empty string as unknown', () => {
    expect(detectFormat('')).not.toBe('json');
  });
});
