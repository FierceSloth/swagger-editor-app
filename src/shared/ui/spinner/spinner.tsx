import clsx from 'clsx';

import styles from './spinner.module.scss';
import { getTranslations } from 'next-intl/server';

export async function Spinner() {
  const t = await getTranslations('Spinner');

  return (
    <div className={styles.container}>
      <div className={styles.spinnerPhase}>
        <div className={clsx(styles.phaseRing, styles.ringA)} />
        <div className={clsx(styles.phaseRing, styles.ringB)} />
        <div className={clsx(styles.phaseRing, styles.ringC)} />
        <div className={styles.phaseCore} />
      </div>
      <span className={styles.label}>{t('label')}</span>
    </div>
  );
}
