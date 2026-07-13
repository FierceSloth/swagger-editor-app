import { describe, expect, it } from 'vitest';
import { generateCurlCommand } from './generate-curl-command';

describe('generateCurlCommand', () => {
  it('should generate curl command with headers and body', () => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Bearer token');

    const result = generateCurlCommand({
      method: 'POST',
      url: 'https://api.example.com/users',
      headers,
      body: '{"name":"John"}',
    });

    expect(result).toBe(
      "curl -X 'POST' 'https://api.example.com/users' -H 'authorization: Bearer token' -H 'content-type: application/json' --data-raw '{\"name\":\"John\"}'"
    );
  });

  it('should handle single quotes inside values', () => {
    const headers = new Headers();
    const result = generateCurlCommand({
      method: 'GET',
      url: "https://api.example.com/users?name=O'Connor",
      headers,
    });

    expect(result).toBe("curl -X 'GET' 'https://api.example.com/users?name=O'\\''Connor'");
  });
});
