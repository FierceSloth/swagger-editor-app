import { DiagnosticSeverity } from '@stoplight/types';
import { describe, expect, it } from 'vitest';
import { validateSchema } from './validate-schema';

describe('validateSchema', () => {
  it('should return empty array for valid OpenAPI 3.0 schema', async () => {
    const validYaml = `
openapi: 3.0.0
info:
  title: Test API
  version: 1.0.0
paths: {}
`;
    const results = await validateSchema(validYaml);

    const errors = results.filter((r) => r.severity === DiagnosticSeverity.Error);
    expect(errors).toHaveLength(0);
  });

  it('should return errors for invalid schema (missing info)', async () => {
    const invalidYaml = `
openapi: 3.0.0
paths: {}
`;
    const results = await validateSchema(invalidYaml);
    const errors = results.filter((r) => r.severity === DiagnosticSeverity.Error);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => String(e.message).includes('info'))).toBe(true);
  });

  it('should return empty array for empty string', async () => {
    const results = await validateSchema('   ');
    expect(results).toEqual([]);
  });

  it('should return parsing error for malformed YAML', async () => {
    const malformedYaml = `
openapi: 3.0.0
  info:
   title: Test API
    version: 1.0.0
`;
    const results = await validateSchema(malformedYaml);
    const errors = results.filter((r) => r.severity === DiagnosticSeverity.Error);

    expect(errors.length).toBeGreaterThan(0);
  });
});
