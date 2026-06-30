'use client';

import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';
import CodeMirror from '@uiw/react-codemirror';

import styles from './swagger-editor.module.scss';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  format?: 'json' | 'yaml';
}

export function SwaggerEditor({ value, onChange, format }: IProps) {
  const extensions = [format === 'json' ? json() : yaml()];

  return (
    <div className={styles.wrapper}>
      <CodeMirror
        value={value}
        height="100%"
        extensions={extensions}
        onChange={onChange}
        theme="dark"
        className={styles.editor}
      />
    </div>
  );
}
