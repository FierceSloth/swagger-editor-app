'use client';

import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { CodeEditor } from '@/shared/ui/code-editor';
import { generateExample } from '../../lib/generate-example';
import type { IOpenApiResponses } from '../../types/openapi-types';
import { getStatusVariant } from './get-status-variant';

import styles from './response-list.module.scss';

interface IProps {
  responses?: IOpenApiResponses;
}

export function ResponseList({ responses }: IProps) {
  const t = useTranslations('ResponseList');

  if (!responses) {
    return null;
  }

  const responseEntries = Object.entries(responses);

  if (!responseEntries.length) {
    return null;
  }

  return (
    <section className={styles.responseList}>
      <h3 className={styles.title}>{t('title')}</h3>

      <div className={styles.list}>
        {responseEntries.map(([statusCode, response]) => {
          const contentEntry = Object.entries(response.content ?? {})[0];

          const [contentType, mediaType] = contentEntry ?? [];

          const example = mediaType?.example ?? generateExample(mediaType?.schema);

          return (
            <article key={statusCode} className={clsx(styles.responseItem, styles[getStatusVariant(statusCode)])}>
              <div className={styles.header}>
                <span className={styles.statusBadge}>{statusCode}</span>
                <p className={styles.description}>{response.description}</p>
              </div>

              {contentType && mediaType && (
                <div className={styles.block}>
                  <span className={styles.contentType}>{contentType}</span>
                  <CodeEditor value={JSON.stringify(example, null, 2)} format="json" readonly transparent hideLines />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
