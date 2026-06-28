import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

import en from '../../messages/en.json';
import ru from '../../messages/ru.json';

interface MessagesByLocale {
  en: AbstractIntlMessages;
  ru: AbstractIntlMessages;
}

const messagesByLocale: MessagesByLocale = {
  en,
  ru,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
