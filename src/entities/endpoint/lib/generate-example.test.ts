import { describe, expect, it } from 'vitest';
import type { IOpenApiSchema } from '../types/openapi-types';
import { generateExample } from './generate-example';

describe('generateExample', () => {
  it('should return null when schema is undefined', () => {
    expect(generateExample(undefined)).toBeNull();
  });

  it('should return example if defined', () => {
    const schema: IOpenApiSchema = { example: 'test-example' };
    expect(generateExample(schema)).toBe('test-example');
  });

  it('should return default if defined', () => {
    const schema: IOpenApiSchema = { default: 'test-default' };
    expect(generateExample(schema)).toBe('test-default');
  });

  it('should return first enum value if enum is defined', () => {
    const schema: IOpenApiSchema = { enum: ['a', 'b', 'c'] };
    expect(generateExample(schema)).toBe('a');
  });

  it('should return [Reference] if $ref is present', () => {
    const schema: IOpenApiSchema = { $ref: '#/components/schemas/User' };
    expect(generateExample(schema)).toBe('[Reference]');
  });

  it('should generate object schema example recursively', () => {
    const schema: IOpenApiSchema = {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    };
    expect(generateExample(schema)).toEqual({
      id: 0,
      name: 'string',
    });
  });

  it('should generate array schema example recursively', () => {
    const schema: IOpenApiSchema = {
      type: 'array',
      items: { type: 'string' },
    };
    expect(generateExample(schema)).toEqual(['string']);

    const emptyItemsSchema: IOpenApiSchema = {
      type: 'array',
    };
    expect(generateExample(emptyItemsSchema)).toEqual([]);
  });

  it('should handle primitive types and default to null', () => {
    expect(generateExample({ type: 'string' })).toBe('string');
    expect(generateExample({ type: 'integer' })).toBe(0);
    expect(generateExample({ type: 'number' })).toBe(0);
    expect(generateExample({ type: 'boolean' })).toBe(true);
    expect(generateExample({ type: 'unknown' as any })).toBeNull();
  });
});
