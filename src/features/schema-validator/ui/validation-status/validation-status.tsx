import { Badge } from '@/shared/ui/badge';
import { X as InvalidIcon, Check as ValidIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import styles from './validation-status.module.scss';

interface IProps {
  isValid: boolean;
}

export function ValidationStatus({ isValid }: IProps) {
  const t = useTranslations('SwaggerEditor');

  return isValid ? (
    <Badge className={styles.badge} color="green">
      <ValidIcon className={styles.validIcon} /> {t('valid_schema')}
    </Badge>
  ) : (
    <Badge className={styles.badge} color="red">
      <InvalidIcon className={styles.invalidIcon} /> {t('invalid_schema')}
    </Badge>
  );
}
