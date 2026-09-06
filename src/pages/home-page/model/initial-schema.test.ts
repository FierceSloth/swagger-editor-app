import { DiagnosticSeverity } from '@stoplight/types';
import { describe, expect, it } from 'vitest';
import { validateSchema } from '@/features/schema-validator/lib/validate-schema';
import { parseToObject } from '@/shared/lib/parse-to-object';
import { INITIAL_SCHEMA } from './initial-schema';

describe('INITIAL_SCHEMA', () => {
  it('should parse to a valid object with openapi, info, and paths', () => {
    const parsed = parseToObject(INITIAL_SCHEMA);
    expect(parsed).not.toBeNull();
    expect(parsed).toHaveProperty('openapi');
    expect(parsed).toHaveProperty('info');
    expect(parsed).toHaveProperty('paths');
  });

  it('should pass Spectral validation with zero errors', async () => {
    const results = await validateSchema(INITIAL_SCHEMA);
    const errors = results.filter((r) => r.severity === DiagnosticSeverity.Error);
    expect(errors).toHaveLength(0);
  });
});
