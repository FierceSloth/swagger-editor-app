import { OctagonAlert as ErrorIcon, ShieldCheck as SuccessIcon, TriangleAlert as WarningIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import styles from './validation-feedback.module.scss';
import clsx from 'clsx';

interface IProps {
  errorsCount: number;
  warningsCount: number;
}

const iconsMap = {
  error: { Icon: ErrorIcon, colorClass: styles.error },
  warning: { Icon: WarningIcon, colorClass: styles.warning },
  success: { Icon: SuccessIcon, colorClass: styles.success },
};

export function ValidationFeedback({ errorsCount, warningsCount }: IProps) {
  const t = useTranslations('SwaggerEditor');
  const status = errorsCount > 0 ? 'error' : warningsCount > 0 ? 'warning' : 'success';

  const { Icon, colorClass } = iconsMap[status];

  return (
    <div className={styles.wrapper}>
      <Icon className={clsx(colorClass, styles.icon)} />
      <span className={styles.text}>{t('validation_feedback', { errors: errorsCount, warnings: warningsCount })}</span>
    </div>
  );
}
