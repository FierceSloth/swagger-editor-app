'use client';

export function fetchViaProxy(url: string, options?: RequestInit): Promise<Response> {
  if (!url.trim()) throw new Error('URL is required');

  const proxyUrl = `/api/proxy?targetUrl=${encodeURIComponent(url)}`;

  return fetch(proxyUrl, options);
}
