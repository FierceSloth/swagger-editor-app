import { getTranslations } from 'next-intl/server';

import { usefulLinksConfig } from '../../model/useful-links';
import { UsefulLinkItem } from '../useful-link-item/useful-link-item';

import styles from './useful-links-section.module.scss';

export async function UsefulLinksSection() {
  const t = await getTranslations('UsefulLinks');

  const usefulLinks = usefulLinksConfig.map((link) => ({
    id: link.id,
    title: t(`items.${link.id}.title`),
    description: t(`items.${link.id}.description`),
    href: link.href,
    Icon: link.Icon,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{t('title')}</h2>
        <div className={styles.line} />
      </div>

      <div className={styles.grid}>
        {usefulLinks.map((link) => (
          <UsefulLinkItem
            key={link.id}
            title={link.title}
            description={link.description}
            href={link.href}
            Icon={link.Icon}
          />
        ))}
      </div>
    </div>
  );
}
