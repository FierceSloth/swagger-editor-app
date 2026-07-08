'use client';

import { useMemo, useState, useEffect } from 'react';

import { parseToObject } from '@/shared/lib/parse-to-object';
import { SwaggerEditor } from '@/widgets/swagger-editor';
import { useAuth } from '@/features/auth';
import { loadEditorSchema, saveEditorSchema } from '@/features/schema-persistence/api/editor-schema';
import { useDebounce } from '@/shared/lib/hooks';
import { detectFormat } from '@/features/format-converter';

import styles from './home-page.module.scss';

export function HomePage() {
  const { user } = useAuth();
  const [rawText, setRawText] = useState('');
  const [isSchemaValid, setIsSchemaValid] = useState(false);
  const debouncedText = useDebounce(rawText, 1000);

  useEffect(() => {
    if (!user?.id) return;

    void loadEditorSchema(user.id)
      .then((saved) => {
        if (saved) setRawText(saved.content);
      })
      .catch((error) => {
        console.error('Failed to load saved schema:', error);
      });
  }, [user?.id]);

  const parsedSchema = useMemo(() => {
    if (!isSchemaValid || !rawText) return null;

    return parseToObject(rawText);
  }, [rawText, isSchemaValid]);

  useEffect(() => {
    if (!user?.id || !debouncedText) return;

    const format = detectFormat(debouncedText) ?? 'yaml';

    void saveEditorSchema({
      userId: user.id,
      content: debouncedText,
      format,
    }).catch((error) => {
      console.error('Failed to autosave schema:', error);
    });
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
