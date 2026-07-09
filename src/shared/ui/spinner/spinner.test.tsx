import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Spinner } from './spinner';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(() =>
    Promise.resolve((key: string) => {
      const messages: Record<string, string> = {
        label: 'Loading...',
      };
      return messages[key] ?? key;
    })
  ),
}));

describe('Spinner', () => {
  it('renders label', async () => {
    render(await Spinner());

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders spinner', async () => {
    render(await Spinner());

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
