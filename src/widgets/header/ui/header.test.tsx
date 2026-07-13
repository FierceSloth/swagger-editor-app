/* eslint-disable @next/next/no-img-element */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { getCurrentUser } from '@/shared/api/supabase';

vi.mock('@/shared/config/i18n/navigation', () => ({
  Link: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: (namespace: string) => Promise.resolve((key: string) => `${namespace}.${key}`),
}));

vi.mock('@/shared/api/supabase', () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock('@/features/language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="lang-switcher">LanguageSwitcher</div>,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => <img src={src} alt={alt} width={width} height={height} />,
}));

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render public navigation when user is not authenticated', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);

    const resolvedComponent = await Header();
    render(resolvedComponent);

    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Header.about' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Header.signIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Header.signUp' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Header.history' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Header.signOut' })).not.toBeInTheDocument();
  });

  it('should render private navigation when user is authenticated', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({ id: 'user-123', email: 'user@example.com' } as any);

    const resolvedComponent = await Header();
    render(resolvedComponent);

    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Header.about' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Header.signIn' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Header.signUp' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Header.history' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Header.signOut' })).toBeInTheDocument();
  });
});
