import type { HistoryItem } from '@/features/history/api/history';

interface HistoryRequestCardProps {
  item: HistoryItem;
}

export function HistoryRequestCard({ item }: HistoryRequestCardProps) {
  return (
    <div>
      <div>
        <span>{item.method}</span>
        <span>{item.url}</span>
      </div>

      <div>
        <span>Status: {item.status}</span>
        <span>Duration: {item.duration} ms</span>
      </div>

      <div>
        <span>{new Date(item.timestamp).toLocaleString()}</span>
      </div>

      <div>
        <span>Request size: {item.request_size ?? 0} B</span>
        <span>Response size: {item.response_size ?? 0} B</span>
      </div>

      {item.error_details && (
        <div>
          <span>Error: {item.error_details}</span>
        </div>
      )}
    </div>
  );
}
