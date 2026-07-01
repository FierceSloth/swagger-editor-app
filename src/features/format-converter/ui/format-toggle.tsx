'use client';

import type { DataFormat } from '@/shared/types/format';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { ArrowLeftRight as ConvertIcon } from 'lucide-react';

import styles from './format-toggle.module.scss';

interface IProps {
  format: DataFormat;
  onToggle: (newFormat: DataFormat) => void;
}

export function FormatToggle({ format, onToggle }: IProps) {
  const oppositeFormat: DataFormat = format === 'json' ? 'yaml' : 'json';

  const onClick = () => {
    onToggle(oppositeFormat);
  };

  return (
    <div className={styles.wrapper}>
      <Badge className={styles.badge} color="gray">
        <span className={styles.text}>FORMAT:</span>
        <span className={styles.format}>{format}</span>
      </Badge>

      <Button className={styles.button} variant="tertiary" type="button" onClick={onClick}>
        <ConvertIcon className={styles.convertIcon} /> Convert to {oppositeFormat.toUpperCase()}
      </Button>
    </div>
  );
}
