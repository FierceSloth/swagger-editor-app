import { Link } from '@/shared/config/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import Image from 'next/image';

import styles from '../header.module.scss';

export function Logo() {
  return (
    <Link href={ROUTES.HOME}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="AURA Editor" width={40} height={40} />
        <div className={styles.logoText}>
          AURA <span>{'// EDITOR'}</span>
        </div>
      </div>
    </Link>
  );
}
