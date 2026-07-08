'use client';

import { useMemo, useState } from 'react';

import { parseToObject } from '@/shared/lib/parse-to-object';
import { SwaggerEditor } from '@/widgets/swagger-editor';
import type { IOpenApiSchema } from '@/widgets/swagger-viewer/ui/swagger-viewer';
import { SwaggerViewer } from '@/widgets/swagger-viewer/ui/swagger-viewer';

import styles from './home-page.module.scss';

export function HomePage() {
  const [rawText, setRawText] = useState('');
  const [isSchemaValid, setIsSchemaValid] = useState(false);

  const parsedSchema = useMemo(() => {
    if (!isSchemaValid || !rawText) return null;

    return parseToObject(rawText) as IOpenApiSchema;
  }, [rawText, isSchemaValid]);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <SwaggerEditor value={rawText} onChange={setRawText} onValidationChange={setIsSchemaValid} />
      </div>
      <div className={styles.viewer}>
        <SwaggerViewer schema={parsedSchema} isSchemaValid={isSchemaValid} />
      </div>
    </div>
  );
}
