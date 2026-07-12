import type { HistoryItem } from '@/features/history/api/history';

interface HistoryPageProps {
  items: HistoryItem[];
}

function formatBytes(value: number | null): string {
  if (!value) return '0 B';
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export function HistoryPage({ items }: HistoryPageProps) {
  if (!items.length) {
    return (
      <div>
        <h1>History</h1>
        <p>You haven&apos;t executed any requests yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>History</h1>

      <div>
        {items.map((item) => (
          <div key={item.id}>
            <div>
              <span>{item.method}</span>
              <span>Status: {item.status}</span>
            </div>

            <p>{item.url}</p>

            <div>
              <span>Duration: {item.duration} ms</span>
              <span>Request size: {formatBytes(item.request_size)}</span>
              <span>Response size: {formatBytes(item.response_size)}</span>
              <span>{new Date(item.timestamp).toLocaleString()}</span>
            </div>

            {item.error_details && <p>Error: {item.error_details}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
