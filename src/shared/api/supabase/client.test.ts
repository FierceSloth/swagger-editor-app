import { describe, expect, it, vi } from 'vitest';
import { createClient } from './client';
import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/shared/config/env';

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(),
}));

describe('Supabase Browser Client', () => {
  it('should call createBrowserClient with environment configuration', () => {
    createClient();
    expect(createBrowserClient).toHaveBeenCalledWith(env.supabaseUrl, env.supabasePublishableKey);
  });
});
