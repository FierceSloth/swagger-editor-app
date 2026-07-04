import type { NextRequest } from 'next/server';
import getProxyHeaders from './getProxyHeaders';

const ALLOWED_PROTOCOLS = ['http:', 'https:'];

async function proxyRequest(request: NextRequest): Promise<Response> {
  const targetUrl = request.nextUrl.searchParams.get('targetUrl');

  if (!targetUrl) {
    return Response.json({ error: 'targetUrl is missing' }, { status: 400 });
  }

  let parsedTargetUrl: URL;

  try {
    parsedTargetUrl = new URL(targetUrl);
  } catch {
    return Response.json({ error: 'Invalid targetUrl' }, { status: 400 });
  }

  if (!ALLOWED_PROTOCOLS.includes(parsedTargetUrl.protocol)) {
    return Response.json({ error: 'Only HTTP and HTTPS protocols are allowed' }, { status: 400 });
  }

  const method = request.method;
  const headers = getProxyHeaders(request);

  const body = method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer();

  try {
    const response = await fetch(parsedTargetUrl.toString(), {
      method,
      headers,
      body,
    });

    return response;
  } catch {
    return Response.json({ error: 'Failed to proxy request' }, { status: 502 });
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function OPTIONS(request: NextRequest) {
  return proxyRequest(request);
}
