'use client';

import {
  Check as CheckIcon,
  CircleX as CircleXIcon,
  Info as InfoIcon,
  TriangleAlert as TriangleAlertIcon,
  X as CloseIcon,
} from 'lucide-react';
import { createContext, type ReactNode, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import styles from './toast.module.scss';

type ToastVariant = 'success' | 'error' | 'alert' | 'info';

interface ToastPayload {
  title: string;
  message?: string;
  variant?: ToastVariant;
}

interface Toast extends Required<ToastPayload> {
  id: string;
}

export interface ToastContextValue {
  showToast: (toast: ToastPayload) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_ICON = {
  success: CheckIcon,
  error: CircleXIcon,
  alert: TriangleAlertIcon,
  info: InfoIcon,
};

interface IProps {
  children: ReactNode;
}

export function ToastProvider({ children }: IProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const closeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message = '', variant = 'info' }: ToastPayload) => {
      const id = uuidv4();

      const toast: Toast = {
        id,
        title,
        message,
        variant,
      };

      setToasts((currentToasts) => [...currentToasts, toast]);

      setTimeout(() => {
        closeToast(id);
      }, 5000);
    },
    [closeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className={styles.container}>
        {toasts.map((toast) => {
          const Icon = TOAST_ICON[toast.variant];

          return (
            <div key={toast.id} className={clsx(styles.toast, styles[toast.variant])}>
              <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
              </div>

              <div className={styles.content}>
                <p className={styles.label}>{toast.variant.toUpperCase()}</p>
                <h3 className={styles.title}>{toast.title}</h3>

                {toast.message && <p className={styles.message}>{toast.message}</p>}
              </div>

              <button type="button" className={styles.closeButton} onClick={() => closeToast(toast.id)}>
                <CloseIcon className={styles.closeIcon} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
