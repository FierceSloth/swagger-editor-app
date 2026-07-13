import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../../../messages/en.json';
import type { HistoryItem } from '@/features/history/api/history';
import { HistoryPage } from './history-page';

vi.mock('next-intl/server', () => ({
  getTranslations: (namespace: string) => {
    const section = (messages as Record<string, any>)[namespace] || {};
    return Promise.resolve((key: string) => section[key] || key);
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

vi.mock('./history-intro/history-intro', () => ({
  HistoryIntro: () => <div data-testid="history-intro" />,
}));

vi.mock('./empty-history-message/empty-history-message', () => ({
  EmptyHistoryMessage: () => <div data-testid="empty-history-message" />,
}));

const mockItems: HistoryItem[] = [
  {
    id: 1,
    user_id: 'user-1',
    method: 'POST',
    url: '/auth/initialize',
    status: 200,
    duration: 1200,
    timestamp: '2026-06-24T19:00:00.000Z',
    request_size: 256,
    response_size: 1434,
    error_details: null,
  },
];

describe('HistoryPage Component', () => {
  it('should render empty history message and back link when no items are provided', async () => {
    const Resolved = await HistoryPage({ items: [] });
    render(Resolved);

    expect(screen.getByTestId('empty-history-message')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: messages.History.goToEditor });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('should render page header and request cards when items are provided', async () => {
    const Resolved = await HistoryPage({ items: mockItems });
    render(Resolved);

    expect(screen.getByTestId('history-intro')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('/auth/initialize')).toBeInTheDocument();
    expect(screen.getByText('200 OK')).toBeInTheDocument();
  });
});
