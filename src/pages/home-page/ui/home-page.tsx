'use client';

import { useMemo, useState } from 'react';

import { parseToObject } from '@/shared/lib/parse-to-object';
import { SwaggerEditor } from '@/widgets/swagger-editor';

import styles from './home-page.module.scss';

export function HomePage() {
  const [rawText, setRawText] = useState('');
  const [isSchemaValid, setIsSchemaValid] = useState(false);

  const parsedSchema = useMemo(() => {
    if (!isSchemaValid || !rawText) return null;

    return parseToObject(rawText);
  }, [rawText, isSchemaValid]);

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
