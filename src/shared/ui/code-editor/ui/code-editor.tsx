'use client';

import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';
import { EditorState } from '@codemirror/state';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';
import clsx from 'clsx';
import { editorTheme, syntaxTheme } from '../lib/theme';

import styles from './code-editor.module.scss';

export interface ICodeEditorProps extends Omit<ReactCodeMirrorProps, 'theme'> {
  format?: 'json' | 'yaml';
  transparent?: boolean;
  hideLines?: boolean;
  readonly?: boolean;
}

export function CodeEditor({
  format = 'yaml',
  transparent = false,
  hideLines = false,
  readonly = false,
  className,
  ...props
}: ICodeEditorProps) {
  const extensions = [format === 'json' ? json() : yaml(), editorTheme, syntaxTheme, EditorState.readOnly.of(readonly)];

  return (
    <div
      className={clsx(
        styles.codeEditor,
        {
          [styles.transparent]: transparent,
          [styles.hideLines]: hideLines,
          [styles.readonly]: readonly,
        },
        className
      )}
    >
      <CodeMirror
        theme="none"
        extensions={extensions}
        editable={!readonly}
        basicSetup={{
          lineNumbers: !hideLines,
          foldGutter: !hideLines,
        }}
        {...props}
      />
    </div>
  );
}
