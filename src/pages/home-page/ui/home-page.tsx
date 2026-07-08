'use client';

import { useMemo, useState, useEffect, useRef } from 'react';

import { parseToObject } from '@/shared/lib/parse-to-object';
import { SwaggerEditor } from '@/widgets/swagger-editor';
import { useAuth } from '@/features/auth';
import { loadEditorSchema, saveEditorSchema } from '@/features/schema-persistence/api/editor-schema';
import { useDebounce } from '@/shared/lib/hooks';
import { detectFormat } from '@/features/format-converter';

import styles from './home-page.module.scss';

const DEBOUNCE_DELAY = 1_000;

export function HomePage() {
  const { user } = useAuth();
  const [rawText, setRawText] = useState('');
  const [isSchemaValid, setIsSchemaValid] = useState(false);
  const debouncedText = useDebounce(rawText, DEBOUNCE_DELAY);
  const skipAutosave = useRef(false);

  useEffect(() => {
    if (!user?.id) return;

    const loadSchema = async () => {
      try {
        const savedSchema = await loadEditorSchema(user.id);
        if (savedSchema) {
          skipAutosave.current = true;
          setRawText(savedSchema.content);
        }
      } catch (error) {
        console.error('Failed to load saved schema:', error);
      }
    };

    void loadSchema();
  }, [user?.id]);

  const parsedSchema = useMemo(() => {
    if (!isSchemaValid || !rawText) return null;

    return parseToObject(rawText);
  }, [rawText, isSchemaValid]);

  useEffect(() => {
    if (!user?.id) return;

    if (skipAutosave.current) {
      skipAutosave.current = false;
      return;
    }

    const format = debouncedText ? detectFormat(debouncedText) : 'yaml';

    const saveSchema = async () => {
      try {
        await saveEditorSchema({
          userId: user.id,
          content: debouncedText,
          format: format ?? 'yaml',
        });
      } catch (error) {
        console.error('Failed to autosave schema:', error);
      }
    };

    void saveSchema();
  }, [user?.id, debouncedText]);

  console.log(parsedSchema); // TODO: Remove after add Swagger Viewer (<RSS-SE-17>)

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <SwaggerEditor value={rawText} onChange={setRawText} onValidationChange={setIsSchemaValid} />
      </div>
      <div className={styles.viewer}>
        <div className={styles.stub}>
          <h2>Very Cool SwaggerViewer</h2>
        </div>
      </div>
    </div>
  );
}
