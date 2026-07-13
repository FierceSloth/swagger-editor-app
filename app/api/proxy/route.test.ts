import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DELETE, GET, OPTIONS, PATCH, POST, PUT } from './route';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('Proxy API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 if targetUrl is missing', async () => {
    const request = new NextRequest('https://api.example.com/api/proxy');
    const response = await GET(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe('targetUrl is missing');
  });

  it('should return 400 if targetUrl is invalid', async () => {
    const request = new NextRequest('https://api.example.com/api/proxy?targetUrl=invalid-url');
    const response = await GET(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe('Invalid targetUrl');
  });

  it('should return 400 if targetUrl protocol is not http/https', async () => {
    const request = new NextRequest('https://api.example.com/api/proxy?targetUrl=ftp://ftp.example.com');
    const response = await GET(request);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe('Only HTTP and HTTPS protocols are allowed');
  });

  it('should proxy GET request successfully', async () => {
    const target = 'https://api.external.com/data';
    const request = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'GET',
    });

    mockFetch.mockResolvedValueOnce(new Response('external-response', { status: 200 }));

    const response = await GET(request);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('external-response');
    expect(mockFetch).toHaveBeenCalledWith(target, expect.objectContaining({ method: 'GET' }));
  });

  it('should proxy POST request with body', async () => {
    const target = 'https://api.external.com/data';
    const request = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'POST',
      body: 'request-payload',
    });

    mockFetch.mockResolvedValueOnce(new Response('created', { status: 201 }));

    const response = await POST(request);
    expect(response.status).toBe(201);
    expect(mockFetch).toHaveBeenCalledWith(target, expect.objectContaining({ method: 'POST' }));
  });

  it('should handle fetch timeout error', async () => {
    const target = 'https://api.external.com/data';
    const request = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'GET',
    });

    const abortError = new DOMException('Request aborted', 'AbortError');
    mockFetch.mockRejectedValueOnce(abortError);

    const response = await GET(request);
    expect(response.status).toBe(504);
    const json = await response.json();
    expect(json.error).toBe('Proxy request timeout');
  });

  it('should handle general fetch error', async () => {
    const target = 'https://api.external.com/data';
    const request = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'GET',
    });

    mockFetch.mockRejectedValueOnce(new Error('Network failure'));

    const response = await GET(request);
    expect(response.status).toBe(502);
    const json = await response.json();
    expect(json.error).toBe('Failed to proxy request');
  });

  it('should route PUT, DELETE, PATCH, OPTIONS requests', async () => {
    const target = 'https://api.external.com/data';
    mockFetch.mockResolvedValue(new Response('ok', { status: 200 }));

    const reqPut = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'PUT',
    });
    const resPut = await PUT(reqPut);
    expect(resPut.status).toBe(200);

    const reqDelete = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'DELETE',
    });
    const resDelete = await DELETE(reqDelete);
    expect(resDelete.status).toBe(200);

    const reqPatch = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'PATCH',
    });
    const resPatch = await PATCH(reqPatch);
    expect(resPatch.status).toBe(200);

    const reqOptions = new NextRequest(`https://api.example.com/api/proxy?targetUrl=${encodeURIComponent(target)}`, {
      method: 'OPTIONS',
    });
    const resOptions = await OPTIONS(reqOptions);
    expect(resOptions.status).toBe(200);
  });
});
