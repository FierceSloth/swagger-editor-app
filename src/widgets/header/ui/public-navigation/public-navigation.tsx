import { ROUTES } from '@/shared/config/routes';
import { ButtonLink } from '@/shared/ui/button-link';

import styles from '../header.module.scss';

interface IProps {
  signInLabel: string;
  signUpLabel: string;
}

export function PublicNavigation({ signInLabel, signUpLabel }: IProps) {
  return (
    <>
      <ButtonLink variant="primary" href={ROUTES.LOGIN} className={styles.button}>
        {signInLabel}
      </ButtonLink>
      <ButtonLink variant="secondary" href={ROUTES.REGISTER} className={styles.button}>
        {signUpLabel}
      </ButtonLink>
    </>
  );
}
