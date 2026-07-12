import { describe, expect, it, vi } from 'vitest';
import { getCurrentUser } from './get-current-user';
import { createClient } from './server';

vi.mock('./server', () => ({
  createClient: vi.fn(),
}));

describe('getCurrentUser', () => {
  it('should return null when getClaims returns an error', async () => {
    const mockSupabase = {
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Auth error'),
        }),
      },
    };
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();
    expect(result).toBeNull();
  });

  it('should return null when getClaims has no claims in data', async () => {
    const mockSupabase = {
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: { claims: null },
          error: null,
        }),
      },
    };
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();
    expect(result).toBeNull();
  });

  it('should return user object when getClaims succeeds', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockSupabase = {
      auth: {
        getClaims: vi.fn().mockResolvedValue({
          data: { claims: mockUser },
          error: null,
        }),
      },
    };
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();
    expect(result).toEqual(mockUser);
  });
});
