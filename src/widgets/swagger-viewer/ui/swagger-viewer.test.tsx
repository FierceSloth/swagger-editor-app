import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../../../messages/en.json';
import type { IOpenApiSchema } from './swagger-viewer';
import { SwaggerViewer } from './swagger-viewer';

vi.mock('react-markdown', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithTranslations = (ui: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

describe('SwaggerViewer Component', () => {
  it('should render null when schema is null', () => {
    const { container } = renderWithTranslations(<SwaggerViewer schema={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render API title, version, description and endpoints', () => {
    const schema: IOpenApiSchema = {
      openapi: '3.0.0',
      info: {
        title: 'Mock API',
        version: '1.0.0',
        description: 'Mock Description',
      },
      servers: [
        {
          url: 'https://api.mock.com',
          description: 'Mock Server',
        },
      ],
      paths: {
        '/test': {
          get: {
            summary: 'Test endpoint',
            responses: {},
          },
        },
      },
    };

    renderWithTranslations(<SwaggerViewer schema={schema} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Mock API' })).toBeInTheDocument();
    expect(screen.getByText('OpenApi // 3.0.0')).toBeInTheDocument();
    expect(screen.getByText('Mock Description')).toBeInTheDocument();
    expect(screen.getByText('https://api.mock.com')).toBeInTheDocument();
    expect(screen.getByText('/test')).toBeInTheDocument();
  });
});
