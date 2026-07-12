/* eslint-disable @typescript-eslint/unbound-method */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { updateSession } from './middleware';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}));

vi.mock('next/server', () => {
  const MockNextResponse = {
    redirect: vi.fn().mockImplementation((url) => ({
      status: 307,
      headers: { get: () => url.pathname },
      url: url.pathname,
    })),
  };
  return {
    NextResponse: MockNextResponse,
  };
});

describe('updateSession middleware', () => {
  const mockGetClaims = vi.fn();
  const mockSupabase = {
    auth: {
      getClaims: mockGetClaims,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerClient).mockReturnValue(mockSupabase as any);
  });

  const createMockRequest = (pathname: string) => {
    const nextUrl = {
      pathname,
      clone() {
        return {
          pathname,
          replace(from: string, to: string) {
            this.pathname = this.pathname.replace(from, to);
            return this;
          },
        };
      },
    };
    return {
      cookies: {
        getAll: vi.fn().mockReturnValue([]),
        set: vi.fn(),
      },
      nextUrl,
    } as any;
  };

  const createMockResponse = () => {
    return {
      cookies: {
        set: vi.fn(),
      },
    } as any;
  };

  it('should redirect unauthenticated user from protected history path to home', async () => {
    mockGetClaims.mockResolvedValue({ data: null, error: new Error('No session') });
    const request = createMockRequest('/en/history');
    const response = createMockResponse();

    const result = await updateSession(request, response);

    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(result.url).toBe('/en/home');
  });

  it('should allow authenticated user to access protected history path', async () => {
    mockGetClaims.mockResolvedValue({ data: { claims: { id: 'user-123' } }, error: null });
    const request = createMockRequest('/en/history');
    const response = createMockResponse();

    const result = await updateSession(request, response);

    expect(NextResponse.redirect).not.toHaveBeenCalled();
    expect(result).toBe(response);
  });

  it('should redirect authenticated user from auth login path to home', async () => {
    mockGetClaims.mockResolvedValue({ data: { claims: { id: 'user-123' } }, error: null });
    const request = createMockRequest('/en/login');
    const response = createMockResponse();

    const result = await updateSession(request, response);

    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(result.url).toBe('/en/home');
  });

  it('should allow unauthenticated user to access auth login path', async () => {
    mockGetClaims.mockResolvedValue({ data: null, error: new Error('No session') });
    const request = createMockRequest('/en/login');
    const response = createMockResponse();

    const result = await updateSession(request, response);

    expect(NextResponse.redirect).not.toHaveBeenCalled();
    expect(result).toBe(response);
  });

  it('should trigger cookies setAll when cookies are set', async () => {
    mockGetClaims.mockResolvedValue({ data: null, error: null });
    let setAllCb: any = null;
    vi.mocked(createServerClient).mockImplementation((_url, _key, options: any) => {
      setAllCb = options.cookies.setAll;
      return mockSupabase as any;
    });

    const request = createMockRequest('/en/home');
    const response = createMockResponse();

    await updateSession(request, response);

    expect(setAllCb).toBeDefined();
    setAllCb([{ name: 'test-cookie', value: 'val', options: { path: '/' } }]);

    expect(request.cookies.set).toHaveBeenCalledWith('test-cookie', 'val');
    expect(response.cookies.set).toHaveBeenCalledWith('test-cookie', 'val', { path: '/' });
  });
});
