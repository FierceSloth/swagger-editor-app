import { createClient } from '@/shared/api/supabase/server';

export interface HistoryItem {
  id: number;
  user_id: string;
  url: string;
  method: string;
  status: number;
  duration: number;
  timestamp: string;
  request_size: number | null;
  response_size: number | null;
  error_details: string | null;
}

export async function loadHistory(userId: string): Promise<HistoryItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('history')
    .select('id, user_id, url, method, status, duration, timestamp, request_size, response_size, error_details')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
