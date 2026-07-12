import type { NextRequest } from 'next/server';
import getProxyHeaders from './getProxyHeaders';
import { createClient } from '@/shared/api/supabase/server';

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

  const startedAt = Date.now();
  const requestSize = body ? body.byteLength : 0;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(parsedTargetUrl.toString(), {
      method,
      headers,
      body,
      signal: controller.signal,
    });

    const responseBuffer = await response.arrayBuffer();
    const duration = Date.now() - startedAt;
    const responseSize = responseBuffer.byteLength;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('history').insert({
        user_id: user.id,
        url: targetUrl,
        method,
        status: response.status,
        duration,
        request_size: requestSize,
        response_size: responseSize,
        timestamp: new Date().toISOString(),
        error_details: response.ok ? null : `HTTP ${response.status}`,
      });
    }

    return new Response(responseBuffer, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    const duration = Date.now() - startedAt;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let errorDetails = 'Failed to proxy request';
    let status = 502;

    if (error instanceof DOMException && error.name === 'AbortError') {
      errorDetails = 'Proxy request timeout';
      status = 504;
    }

    if (user) {
      await supabase.from('history').insert({
        user_id: user.id,
        url: targetUrl,
        method,
        status,
        duration,
        request_size: requestSize,
        response_size: 0,
        timestamp: new Date().toISOString(),
        error_details: errorDetails,
      });
    }

    return Response.json({ error: errorDetails }, { status });
  } finally {
    clearTimeout(timeoutId);
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
