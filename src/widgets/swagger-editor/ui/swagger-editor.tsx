'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { convertFormat, detectFormat, FormatToggle } from '@/features/format-converter';
import { openapiLinter, ValidationFeedback, ValidationStatus } from '@/features/schema-validator';
import { useDebounce } from '@/shared/lib/hooks';
import type { DataFormat } from '@/shared/types/format';
import { CodeEditor } from '@/shared/ui/code-editor';
import { forEachDiagnostic } from '@codemirror/lint';
import type { ViewUpdate } from '@uiw/react-codemirror';

import styles from './swagger-editor.module.scss';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function SwaggerEditor({ value = '', onChange, onValidationChange }: IProps) {
  const debouncedValue = useDebounce(value, 300);
  const currentFormat = useMemo(() => detectFormat(debouncedValue), [debouncedValue]);

  const [errorsCount, setErrorsCount] = useState(0);
  const [warningsCount, setWarningsCount] = useState(0);
  const isValid = errorsCount === 0 && currentFormat !== null && value.trim().length > 0;

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [errorsCount, currentFormat, onValidationChange, isValid]);

  const onFormatToggle = (newFormat: DataFormat) => {
    if (newFormat === currentFormat) return;
    const convertedText = convertFormat(value, newFormat);

    if (convertedText !== null) {
      onChange?.(convertedText);
    }
  };

  const onEditorUpdate = useCallback((viewUpdate: ViewUpdate) => {
    let errors = 0;
    let warnings = 0;
    forEachDiagnostic(viewUpdate.state, (diag) => {
      if (diag.severity === 'error') errors++;
      if (diag.severity === 'warning') warnings++;
    });

    setErrorsCount(errors);
    setWarningsCount(warnings);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <FormatToggle format={currentFormat} onToggle={onFormatToggle} />
        <ValidationStatus isValid={isValid} />
      </div>
      <CodeEditor
        value={value}
        height="100%"
        onChange={onChange}
        format={currentFormat ?? undefined}
        className={styles.editor}
        extensions={[openapiLinter]}
        onUpdate={onEditorUpdate}
      />
      <ValidationFeedback errorsCount={errorsCount} warningsCount={warningsCount} />
    </div>
  );
}
