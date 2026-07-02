'use client';

import { CodeEditor } from '@/shared/ui/code-editor';

import styles from './swagger-editor.module.scss';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  format?: 'json' | 'yaml';
}

export function SwaggerEditor({ value, onChange, format }: IProps) {
  return (
    <div className={styles.wrapper}>
      <CodeEditor value={value} height="100%" onChange={onChange} format={format} className={styles.editor} />
    </div>
  );
}
