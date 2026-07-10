import { useTranslations } from 'next-intl';

import type { IEndpointItem } from '../../types/openapi-types';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { CirclePlay as PlayIcon } from 'lucide-react';
import styles from './try-it-out-form.module.scss';

interface IProps {
  endpoint: IEndpointItem;
}

export function TryItOutForm({ endpoint }: IProps) {
  const t = useTranslations('TryItOut');

  const parameters = endpoint.details.parameters || [];
  const requestBody = endpoint.details.requestBody;

  const jsonExample = requestBody?.content['application/json']?.example;
  const defaultTextareaValue = jsonExample ? JSON.stringify(jsonExample, null, 2) : '';

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        <PlayIcon className={styles.titleIcon} />
        <span>{t('title')}</span>
      </h3>
      <form className={styles.form}>
        {parameters.map((param) => (
          <Input
            key={`${param.in}-${param.name}`}
            className={styles.input}
            label={`${param.name} (${param.in})`}
            required={param.required}
            placeholder={`Enter ${param.in}...`}
            withErrorPlug={false}
          />
        ))}

        {requestBody && (
          <div className={styles.textareaGroup}>
            <label className={styles.label} htmlFor="request-body-textarea">
              {t('requestBody')}
            </label>
            <textarea
              id="request-body-textarea"
              className={styles.textArea}
              rows={6}
              defaultValue={defaultTextareaValue}
              placeholder="// JSON data"
            />
          </div>
        )}

        <div className={styles.actions}>
          <Button className={styles.button} variant="primary" type="submit">
            {t('execute')}
          </Button>
          <Button className={styles.button} variant="secondary" type="button">
            {t('generateCurl')}
          </Button>
        </div>
      </form>
    </div>
  );
}
