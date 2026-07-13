import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../../../../messages/en.json';
import { HistoryIntro } from './history-intro';

vi.mock('next-intl/server', () => ({
  getTranslations: (namespace: string) => {
    const section = (messages as Record<string, any>)[namespace] || {};
    return Promise.resolve((key: string, values?: Record<string, any>) => {
      let val = section[key] || key;
      if (values) {
        Object.entries(values).forEach(([k, v]) => {
          val = val.replace(`{${k}}`, v);
        });
      }
      return val;
    });
  },
}));

describe('HistoryIntro Component', () => {
  it('should render page title, description, and session badge', async () => {
    const Resolved = await HistoryIntro();
    render(Resolved);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(messages.HistoryPage.title);
    expect(screen.getByText(messages.HistoryPage.description)).toBeInTheDocument();
    expect(screen.getByText('USER_ANALYTICS // SESSION:0492')).toBeInTheDocument();
  });
});
