import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../../../../messages/en.json';
import { EmptyHistoryMessage } from './empty-history-message';

vi.mock('next-intl/server', () => ({
  getTranslations: (namespace: string) => {
    const section = (messages as Record<string, any>)[namespace] || {};
    return Promise.resolve((key: string) => section[key] || key);
  },
}));

describe('EmptyHistoryMessage Component', () => {
  it('should render correct empty history title and description', async () => {
    const Resolved = await EmptyHistoryMessage();
    render(Resolved);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(messages.History.emptyTitle);
    expect(screen.getByText(messages.History.emptyDescription)).toBeInTheDocument();
  });
});
