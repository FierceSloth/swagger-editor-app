import { describe, it, expect } from 'vitest';
import getProxyHeaders from './getProxyHeaders';
import { NextRequest } from 'next/server';

describe('getProxyHeaders', () => {
  it('should exclude prohibited headers and keep allowed headers', () => {
    const request = new NextRequest('https://api.example.com/api/proxy', {
      headers: {
        host: 'api.example.com',
        origin: 'https://mysite.com',
        referer: 'https://mysite.com/home',
        cookie: 'session=123',
        authorization: 'Bearer token',
        'content-length': '100',
        'x-custom-header': 'custom-value',
      },
    });

    const headers = getProxyHeaders(request);

    expect(headers.get('host')).toBeNull();
    expect(headers.get('origin')).toBeNull();
    expect(headers.get('referer')).toBeNull();
    expect(headers.get('cookie')).toBeNull();
    expect(headers.get('authorization')).toBeNull();
    expect(headers.get('content-length')).toBeNull();
    expect(headers.get('x-custom-header')).toBe('custom-value');
  });
});
