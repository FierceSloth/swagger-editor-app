import { describe, expect, it } from 'vitest';
import { getFormStringValue } from './get-form-string-value';

describe('getFormStringValue', () => {
  it('should return empty string if field is not present', () => {
    const formData = new FormData();
    expect(getFormStringValue(formData, 'missing')).toBe('');
  });

  it('should return string value of field if present', () => {
    const formData = new FormData();
    formData.append('test', 'value');
    expect(getFormStringValue(formData, 'test')).toBe('value');
  });

  it('should return empty string if field is a File object instead of string', () => {
    const formData = new FormData();
    const blob = new Blob(['hello'], { type: 'text/plain' });
    formData.append('fileField', blob, 'hello.txt');
    expect(getFormStringValue(formData, 'fileField')).toBe('');
  });
});
