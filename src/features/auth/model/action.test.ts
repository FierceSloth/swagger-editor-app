import { describe, expect, it, vi, beforeEach } from 'vitest';
import { signInWithPassword, signUp, signOut } from './action';
import { createClient } from '@/shared/api/supabase/server';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

vi.mock('@/shared/api/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Auth Actions', () => {
  const mockSupabase = {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);
  });

  describe('signInWithPassword', () => {
    it('should sign in successfully and redirect to home', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: {}, error: null });
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'Password123!');

      await signInWithPassword(formData);

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
      });
      expect(redirect).toHaveBeenCalledWith(ROUTES.HOME);
    });

    it('should handle invalid credentials error', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {},
        error: { code: 'invalid_credentials', message: 'Invalid credentials' },
      });
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'Password123!');

      const result = await signInWithPassword(formData);

      expect(result).toEqual({ error: 'invalidCredentials' });
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should handle rate limit error', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {},
        error: { code: 'over_request_rate_limit', message: 'Rate limit exceeded' },
      });
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'Password123!');

      const result = await signInWithPassword(formData);

      expect(result).toEqual({ error: 'tooManyRequests' });
    });

    it('should handle unknown error', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {},
        error: { code: 'some_other_code', message: 'Some random error' },
      });
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      formData.append('password', 'Password123!');

      const result = await signInWithPassword(formData);

      expect(result).toEqual({ error: 'unknownError' });
    });
  });

  describe('signUp', () => {
    it('should sign up successfully and redirect to home', async () => {
      mockSupabase.auth.signUp.mockResolvedValue({ data: {}, error: null });
      const formData = new FormData();
      formData.append('email', 'new@example.com');
      formData.append('password', 'Password123!');

      await signUp(formData);

      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'Password123!',
      });
      expect(redirect).toHaveBeenCalledWith(ROUTES.HOME);
    });

    it('should handle user already exists error from code', async () => {
      mockSupabase.auth.signUp.mockResolvedValue({
        data: {},
        error: { code: 'user_already_exists', message: 'User exists' },
      });
      const formData = new FormData();
      formData.append('email', 'existing@example.com');
      formData.append('password', 'Password123!');

      const result = await signUp(formData);

      expect(result).toEqual({ error: 'userAlreadyExists' });
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should handle user already registered error from message text', async () => {
      mockSupabase.auth.signUp.mockResolvedValue({
        data: {},
        error: { code: undefined, message: 'Email is already registered' },
      });
      const formData = new FormData();
      formData.append('email', 'existing@example.com');
      formData.append('password', 'Password123!');

      const result = await signUp(formData);

      expect(result).toEqual({ error: 'userAlreadyExists' });
    });
  });

  describe('signOut', () => {
    it('should sign out and redirect to login', async () => {
      mockSupabase.auth.signOut.mockResolvedValue({ error: null });

      await signOut();

      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });
});
