import { ROUTES } from '@/shared/config/routes';
import { Link } from '@/shared/config/i18n/navigation';

import styles from '../header.module.scss';

interface IProps {
  aboutLabel: string;
}

export function PageNavigation({ aboutLabel }: IProps) {
  return (
    <nav className={styles.nav}>
      <Link href={ROUTES.ABOUT}>{aboutLabel}</Link>
    </nav>
  );
}
