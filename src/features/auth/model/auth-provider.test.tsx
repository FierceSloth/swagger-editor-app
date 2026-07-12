import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './auth-provider';
import { createClient } from '@/shared/api/supabase/client';
import type { User } from '@supabase/supabase-js';

vi.mock('@/shared/api/supabase/client', () => ({
  createClient: vi.fn(),
}));

describe('AuthProvider & useAuth', () => {
  const mockUnsubscribe = vi.fn();
  let authStateCallback: (_event: string, session: any) => void;

  const mockSupabase = {
    auth: {
      onAuthStateChange: vi.fn().mockImplementation((cb) => {
        authStateCallback = cb;
        return {
          data: {
            subscription: {
              unsubscribe: mockUnsubscribe,
            },
          },
        };
      }),
    },
  };

  const TestComponent = () => {
    const { user } = useAuth();
    return (
      <div>
        <span data-testid="user-email">{user ? user.email : 'no user'}</span>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createClient).mockReturnValue(mockSupabase as any);
  });

  it('should provide initial user session', () => {
    const initialUser = { email: 'initial@example.com' } as User;

    render(
      <AuthProvider initialUser={initialUser}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-email')).toHaveTextContent('initial@example.com');
  });

  it('should update user session when auth state changes', () => {
    render(
      <AuthProvider initialUser={null}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-email')).toHaveTextContent('no user');

    const updatedUser = { email: 'updated@example.com' } as User;
    act(() => {
      authStateCallback('SIGNED_IN', { user: updatedUser });
    });

    expect(screen.getByTestId('user-email')).toHaveTextContent('updated@example.com');

    act(() => {
      authStateCallback('SIGNED_OUT', null);
    });

    expect(screen.getByTestId('user-email')).toHaveTextContent('no user');
  });

  it('should unsubscribe from auth state listener on unmount', () => {
    const { unmount } = render(
      <AuthProvider initialUser={null}>
        <TestComponent />
      </AuthProvider>
    );

    expect(mockUnsubscribe).not.toHaveBeenCalled();

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledOnce();
  });

  it('should throw error when useAuth is called outside of AuthProvider', () => {
    const renderWithError = () => {
      render(<TestComponent />);
    };

    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(renderWithError).toThrow('useAuth must be used within an AuthProvider');
  });
});
