import type { ReactElement } from 'react';

import styles from './arc-background.module.scss';

export function ArcBackground(): ReactElement {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.arc} />
      <div className={styles.wash} />
    </div>
  );
}
