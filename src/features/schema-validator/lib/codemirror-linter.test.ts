import { describe, it, expect, vi } from 'vitest';
import { runOpenapiLinter } from './codemirror-linter';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { validateSchema } from './validate-schema';
import { DiagnosticSeverity } from '@stoplight/types';

vi.mock('./validate-schema', () => ({
  validateSchema: vi.fn(),
}));

describe('codemirror-linter', () => {
  it('should map Spectral diagnostic results to CodeMirror diagnostics', async () => {
    const text = 'openapi: 3.0.0\ninfo:\n  title: Test';
    const state = EditorState.create({ doc: text });
    const view = new EditorView({ state });

    vi.mocked(validateSchema).mockResolvedValue([
      {
        code: 'invalid-info',
        message: 'Info is invalid',
        path: ['info'],
        severity: DiagnosticSeverity.Error,
        range: {
          start: { line: 1, character: 0 },
          end: { line: 1, character: 5 },
        },
      },
      {
        code: 'warning-title',
        message: 'Title is bad',
        path: ['info', 'title'],
        severity: DiagnosticSeverity.Warning,
        range: {
          start: { line: 2, character: 2 },
          end: { line: 2, character: 13 },
        },
      },
    ]);

    const diagnostics = await runOpenapiLinter(view);

    expect(validateSchema).toHaveBeenCalledWith(text);
    expect(diagnostics).toHaveLength(2);

    expect(diagnostics[0]).toEqual({
      from: 15,
      to: 20,
      severity: 'error',
      message: 'Info is invalid',
    });

    expect(diagnostics[1]).toEqual({
      from: 23,
      to: 34,
      severity: 'warning',
      message: 'Title is bad',
    });
  });

  it('should handle empty validation results', async () => {
    const state = EditorState.create({ doc: '' });
    const view = new EditorView({ state });

    vi.mocked(validateSchema).mockResolvedValue([]);

    const diagnostics = await runOpenapiLinter(view);

    expect(diagnostics).toHaveLength(0);
  });
});
