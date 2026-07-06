'use client';

import type { DataFormat, DetectedFormat } from '@/shared/types/format';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { ArrowLeftRight as ConvertIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import styles from './format-toggle.module.scss';

interface IProps {
  format: DetectedFormat;
  onToggle: (newFormat: DataFormat) => void;
}

export function FormatToggle({ format, onToggle }: IProps) {
  const t = useTranslations('SwaggerEditor');
  const isUnknown = format === null;
  const oppositeFormat: DataFormat = format === 'json' ? 'yaml' : 'json';

  const onClick = () => {
    onToggle(oppositeFormat);
  };

  return (
    <div className={styles.wrapper}>
      <Badge className={styles.badge} color={isUnknown ? 'red' : 'gray'}>
        <span className={styles.text}>{t('format')}</span>
        <span className={styles.format}>{format ?? 'unknown'}</span>
      </Badge>

      <Button className={styles.button} variant="tertiary" type="button" onClick={onClick} disabled={isUnknown}>
        <ConvertIcon className={styles.convertIcon} />{' '}
        <span>{isUnknown ? t('cannot_convert') : t('convert_to', { format: oppositeFormat })}</span>
      </Button>
    </div>
  );
}
