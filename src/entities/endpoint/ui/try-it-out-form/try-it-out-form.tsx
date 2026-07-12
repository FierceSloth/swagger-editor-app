import { useId } from 'react';
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
  const textareaId = useId();

  const parameters = endpoint.details.parameters || [];
  const requestBody = endpoint.details.requestBody;

  const jsonContent = requestBody?.content['application/json'];
  let defaultTextareaValue = '';

  if (jsonContent) {
    if (jsonContent.example !== undefined) {
      defaultTextareaValue = JSON.stringify(jsonContent.example, null, 2);
    } else if (jsonContent.examples) {
      const firstExample = Object.values(jsonContent.examples)[0] as { value?: unknown } | undefined;
      if (firstExample && firstExample.value !== undefined) {
        defaultTextareaValue = JSON.stringify(firstExample.value, null, 2);
      }
    }
  }

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
            placeholder={t('placeholder.param', { in: param.in })}
            withErrorPlug={false}
          />
        ))}

        {jsonContent && (
          <div className={styles.textareaGroup}>
            <label className={styles.label} htmlFor={textareaId}>
              {t('requestBody')}
            </label>
            <textarea
              id={textareaId}
              className={styles.textArea}
              rows={6}
              defaultValue={defaultTextareaValue}
              placeholder={t('placeholder.json')}
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
