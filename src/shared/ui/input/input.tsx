import clsx from 'clsx';
import { CircleAlert as AlertIcon } from 'lucide-react';
import { useId, type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import styles from './input.module.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
  withErrorPlug?: boolean;
}

export function Input({ label, error, className, ref, id, withErrorPlug = true, ...rest }: IProps): ReactNode {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={clsx(styles.wrapper, className)}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>

      <input className={clsx(styles.input, error && styles.inputError)} id={inputId} ref={ref} {...rest} />

      {(error || withErrorPlug) && (
        <div className={clsx(styles.errorContainer, withErrorPlug && styles.withPlug)}>
          {error && (
            <>
              <AlertIcon className={styles.errorIcon} />
              <span className={styles.errorMessage}>{error}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
