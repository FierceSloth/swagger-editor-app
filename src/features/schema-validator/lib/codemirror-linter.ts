import type { Diagnostic } from '@codemirror/lint';
import { linter } from '@codemirror/lint';
import type { EditorView } from '@codemirror/view';
import { DiagnosticSeverity } from '@stoplight/types';
import { validateSchema } from './validate-schema';

const severityMap = {
  [DiagnosticSeverity.Error]: 'error',
  [DiagnosticSeverity.Warning]: 'warning',
  [DiagnosticSeverity.Information]: 'info',
  [DiagnosticSeverity.Hint]: 'hint',
};

type Severity = Diagnostic['severity'];

export const openapiLinter = linter(async (view: EditorView) => {
  const text = view.state.doc.toString();

  const results = await validateSchema(text);

  const diagnostics: Diagnostic[] = results.map((issue) => {
    const startLinePos = issue.range.start;
    const endLinePos = issue.range.end;

    const doc = view.state.doc;
    const startLine = doc.line(Math.min(startLinePos.line + 1, doc.lines));
    const endLine = doc.line(Math.min(endLinePos.line + 1, doc.lines));

    const from = startLine.from + startLinePos.character;
    const to = endLine.from + endLinePos.character;

    const severity = severityMap[issue.severity] as Severity;

    return {
      from,
      to,
      severity,
      message: issue.message,
    };
  });

  return diagnostics;
});
