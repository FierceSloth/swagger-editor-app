import { describe, expect, it } from 'vitest';
import { convertFormat, convertToJson, convertToYaml } from './convert-format';

describe('Format Converter Utilities', () => {
  const jsonMock = JSON.stringify(
    {
      openapi: '3.0.0',
      info: { title: 'Test API' },
      servers: [{ url: 'https://api.example.com' }],
    },
    null,
    2
  );

  const yamlMock = `openapi: 3.0.0\ninfo:\n  title: Test API\nservers:\n  - url: https://api.example.com\n`;

  describe('convertToJson', () => {
    it('should correctly convert YAML to JSON string', () => {
      const result = convertToJson(yamlMock);
      expect(result).toBe(jsonMock);
    });

    it('should return null for invalid YAML input', () => {
      const invalidYaml = 'key: value\n : : : invalid';
      expect(convertToJson(invalidYaml)).toBeNull();
    });
  });

  describe('convertToYaml', () => {
    it('should correctly convert JSON to YAML string', () => {
      const result = convertToYaml(jsonMock);
      expect(result).toBe(yamlMock);
    });

    it('should return null for invalid JSON input', () => {
      const invalidJson = '{"key": "value", }';
      expect(convertToYaml(invalidJson)).toBeNull();
    });
  });

  describe('convertFormat', () => {
    it('should wrap convertToYaml when target is yaml', () => {
      expect(convertFormat(jsonMock, 'yaml')).toBe(yamlMock);
    });

    it('should wrap convertToJson when target is json', () => {
      expect(convertFormat(yamlMock, 'json')).toBe(jsonMock);
    });
  });
});
