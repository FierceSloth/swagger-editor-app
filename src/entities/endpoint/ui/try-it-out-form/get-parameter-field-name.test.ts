import { describe, expect, it } from 'vitest';
import type { IOpenApiParameter } from '../../types/openapi-types';
import { getParameterFieldName } from './get-parameter-field-name';

describe('getParameterFieldName', () => {
  it('should return combined field name prefix with parameter source', () => {
    const param: IOpenApiParameter = {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' },
    };
    expect(getParameterFieldName(param)).toBe('path:id');
  });
});
