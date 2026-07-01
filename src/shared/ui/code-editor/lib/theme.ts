import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { EditorView } from '@uiw/react-codemirror';

export const editorTheme = EditorView.theme(
  {
    '&': {
      color: 'var(--text-primary)',
      backgroundColor: 'transparent',
      fontFamily: 'var(--font-mono)',
    },
    '.cm-content': {
      caretColor: 'var(--text-primary)',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: 'var(--text-primary)',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
      backgroundColor: 'var(--bg-surface-4)',
    },
    '.cm-activeLine': {
      backgroundColor: 'var(--bg-surface-1)',
    },
    '.cm-gutters': {
      backgroundColor: 'transparent',
      color: 'var(--text-tech)',
      fontSize: '12px',
      borderRight: 'none',
    },
    '.cm-gutters .cm-lineNumbers .cm-gutterElement': {
      padding: '0 10px 0 5px',
      minWidth: '35px',
      textAlign: 'right',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      border: 'none',
      margin: '0 4px',
      padding: '0 2px',
      cursor: 'pointer',
    },
    '.cm-foldPlaceholder:hover': {
      color: 'var(--text-primary)',
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: 'var(--text-tech)',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: 'var(--text-primary)',
      cursor: 'pointer',
    },
  },
  { dark: true }
);

export const syntaxTheme = syntaxHighlighting(
  HighlightStyle.define([
    { tag: t.keyword, color: 'var(--blue-color)' },
    { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: 'var(--blue-color)' },
    { tag: [t.function(t.variableName), t.labelName], color: 'var(--blue-color)' },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: 'var(--blue-color)' },
    { tag: [t.definition(t.name), t.separator], color: 'var(--text-secondary)' },
    {
      tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: 'var(--green-color)',
    },
    {
      tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
      color: 'var(--text-primary)',
    },
    { tag: [t.meta, t.comment], color: 'var(--text-tech)' },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: 'var(--text-secondary)', textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: 'var(--text-primary)' },
    { tag: [t.bool, t.special(t.variableName)], color: 'var(--text-primary)' },
    { tag: [t.processingInstruction, t.string, t.inserted, t.atom, t.literal, t.content], color: 'var(--green-color)' },
    { tag: t.invalid, color: 'var(--red-color)' },
  ])
);
