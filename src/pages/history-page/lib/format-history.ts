import type { BadgeColor } from '@/shared/ui/badge';

export function getStatusLabel(status: number): string {
  if (status >= 200 && status < 300) return `${status} OK`;
  return `${status} ERR`;
}

export function getStatusColor(status: number): BadgeColor {
  if (status >= 200 && status < 300) return 'green';
  return 'red';
}

export function formatSize(bytes: number | null): string {
  if (bytes === null || bytes === 0) return '0 B';
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export function formatDuration(ms: number): string {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${ms}ms`;
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
