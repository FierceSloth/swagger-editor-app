import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthForm } from './auth-form';
import { signInWithPassword, signUp } from '@/features/auth/model/action';

vi.mock('@/shared/config/i18n/navigation', () => ({
  Link: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

vi.mock('@/features/auth/model/action', () => ({
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
}));

describe('AuthForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Login Mode', () => {
    it('should render all login form controls', () => {
      render(<AuthForm variant="login" />);

      expect(screen.getByRole('heading', { name: 'Login.title' })).toBeInTheDocument();
      expect(screen.getByText('Login.subtitle')).toBeInTheDocument();
      expect(screen.getByLabelText('Login.emailLabel')).toBeInTheDocument();
      expect(screen.getByLabelText('Login.passcodeLabel')).toBeInTheDocument();
      expect(screen.queryByLabelText('Register.confirmPasscodeLabel')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Login.submitButton/i })).toBeInTheDocument();
    });

    it('should display validation errors for invalid inputs', async () => {
      const user = userEvent.setup();
      render(<AuthForm variant="login" />);

      const emailInput = screen.getByLabelText('Login.emailLabel');
      const passwordInput = screen.getByLabelText('Login.passcodeLabel');

      await user.type(emailInput, 'invalid-email');
      await user.type(passwordInput, 'short');

      expect(await screen.findByText('Login.errors.invalidEmail')).toBeInTheDocument();
      expect(await screen.findByText('Login.errors.passwordMinLength')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Login.submitButton/i })).toBeDisabled();
    });

    it('should display specific password regex validation errors', async () => {
      const user = userEvent.setup();
      render(<AuthForm variant="login" />);

      const passwordInput = screen.getByLabelText('Login.passcodeLabel');

      await user.type(passwordInput, '12345678');
      expect(await screen.findByText('Login.errors.passwordNeedLetter')).toBeInTheDocument();

      await user.clear(passwordInput);
      await user.type(passwordInput, 'abcdefgh');
      expect(await screen.findByText('Login.errors.passwordNeedNumber')).toBeInTheDocument();

      await user.clear(passwordInput);
      await user.type(passwordInput, 'abcdefg1');
      expect(await screen.findByText('Login.errors.passwordNeedSpecial')).toBeInTheDocument();
    });

    it('should call signInWithPassword on successful submit', async () => {
      const user = userEvent.setup();
      vi.mocked(signInWithPassword).mockResolvedValue(undefined);

      render(<AuthForm variant="login" />);

      await user.type(screen.getByLabelText('Login.emailLabel'), 'test@domain.com');
      await user.type(screen.getByLabelText('Login.passcodeLabel'), 'ValidPass123!');

      const submitButton = screen.getByRole('button', { name: /Login.submitButton/i });
      expect(submitButton).toBeEnabled();

      await user.click(submitButton);

      await waitFor(() => {
        expect(signInWithPassword).toHaveBeenCalledOnce();
      });
    });

    it('should display server error if signInWithPassword fails', async () => {
      const user = userEvent.setup();
      vi.mocked(signInWithPassword).mockResolvedValue({ error: 'invalidCredentials' });

      render(<AuthForm variant="login" />);

      await user.type(screen.getByLabelText('Login.emailLabel'), 'test@domain.com');
      await user.type(screen.getByLabelText('Login.passcodeLabel'), 'ValidPass123!');

      await user.click(screen.getByRole('button', { name: /Login.submitButton/i }));

      expect(await screen.findByText('Login.errors.invalidCredentials')).toBeInTheDocument();
    });
  });

  describe('Register Mode', () => {
    it('should render all register form controls including confirm passcode', () => {
      render(<AuthForm variant="register" />);

      expect(screen.getByRole('heading', { name: 'Register.title' })).toBeInTheDocument();
      expect(screen.getByLabelText('Register.confirmPasscodeLabel')).toBeInTheDocument();
    });

    it('should validate password mismatch', async () => {
      const user = userEvent.setup();
      render(<AuthForm variant="register" />);

      await user.type(screen.getByLabelText('Register.emailLabel'), 'test@domain.com');
      await user.type(screen.getByLabelText('Register.passcodeLabel'), 'ValidPass123!');
      await user.type(screen.getByLabelText('Register.confirmPasscodeLabel'), 'DifferentPass123!');

      expect(await screen.findByText('Register.errors.passcodeMismatch')).toBeInTheDocument();
    });

    it('should call signUp on successful submit', async () => {
      const user = userEvent.setup();
      vi.mocked(signUp).mockResolvedValue(undefined);

      render(<AuthForm variant="register" />);

      await user.type(screen.getByLabelText('Register.emailLabel'), 'test@domain.com');
      await user.type(screen.getByLabelText('Register.passcodeLabel'), 'ValidPass123!');
      await user.type(screen.getByLabelText('Register.confirmPasscodeLabel'), 'ValidPass123!');

      const submitButton = screen.getByRole('button', { name: /Register.submitButton/i });
      expect(submitButton).toBeEnabled();

      await user.click(submitButton);

      await waitFor(() => {
        expect(signUp).toHaveBeenCalledOnce();
      });
    });
  });
});
