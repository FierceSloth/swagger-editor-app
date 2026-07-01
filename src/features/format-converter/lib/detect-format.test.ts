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

  it('should return unknown for empty string', () => {
    expect(detectFormat('')).toBe('unknown');
  });

  it('should return unknown for whitespace-only string', () => {
    expect(detectFormat('   \n  ')).toBe('unknown');
  });

  it('should return unknown for plain scalar string', () => {
    expect(detectFormat('hello world')).toBe('unknown');
  });

  it('should return unknown for a number', () => {
    expect(detectFormat('42')).toBe('unknown');
  });
});
