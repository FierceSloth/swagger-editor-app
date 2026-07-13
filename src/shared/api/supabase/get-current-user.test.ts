import { describe, expect, it, vi } from 'vitest';
import { getCurrentUser } from './get-current-user';
import { createClient } from './server';

vi.mock('./server', () => ({
  createClient: vi.fn(),
}));

describe('getCurrentUser', () => {
  it('should return null when getUser returns an error', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: new Error('Auth error'),
        }),
      },
    };
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();
    expect(result).toBeNull();
  });

  it('should return null when getUser has no user in data', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: null,
        }),
      },
    };
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();
    expect(result).toBeNull();
  });

  it('should return user object when getUser succeeds', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: mockUser },
          error: null,
        }),
      },
    };
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();
    expect(result).toEqual(mockUser);
  });
});
