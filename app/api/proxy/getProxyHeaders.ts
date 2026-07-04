import type { NextRequest } from 'next/server';

const EXCLUDED_REQUEST_HEADERS = ['host', 'origin', 'referer', 'cookie', 'content-length'];

export default function getProxyHeaders(request: NextRequest): Headers {
  const headers = new Headers(request.headers);

  EXCLUDED_REQUEST_HEADERS.forEach((header) => {
    headers.delete(header);
  });

  return headers;
}
