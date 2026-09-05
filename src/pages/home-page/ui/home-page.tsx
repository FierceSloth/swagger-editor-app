'use client';

import { useMemo, useState, useEffect } from 'react';

import { useAuth } from '@/features/auth';
import { loadEditorSchema, saveEditorSchema } from '@/features/schema-persistence/api/editor-schema';
import { parseToObject } from '@/shared/lib/parse-to-object';
import { useDebounce } from '@/shared/lib/hooks';
import { SwaggerEditor } from '@/widgets/swagger-editor';
import { SwaggerViewer } from '@/widgets/swagger-viewer/ui/swagger-viewer';

import styles from './home-page.module.scss';

const DEBOUNCE_DELAY_SIZE_MS = 1_000; // 1 second

export function HomePage() {
  const { user } = useAuth();
  const [rawText, setRawText] = useState('');
  const [isSchemaValid, setIsSchemaValid] = useState(false);
  const debouncedText = useDebounce(rawText, DEBOUNCE_DELAY_SIZE_MS);

  useEffect(() => {
    if (!user?.id) return;

    const loadSchema = async () => {
      try {
        const savedSchema = await loadEditorSchema(user.id);
        if (savedSchema) {
          setRawText(savedSchema.content);
        }
      } catch (error) {
        console.error('Failed to load saved schema:', error);
      }
    };

    void loadSchema();
  }, [user?.id]);

  // Cast is safe: isSchemaValid is driven by Spectral OAS ruleset,
  // which validates the full OpenAPI structure (info, title, paths, etc.)
  const parsedSchema = useMemo(() => {
    if (!isSchemaValid || !rawText) return null;

    const parsed = parseToObject(rawText);
    if (!parsed || typeof parsed !== 'object' || (!('openapi' in parsed) && !('swagger' in parsed))) {
      return null;
    }

    return parsed;
  }, [rawText, isSchemaValid]);

  useEffect(() => {
    if (!user?.id) return;

    const saveSchema = async () => {
      try {
        await saveEditorSchema({
          userId: user.id,
          content: debouncedText,
        });
      } catch (error) {
        console.error('Failed to autosave schema:', error);
      }
    };

    void saveSchema();
  }, [user?.id, debouncedText]);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <SwaggerEditor value={rawText} onChange={setRawText} onValidationChange={setIsSchemaValid} />
      </div>
      <div className={styles.viewer}>
        <SwaggerViewer schema={parsedSchema} />
      </div>
    </div>
  );
}
