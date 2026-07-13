import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { HistoryItem } from '@/features/history/api/history';
import { HistoryRequestCard } from './history-request-card';

const mockItemSuccess: HistoryItem = {
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
};

const mockItemError: HistoryItem = {
  id: 2,
  user_id: 'user-1',
  method: 'GET',
  url: '/identity/verify/usr_99x',
  status: 500,
  duration: 800,
  timestamp: '2026-06-24T18:45:00.000Z',
  request_size: 0,
  response_size: 52,
  error_details: 'Internal Server Error',
};

describe('HistoryRequestCard Component', () => {
  it('should render success request card details correctly without error section', () => {
    render(<HistoryRequestCard item={mockItemSuccess} />);

    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('/auth/initialize')).toBeInTheDocument();
    expect(screen.getByText('200 OK')).toBeInTheDocument();
    expect(screen.getByText('1.2s')).toBeInTheDocument();
    expect(screen.getByText(/Req:\s+256 B/)).toBeInTheDocument();
    expect(screen.getByText(/Res:\s+1.4 KB/)).toBeInTheDocument();
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
  });

  it('should render error request card details correctly with error section', () => {
    render(<HistoryRequestCard item={mockItemError} />);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('/identity/verify/usr_99x')).toBeInTheDocument();
    expect(screen.getByText('500 ERR')).toBeInTheDocument();
    expect(screen.getByText('800ms')).toBeInTheDocument();
    expect(screen.getByText(/Req:\s+0 B/)).toBeInTheDocument();
    expect(screen.getByText(/Res:\s+52 B/)).toBeInTheDocument();
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
  });
});
