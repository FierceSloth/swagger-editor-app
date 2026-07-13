import { describe, expect, it } from 'vitest';
import type { IOpenApiParameter } from '../../types/openapi-types';
import { buildUrl } from './build-url';

describe('buildUrl', () => {
  it('should throw an error if serverUrl is missing', () => {
    expect(() =>
      buildUrl({
        serverUrl: '',
        path: '/users',
        parameters: [],
        formData: new FormData(),
      })
    ).toThrow('Server URL is missing');
  });

  it('should format URL with query and path parameters correctly', () => {
    const parameters: IOpenApiParameter[] = [
      { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
      { name: 'role', in: 'query', required: false, schema: { type: 'string' } },
    ];
    const formData = new FormData();
    formData.append('path:userId', '123');
    formData.append('query:role', 'admin');

    const result = buildUrl({
      serverUrl: 'https://api.example.com/',
      path: '/users/{userId}/details',
      parameters,
      formData,
    });

    expect(result).toBe('https://api.example.com/users/123/details?role=admin');
  });

  it('should handle paths not starting with a slash', () => {
    const result = buildUrl({
      serverUrl: 'https://api.example.com',
      path: 'users',
      parameters: [],
      formData: new FormData(),
    });

    expect(result).toBe('https://api.example.com/users');
  });
});
