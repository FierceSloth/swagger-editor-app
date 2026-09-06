import { forEachDiagnostic } from '@codemirror/lint';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import messages from '../../../../messages/en.json';
import { SwaggerEditor } from './swagger-editor';

vi.mock('@codemirror/lint', () => ({
  forEachDiagnostic: vi.fn(),
  linter: vi.fn(() => () => {}),
}));

const renderWithTranslations = (ui: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('SwaggerEditor Component', () => {
  const onChangeMock = vi.fn();
  const onValidationChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render editor with value and handle change', () => {
    renderWithTranslations(
      <SwaggerEditor value="openapi: 3.0.0" onChange={onChangeMock} onValidationChange={onValidationChangeMock} />
    );

    const textarea = screen.getByTestId<HTMLTextAreaElement>('codemirror-editor');
    expect(textarea.value).toBe('openapi: 3.0.0');

    fireEvent.change(textarea, { target: { value: 'openapi: 3.0.1' } });
    expect(onChangeMock).toHaveBeenCalledWith('openapi: 3.0.1');
  });

  it('should toggle format from yaml to json', () => {
    const yamlValue = 'openapi: 3.0.0\ninfo:\n  title: Test';
    renderWithTranslations(
      <SwaggerEditor value={yamlValue} onChange={onChangeMock} onValidationChange={onValidationChangeMock} />
    );

    const jsonBtn = screen.getByRole('button', { name: /json/i });
    fireEvent.click(jsonBtn);

    expect(onChangeMock).toHaveBeenCalled();
    const mockCallArg = onChangeMock.mock.calls[0][0];
    expect(mockCallArg).toContain('"openapi": "3.0.0"');
  });

  it('should handle editor updates and set diagnostics count', () => {
    vi.mocked(forEachDiagnostic).mockImplementation((_state: any, cb: any) => {
      cb({ severity: 'error' });
      cb({ severity: 'warning' });
    });

    renderWithTranslations(
      <SwaggerEditor value="openapi: 3.0.0" onChange={onChangeMock} onValidationChange={onValidationChangeMock} />
    );

    const textarea = screen.getByTestId<HTMLTextAreaElement>('codemirror-editor');
    fireEvent.change(textarea, { target: { value: 'invalid content' } });

    expect(screen.getByText(/1 Error/i)).toBeInTheDocument();
    expect(screen.getByText(/1 Warning/i)).toBeInTheDocument();
  });
});
