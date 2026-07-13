import { getTranslations } from 'next-intl/server';

import { Card } from '../card/card';
import { contributorsConfig } from '../../model/contributors';

import styles from './contributors-section.module.scss';

export async function ContributorsSection() {
  const t = await getTranslations('Contributors');

  const contributors = contributorsConfig.map((contributor) => ({
    id: contributor.id,
    name: t(`items.${contributor.id}.name`),
    role: t(`items.${contributor.id}.role`),
    description: t(`items.${contributor.id}.description`),
    avatarUrl: contributor.avatarUrl,
    githubUrl: contributor.githubUrl,
    roleVariant: contributor.roleVariant,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{t('title')}</h2>
        <div className={styles.line} />
      </div>

      <div className={styles.grid}>
        {contributors.map((contributor) => (
          <Card
            key={contributor.id}
            name={contributor.name}
            role={contributor.role}
            description={contributor.description}
            avatarUrl={contributor.avatarUrl}
            githubUrl={contributor.githubUrl}
            roleVariant={contributor.roleVariant}
          />
        ))}
      </div>
    </div>
  );
}
