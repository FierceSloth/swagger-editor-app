import { getTranslations } from 'next-intl/server';

import { technologiesConfig } from '../../model/technologies';
import { TechnologyItem } from '../technology-item/technology-item';
import styles from './powered-by-section.module.scss';

export async function PoweredBySection() {
  const t = await getTranslations('PoweredBy');

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{t('title')}</h2>
      </div>

      <div className={styles.grid}>
        {technologiesConfig.map((technology) => (
          <TechnologyItem key={technology.id} name={technology.name} icon={technology.icon} />
        ))}
      </div>
    </div>
  );
}
