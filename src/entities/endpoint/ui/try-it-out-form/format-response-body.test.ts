import { describe, expect, it } from 'vitest';
import { formatResponseBody } from './format-response-body';

describe('formatResponseBody', () => {
  it('should format a valid JSON string', () => {
    const raw = '{"a":1,"b":"hello"}';
    const formatted = formatResponseBody(raw);
    expect(formatted).toBe(JSON.stringify({ a: 1, b: 'hello' }, null, 2));
  });

  it('should return raw string if not valid JSON', () => {
    const raw = 'not-a-json';
    const formatted = formatResponseBody(raw);
    expect(formatted).toBe('not-a-json');
  });
});
