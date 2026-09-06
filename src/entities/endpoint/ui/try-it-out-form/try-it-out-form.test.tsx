import { fetchViaProxy } from '@/shared/api/proxy-client';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import messages from '../../../../../messages/en.json';
import type { IEndpointItem } from '../../types/openapi-types';
import { TryItOutForm } from './try-it-out-form';

vi.mock('@/shared/api/proxy-client', () => ({
  fetchViaProxy: vi.fn(),
}));

const mockWriteText = vi.fn();
vi.stubGlobal('navigator', {
  clipboard: {
    writeText: mockWriteText,
  },
});

const renderWithTranslations = (ui: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('TryItOutForm Component', () => {
  const endpoint: IEndpointItem = {
    id: 'post-user',
    summary: 'Create user',
    path: '/users/{id}',
    method: 'post',
    details: {
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        { name: 'q', in: 'query', required: false, schema: { type: 'string' } },
        { name: 'X-Token', in: 'header', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        content: {
          'application/json': {
            example: { name: 'Alice' },
          },
        },
      },
      responses: {
        '200': { description: 'Success' },
      },
    },
  };

  const serverUrl = 'https://api.example.com';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the form with parameters and request body default value', () => {
    renderWithTranslations(<TryItOutForm endpoint={endpoint} serverUrl={serverUrl} />);

    expect(screen.getByLabelText('id (path)')).toBeInTheDocument();
    expect(screen.getByLabelText('q (query)')).toBeInTheDocument();
    expect(screen.getByLabelText('X-Token (header)')).toBeInTheDocument();

    const textarea = screen.getByLabelText<HTMLTextAreaElement>(/Request Body/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toContain('Alice');
  });

  it('should submit the form successfully and render the response details', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set('content-type', 'application/json');

    vi.mocked(fetchViaProxy).mockResolvedValueOnce({
      status: 200,
      headers: mockHeaders,
      text: () => Promise.resolve('{"status":"ok"}'),
    } as unknown as Response);

    renderWithTranslations(<TryItOutForm endpoint={endpoint} serverUrl={serverUrl} />);

    fireEvent.change(screen.getByLabelText('id (path)'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('q (query)'), { target: { value: 'search' } });
    fireEvent.change(screen.getByLabelText('X-Token (header)'), { target: { value: 'secret' } });

    fireEvent.submit(screen.getByRole('button', { name: /Execute/i }));

    await waitFor(() => {
      expect(fetchViaProxy).toHaveBeenCalledWith(
        'https://api.example.com/users/123?q=search',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'Alice' }, null, 2),
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Status: 200')).toBeInTheDocument();
      expect(screen.getByText(/"status": "ok"/i)).toBeInTheDocument();
    });
  });

  it('should handle request failure gracefully', async () => {
    vi.mocked(fetchViaProxy).mockRejectedValueOnce(new Error('Network error'));

    renderWithTranslations(<TryItOutForm endpoint={endpoint} serverUrl={serverUrl} />);

    fireEvent.change(screen.getByLabelText('id (path)'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('X-Token (header)'), { target: { value: 'secret' } });

    fireEvent.submit(screen.getByRole('button', { name: /Execute/i }));

    await waitFor(() => {
      expect(screen.getByText('Request failed. Please try again.')).toBeInTheDocument();
    });
  });

  it('should generate curl command and copy it to clipboard', () => {
    renderWithTranslations(<TryItOutForm endpoint={endpoint} serverUrl={serverUrl} />);

    fireEvent.change(screen.getByLabelText('id (path)'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('X-Token (header)'), { target: { value: 'secret' } });

    fireEvent.click(screen.getByRole('button', { name: /Generate cURL/i }));

    expect(screen.getByRole('heading', { name: /cURL command/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Copy/i }));

    expect(mockWriteText).toHaveBeenCalled();
  });
});
