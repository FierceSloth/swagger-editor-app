import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '../../../../../messages/en.json';
import type { IEndpointGroup } from '../../types/openapi-types';
import { EndpointList } from './endpoint-list';

const renderWithTranslations = (ui: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('EndpointList Component', () => {
  it('should render groups and endpoint list with paths and methods', () => {
    const groups: IEndpointGroup[] = [
      {
        tag: 'Users',
        endpoints: [
          {
            id: 'get-users',
            path: '/users',
            method: 'get',
            summary: 'Retrieve all users',
            details: {
              parameters: [],
              responses: {},
            },
          },
        ],
      },
    ];

    renderWithTranslations(<EndpointList groups={groups} serverUrl="https://api.example.com" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Users' })).toBeInTheDocument();
    expect(screen.getByText('/users')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('Retrieve all users')).toBeInTheDocument();
  });
});
