import { describe, expect, it } from 'vitest';
import { groupEndpoints } from './group-endpoints';

describe('groupEndpoints', () => {
  it('should group paths by their first segment', () => {
    const paths = {
      '/auth/initialize': { post: { summary: 'Start biometric uplink' } },
      '/identity/verify': { get: { summary: 'Check credential status' } },
      '/identity/revoke': { delete: { summary: 'Purge identity' } },
    };

    const result = groupEndpoints(paths);

    expect(result).toEqual({
      auth: {
        '/auth/initialize': { post: { summary: 'Start biometric uplink' } },
      },
      identity: {
        '/identity/verify': { get: { summary: 'Check credential status' } },
        '/identity/revoke': { delete: { summary: 'Purge identity' } },
      },
    });
  });

  it('should put root path "/" into "default" group', () => {
    const paths = {
      '/': { get: {} },
    };

    const result = groupEndpoints(paths);

    expect(result).toEqual({
      default: {
        '/': { get: {} },
      },
    });
  });

  it('should handle empty paths object', () => {
    const result = groupEndpoints({});
    expect(result).toEqual({});
  });
});
