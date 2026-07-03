'use client';

import { useMemo, useState } from 'react';
import yaml from 'yaml';

import { useDebounce } from '@/shared/lib/hooks';
import { SwaggerEditor } from '@/widgets/swagger-editor';

import styles from './home-page.module.scss';

export function HomePage() {
  const [rawText, setRawText] = useState('');
  const [isSchemaValid, setIsSchemaValid] = useState(false);

  const debouncedText = useDebounce(rawText, 500);

  const parsedSchema = useMemo(() => {
    if (!isSchemaValid || !debouncedText) return null;

    try {
      const parsed = yaml.parse(debouncedText) as unknown;
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      // ignore this
    }

    return null;
  }, [debouncedText, isSchemaValid]);

  console.log(parsedSchema); // ? For the time being, as there is no Swagger Viewer

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
