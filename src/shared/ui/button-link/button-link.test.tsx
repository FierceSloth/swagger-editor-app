import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ButtonLink } from './button-link';

vi.mock('@/shared/config/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    className,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

describe('ButtonLink Component', () => {
  it('should render children correctly', () => {
    render(<ButtonLink href="/about">About</ButtonLink>);

    const linkElement = screen.getByRole('link', { name: /about/i });

    expect(linkElement).toBeInTheDocument();
  });

  it('should have correct href attribute', () => {
    render(<ButtonLink href="/login">Sign In</ButtonLink>);

    const linkElement = screen.getByRole('link', { name: /sign in/i });

    expect(linkElement).toHaveAttribute('href', '/login');
  });

  it('should call onClick handler when clicked', async () => {
    const onClickMock = vi.fn();
    const user = userEvent.setup();

    render(
      <ButtonLink href="/register" onClick={onClickMock}>
        Sign Up
      </ButtonLink>
    );

    const linkElement = screen.getByRole('link', { name: /sign up/i });

    await user.click(linkElement);

    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it('should apply additional className', () => {
    render(
      <ButtonLink href="/about" className="custom-class">
        About
      </ButtonLink>
    );

    const linkElement = screen.getByRole('link', { name: /about/i });

    expect(linkElement).toHaveClass('custom-class');
  });
});
