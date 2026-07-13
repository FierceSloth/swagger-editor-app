import { describe, expect, it } from 'vitest';
import type { IOpenApiParameter } from '../../types/openapi-types';
import { buildHeaders } from './build-headers';

describe('buildHeaders', () => {
  it('should set Content-Type if provided', () => {
    const headers = buildHeaders({
      parameters: [],
      formData: new FormData(),
      contentType: 'application/json',
    });
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('should filter and set headers from form parameters', () => {
    const parameters: IOpenApiParameter[] = [
      { name: 'X-Test-Header', in: 'header', required: false, schema: { type: 'string' } },
      { name: 'query-param', in: 'query', required: false, schema: { type: 'string' } },
    ];
    const formData = new FormData();
    formData.append('header:X-Test-Header', 'hello');
    formData.append('query:query-param', 'world');

    const headers = buildHeaders({ parameters, formData });
    expect(headers.get('X-Test-Header')).toBe('hello');
    expect(headers.get('query-param')).toBeNull();
  });
});
