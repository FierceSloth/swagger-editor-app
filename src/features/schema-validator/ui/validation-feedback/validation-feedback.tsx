import { OctagonAlert as ErrorIcon, ShieldCheck as SuccessIcon, TriangleAlert as WarningIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import styles from './validation-feedback.module.scss';

interface IProps {
  errorsCount: number;
  warningsCount: number;
}

const statusMap = {
  error: { Icon: ErrorIcon, colorClass: styles.error },
  warning: { Icon: WarningIcon, colorClass: styles.warning },
  success: { Icon: SuccessIcon, colorClass: styles.success },
};

function getStatus(errorsCount: number, warningsCount: number): keyof typeof statusMap {
  if (errorsCount > 0) return 'error';
  if (warningsCount > 0) return 'warning';
  return 'success';
}

export function ValidationFeedback({ errorsCount, warningsCount }: IProps) {
  const t = useTranslations('SwaggerEditor');
  const status = getStatus(errorsCount, warningsCount);

  const { Icon, colorClass } = statusMap[status];

  return (
    <div className={styles.wrapper}>
      <Icon className={clsx(colorClass, styles.icon)} />
      <span className={styles.text}>{t('validation_feedback', { errors: errorsCount, warnings: warningsCount })}</span>
    </div>
  );
}
