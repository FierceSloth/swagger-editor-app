import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test-publishable-key';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

interface MockCodeMirrorProps {
  value?: string;
  onChange?: (value: string) => void;
  onUpdate?: (viewUpdate: { state: { doc: string } }) => void;
  readOnly?: boolean;
}

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({ value, onChange, onUpdate, readOnly }: MockCodeMirrorProps) => {
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
        onUpdate?.({
          state: { doc: e.target.value },
        });
      };
      return React.createElement('textarea', {
        'data-testid': 'codemirror-editor',
        value: value || '',
        onChange: handleChange,
        readOnly: readOnly,
      });
    },
    EditorView: {
      theme: () => ({}),
    },
  };
});
