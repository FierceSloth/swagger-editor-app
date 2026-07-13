import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import messages from '../../../../../messages/en.json';
import type { IOpenApiParameter } from '../../types/openapi-types';
import { EndpointParameters } from './endpoint-parameters';

const renderWithTranslations = (ui: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('EndpointParameters Component', () => {
  it('should render null when parameters array is empty or undefined', () => {
    const { container } = renderWithTranslations(<EndpointParameters parameters={[]} />);
    expect(container.firstChild).toBeNull();

    const { container: containerUndefined } = renderWithTranslations(<EndpointParameters />);
    expect(containerUndefined.firstChild).toBeNull();
  });

  it('should render table with correct headings and values', () => {
    const parameters: IOpenApiParameter[] = [
      {
        name: 'X-Aura-Key',
        in: 'header',
        required: true,
        schema: { type: 'string' },
        description: 'Global API access token',
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        type: 'integer',
        description: 'Limit items count',
      },
    ];

    renderWithTranslations(<EndpointParameters parameters={parameters} />);

    expect(screen.getByRole('heading', { name: /parameters/i })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /in/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /type/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /required/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /description/i })).toBeInTheDocument();

    expect(screen.getByText('X-Aura-Key')).toBeInTheDocument();
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('string')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('Global API access token')).toBeInTheDocument();

    expect(screen.getByText('limit')).toBeInTheDocument();
    expect(screen.getByText('query')).toBeInTheDocument();
    expect(screen.getByText('integer')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Limit items count')).toBeInTheDocument();
  });

  it('should display dash for missing description', () => {
    const parameters: IOpenApiParameter[] = [
      {
        name: 'id',
        in: 'path',
        required: true,
        type: 'string',
      },
    ];

    renderWithTranslations(<EndpointParameters parameters={parameters} />);

    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
