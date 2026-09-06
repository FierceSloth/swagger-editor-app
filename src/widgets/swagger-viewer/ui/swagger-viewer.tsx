import type { IOpenApiPathItem } from '@/entities/endpoint';
import { Badge } from '@/shared/ui/badge';
import { EndpointList, groupEndpoints } from '@entities/endpoint';
import { memo } from 'react';
import Markdown from 'react-markdown';

import styles from './swagger-viewer.module.scss';

export interface IOpenApiSchema {
  openapi?: string;
  swagger?: string;
  info?: {
    title?: string;
    version?: string;
    description?: string;
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths?: Record<string, IOpenApiPathItem>;
  [key: string]: unknown;
}

interface IProps {
  schema: IOpenApiSchema | null;
}

export const SwaggerViewer = memo(({ schema }: IProps) => {
  if (!schema) return null;

  const serverUrl = schema.servers?.[0]?.url ?? '';

  const groups = schema.paths ? groupEndpoints(schema.paths) : [];
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.apiInfo}>
          {(schema.openapi || schema.swagger) && (
            <Badge className={styles.meta}>OpenApi // {schema.openapi || schema.swagger}</Badge>
          )}
          {schema.info?.title && <h1 className={styles.apiTitle}>{schema.info.title}</h1>}
          {schema.info?.description && (
            <div className={styles.apiDescription}>
              <Markdown>{schema.info.description}</Markdown>
            </div>
          )}
        </div>

        {schema.servers?.[0] && (
          <div className={styles.serverBlock}>
            <p className={styles.serverLabel}>Base Server</p>
            <Badge color="green">{schema.servers[0].url}</Badge>
          </div>
        )}
      </header>

      <div className={styles.scrollableList}>
        <EndpointList groups={groups} serverUrl={serverUrl} />
      </div>
    </div>
  );
});

SwaggerViewer.displayName = 'SwaggerViewer';
