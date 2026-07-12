import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createClient } from './server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/shared/config/env';

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

describe('Supabase Server Client', () => {
  const mockCookieStore = {
    getAll: vi.fn(),
    set: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cookies).mockResolvedValue(mockCookieStore as any);
  });

  it('should initialize server client with cookies option methods', async () => {
    let capturedOptions: any = null;
    vi.mocked(createServerClient).mockImplementation((_url, _key, options: any) => {
      capturedOptions = options;
      return {} as any;
    });

    await createClient();

    expect(createServerClient).toHaveBeenCalledWith(env.supabaseUrl, env.supabasePublishableKey, expect.any(Object));

    mockCookieStore.getAll.mockReturnValue([{ name: 'session', value: 'xyz' }]);
    const getResult = capturedOptions.cookies.getAll();
    expect(mockCookieStore.getAll).toHaveBeenCalled();
    expect(getResult).toEqual([{ name: 'session', value: 'xyz' }]);

    capturedOptions.cookies.setAll([{ name: 'session-2', value: 'abc', options: { path: '/' } }]);
    expect(mockCookieStore.set).toHaveBeenCalledWith('session-2', 'abc', { path: '/' });
  });

  it('should swallow cookies setting errors silently', async () => {
    let capturedOptions: any = null;
    vi.mocked(createServerClient).mockImplementation((_url, _key, options: any) => {
      capturedOptions = options;
      return {} as any;
    });

    await createClient();

    mockCookieStore.set.mockImplementation(() => {
      throw new Error('Forbidden header settings');
    });

    expect(() => {
      capturedOptions.cookies.setAll([{ name: 'session-2', value: 'abc', options: { path: '/' } }]);
    }).not.toThrow();
  });
});
