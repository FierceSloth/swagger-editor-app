'use client';

import { useState } from 'react';

import { convertFormat, detectFormat, FormatToggle } from '@/features/format-converter';
import { openapiLinter } from '@/features/schema-validator';
import type { DataFormat, DetectedFormat } from '@/shared/types/format';
import { CodeEditor } from '@/shared/ui/code-editor';

import styles from './swagger-editor.module.scss';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function SwaggerEditor({ value: externalValue, onChange }: IProps) {
  const [currentFormat, setCurrentFormat] = useState<DetectedFormat>('yaml');
  const [localValue, setLocalValue] = useState(externalValue || '');

  const onFormatToggle = (newFormat: DataFormat) => {
    if (newFormat === currentFormat) return;
    const convertedText = convertFormat(localValue, newFormat);

    if (convertedText !== null) {
      setCurrentFormat(newFormat);
      setLocalValue(convertedText);
      onChange?.(convertedText);
    }
  };

  const onTextChange = (newText: string) => {
    const detected = detectFormat(newText);
    setCurrentFormat(detected);
    setLocalValue(newText);
    onChange?.(newText);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <FormatToggle format={currentFormat} onToggle={onFormatToggle} />
      </div>
      <CodeEditor
        value={localValue}
        height="100%"
        onChange={onTextChange}
        format={currentFormat === 'unknown' ? undefined : currentFormat}
        className={styles.editor}
        extensions={[openapiLinter]}
      />
    </div>
  );
}
