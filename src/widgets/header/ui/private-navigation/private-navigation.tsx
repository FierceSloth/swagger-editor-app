import { ButtonLink } from '@/shared/ui/button-link';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';

import styles from '../header.module.scss';

interface IProps {
  historyLabel: string;
  signOutLabel: string;
}

export function PrivateNavigation({ historyLabel, signOutLabel }: IProps) {
  return (
    <>
      <ButtonLink variant="primary" href={ROUTES.HISTORY} className={styles.button}>
        {historyLabel}
      </ButtonLink>
      <Button variant="secondary" className={styles.button}>
        {signOutLabel}
      </Button>
    </>
  );
}
