'use client';

import { useTranslations } from 'next-intl';
import { CodeEditor } from '@/shared/ui/code-editor';
import { generateExample } from '../../lib/generate-example';
import type { IOpenApiRequestBody } from '../../types/openapi-types';

import styles from './request-body.module.scss';

interface IProps {
  requestBody?: IOpenApiRequestBody;
}

export function RequestBody({ requestBody }: IProps) {
  const t = useTranslations('RequestBody');

  if (!requestBody) {
    return null;
  }

  const [contentType, mediaType] = Object.entries(requestBody.content)[0] ?? [];

  if (!contentType || !mediaType) {
    return null;
  }

  const example = mediaType.example ?? generateExample(mediaType.schema);

  return (
    <section className={styles.requestBody}>
      <h3 className={styles.title}>{t('title')}</h3>
      {requestBody.description && <p className={styles.description}>{requestBody.description}</p>}

      <div className={styles.block}>
        <span className={styles.contentType}>{contentType}</span>
        <CodeEditor value={JSON.stringify(example, null, 2)} format="json" readonly transparent hideLines />
      </div>
    </section>
  );
}
