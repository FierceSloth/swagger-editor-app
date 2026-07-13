import { describe, expect, it } from 'vitest';
import { groupEndpoints } from './group-endpoints';
import type { IOpenApiPathItem } from '../types/openapi-types';

describe('groupEndpoints', () => {
  it('should group paths by their first segment into a flat array structure', () => {
    const paths: Record<string, IOpenApiPathItem> = {
      '/auth/initialize': { post: { summary: 'Start biometric uplink' } },
      '/identity/verify': { get: { summary: 'Check credential status' } },
      '/identity/revoke': { delete: { summary: 'Purge identity' } },
    };

    const result = groupEndpoints(paths);

    expect(result).toEqual([
      {
        tag: 'auth',
        endpoints: [
          {
            id: 'post-/auth/initialize',
            method: 'post',
            path: '/auth/initialize',
            summary: 'Start biometric uplink',
            details: { summary: 'Start biometric uplink' },
          },
        ],
      },
      {
        tag: 'identity',
        endpoints: [
          {
            id: 'get-/identity/verify',
            method: 'get',
            path: '/identity/verify',
            summary: 'Check credential status',
            details: { summary: 'Check credential status' },
          },
          {
            id: 'delete-/identity/revoke',
            method: 'delete',
            path: '/identity/revoke',
            summary: 'Purge identity',
            details: { summary: 'Purge identity' },
          },
        ],
      },
    ]);
  });

  it('should put root path "/" into "default" group', () => {
    const paths: Record<string, IOpenApiPathItem> = {
      '/': { get: {} },
    };

    const result = groupEndpoints(paths);

    expect(result).toEqual([
      {
        tag: 'default',
        endpoints: [
          {
            id: 'get-/',
            method: 'get',
            path: '/',
            summary: '',
            details: {},
          },
        ],
      },
    ]);
  });

  it('should handle empty paths object', () => {
    const result = groupEndpoints({});
    expect(result).toEqual([]);
  });

  it('should use OpenAPI tags if present', () => {
    const paths: Record<string, IOpenApiPathItem> = {
      '/auth/initialize': {
        post: { summary: '...', tags: ['CustomTag'] },
      },
    };

    const result = groupEndpoints(paths);

    expect(result).toEqual([
      {
        tag: 'CustomTag',
        endpoints: [
          {
            id: 'post-/auth/initialize',
            method: 'post',
            path: '/auth/initialize',
            summary: '...',
            details: { summary: '...', tags: ['CustomTag'] },
          },
        ],
      },
    ]);
  });

  it('should merge and override path-level and operation-level parameters correctly', () => {
    const paths: Record<string, IOpenApiPathItem> = {
      '/test': {
        parameters: [
          { name: 'X-Path-Param', in: 'header', required: true, description: 'Path level' },
          { name: 'override-me', in: 'query', required: false, description: 'Will be overridden' },
        ],
        get: {
          summary: 'Get request',
          parameters: [
            { name: 'override-me', in: 'query', required: true, description: 'Overridden value' },
            { name: 'X-Op-Param', in: 'header', required: false },
          ],
        },
      },
    };

    const result = groupEndpoints(paths);

    expect(result[0].endpoints[0].details.parameters).toEqual([
      { name: 'X-Path-Param', in: 'header', required: true, description: 'Path level' },
      { name: 'override-me', in: 'query', required: true, description: 'Overridden value' },
      { name: 'X-Op-Param', in: 'header', required: false },
    ]);
  });

  it('should return undefined if both path and operation params are empty/undefined', () => {
    const paths: Record<string, IOpenApiPathItem> = {
      '/test': {
        get: {
          summary: 'Get request',
        },
      },
    };

    const result = groupEndpoints(paths);

    expect(result[0].endpoints[0].details.parameters).toBeUndefined();
  });

  it('should return operation params if path params are empty/undefined', () => {
    const paths: Record<string, IOpenApiPathItem> = {
      '/test': {
        get: {
          summary: 'Get request',
          parameters: [{ name: 'X-Op-Param', in: 'header' }],
        },
      },
    };

    const result = groupEndpoints(paths);

    expect(result[0].endpoints[0].details.parameters).toEqual([{ name: 'X-Op-Param', in: 'header' }]);
  });

  it('should return path params if operation params are empty/undefined', () => {
    const paths: Record<string, IOpenApiPathItem> = {
      '/test': {
        parameters: [{ name: 'X-Path-Param', in: 'header' }],
        get: {
          summary: 'Get request',
        },
      },
    };

    const result = groupEndpoints(paths);

    expect(result[0].endpoints[0].details.parameters).toEqual([{ name: 'X-Path-Param', in: 'header' }]);
  });
});
