import { describe, expect, it } from 'vitest';
import { detectFormat } from './detect-format';

describe('detectFormat', () => {
  it('should detect valid JSON object', () => {
    const jsonString = '{"openapi": "3.0.0", "info": {"title": "Test API"}}';
    expect(detectFormat(jsonString)).toBe('json');
  });

  it('should detect valid JSON array', () => {
    expect(detectFormat('[1, 2, 3]')).toBe('json');
  });

  it('should detect valid YAML', () => {
    const yamlString = 'openapi: 3.0.0\ninfo:\n  title: Test API\n';
    expect(detectFormat(yamlString)).toBe('yaml');
  });

  it('should return null for empty string', () => {
    expect(detectFormat('')).toBeNull();
  });

  it('should return null for whitespace-only string', () => {
    expect(detectFormat('   \n  ')).toBeNull();
  });

  it('should return null for plain scalar string', () => {
    expect(detectFormat('hello world')).toBeNull();
  });

  it('should return null for a number', () => {
    expect(detectFormat('42')).toBeNull();
  });
});
