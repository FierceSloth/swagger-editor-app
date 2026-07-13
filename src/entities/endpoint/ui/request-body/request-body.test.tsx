import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '../../../../../messages/en.json';
import type { IOpenApiRequestBody } from '../../types/openapi-types';
import { RequestBody } from './request-body';

const renderWithTranslations = (ui: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('RequestBody Component', () => {
  it('should render null if no requestBody', () => {
    const { container } = renderWithTranslations(<RequestBody />);
    expect(container.firstChild).toBeNull();
  });

  it('should render request body description and type', () => {
    const requestBody: IOpenApiRequestBody = {
      description: 'User details',
      required: true,
      content: {
        'application/json': {
          example: { name: 'John' },
        },
      },
    };

    renderWithTranslations(<RequestBody requestBody={requestBody} />);
    expect(screen.getByText('User details')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
  });
});
