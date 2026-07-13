import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchViaProxy } from './proxy-client';

describe('fetchViaProxy', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call fetch with proxy URL and encoded target URL', async () => {
    const targetUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));

    await fetchViaProxy(targetUrl);

    expect(fetchMock).toHaveBeenCalledWith(`/api/proxy?targetUrl=${encodeURIComponent(targetUrl)}`, undefined);
  });

  it('should pass request options to fetch', async () => {
    const targetUrl = 'https://api.example.com/users';

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Meruert' }),
    };

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 201 }));

    await fetchViaProxy(targetUrl, options);

    expect(fetchMock).toHaveBeenCalledWith(`/api/proxy?targetUrl=${encodeURIComponent(targetUrl)}`, options);
  });
});
