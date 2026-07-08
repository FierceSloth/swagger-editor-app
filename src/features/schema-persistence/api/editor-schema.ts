import { createClient } from '@/shared/api/supabase/client';

const supabase = createClient();

export interface EditorSchema {
  content: string;
  format: string;
}

function isEditorSchema(data: unknown): data is EditorSchema {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as EditorSchema).content === 'string' &&
    typeof (data as EditorSchema).format === 'string'
  );
}

export async function loadEditorSchema(userId: string): Promise<EditorSchema | null> {
  const { data, error } = await supabase
    .from('editor_schemas')
    .select('content, format')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  if (!isEditorSchema(data)) return null;

  return data;
}

export async function saveEditorSchema(params: { userId: string; content: string; format: string }) {
  const { error } = await supabase.from('editor_schemas').upsert(
    {
      user_id: params.userId,
      content: params.content,
      format: params.format,
    },
    { onConflict: 'user_id' }
  );

  if (error) throw error;
}
