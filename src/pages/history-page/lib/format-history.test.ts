import { describe, expect, it } from 'vitest';
import { getStatusLabel, getStatusColor, formatSize, formatDuration, formatTimestamp } from './format-history';

describe('format-history', () => {
  describe('getStatusLabel', () => {
    it('should return OK for 2xx status codes', () => {
      expect(getStatusLabel(200)).toBe('200 OK');
      expect(getStatusLabel(201)).toBe('201 OK');
      expect(getStatusLabel(204)).toBe('204 OK');
    });

    it('should return ERR for non-2xx status codes', () => {
      expect(getStatusLabel(400)).toBe('400 ERR');
      expect(getStatusLabel(401)).toBe('401 ERR');
      expect(getStatusLabel(500)).toBe('500 ERR');
    });
  });

  describe('getStatusColor', () => {
    it('should return green for 2xx status codes', () => {
      expect(getStatusColor(200)).toBe('green');
      expect(getStatusColor(204)).toBe('green');
    });

    it('should return red for non-2xx status codes', () => {
      expect(getStatusColor(400)).toBe('red');
      expect(getStatusColor(500)).toBe('red');
    });
  });

  describe('formatSize', () => {
    it('should return 0 B for null or 0', () => {
      expect(formatSize(null)).toBe('0 B');
      expect(formatSize(0)).toBe('0 B');
    });

    it('should format bytes correctly when under 1024', () => {
      expect(formatSize(512)).toBe('512 B');
      expect(formatSize(1023)).toBe('1023 B');
    });

    it('should format bytes to KB when 1024 or more', () => {
      expect(formatSize(1024)).toBe('1.0 KB');
      expect(formatSize(1536)).toBe('1.5 KB');
      expect(formatSize(1048576)).toBe('1024.0 KB');
    });
  });

  describe('formatDuration', () => {
    it('should format ms correctly when under 1000', () => {
      expect(formatDuration(500)).toBe('500ms');
      expect(formatDuration(999)).toBe('999ms');
    });

    it('should format ms to seconds when 1000 or more', () => {
      expect(formatDuration(1000)).toBe('1.0s');
      expect(formatDuration(1500)).toBe('1.5s');
      expect(formatDuration(2000)).toBe('2.0s');
    });
  });

  describe('formatTimestamp', () => {
    it('should format timestamp string in YYYY-MM-DD HH:MM format using local time', () => {
      const input = '2026-07-13T14:53:39.000Z';
      const date = new Date(input);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const expected = `${year}-${month}-${day} ${hours}:${minutes}`;

      expect(formatTimestamp(input)).toBe(expected);
    });
  });
});
