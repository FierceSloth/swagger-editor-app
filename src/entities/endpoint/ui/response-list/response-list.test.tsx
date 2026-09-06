import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '../../../../../messages/en.json';
import type { IOpenApiResponses } from '../../types/openapi-types';
import { getStatusVariant } from './get-status-variant';
import { ResponseList } from './response-list';

const renderWithTranslations = (ui: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('getStatusVariant', () => {
  it('should return correct variant based on status code string', () => {
    expect(getStatusVariant('200')).toBe('success');
    expect(getStatusVariant('404')).toBe('error');
    expect(getStatusVariant('500')).toBe('error');
    expect(getStatusVariant('302')).toBe('default');
  });
});

describe('ResponseList Component', () => {
  it('should render null if responses are empty or undefined', () => {
    const { container } = renderWithTranslations(<ResponseList />);
    expect(container.firstChild).toBeNull();

    const { container: emptyContainer } = renderWithTranslations(<ResponseList responses={{}} />);
    expect(emptyContainer.firstChild).toBeNull();
  });

  it('should render response status codes and description', () => {
    const responses: IOpenApiResponses = {
      '200': {
        description: 'Operation successful',
        content: {
          'application/json': {
            example: { result: 'ok' },
          },
        },
      },
      '400': {
        description: 'Bad request parameters',
      },
    };

    renderWithTranslations(<ResponseList responses={responses} />);

    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
    expect(screen.getByText('400')).toBeInTheDocument();
    expect(screen.getByText('Bad request parameters')).toBeInTheDocument();
  });
});
