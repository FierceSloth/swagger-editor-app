import clsx from 'clsx';
import type { ReactNode } from 'react';

import { Accordion as AccordionPrimitive } from 'radix-ui';

import { ChevronDown } from 'lucide-react';
import styles from './accordion.module.scss';

interface IProps {
  className?: string;
  children?: ReactNode;
}

interface IItemProps extends IProps {
  value: string;
}

export function Accordion({ children, className }: IProps) {
  return (
    <AccordionPrimitive.Root type="multiple" className={clsx(styles.root, className)}>
      {children}
    </AccordionPrimitive.Root>
  );
}

export function AccordionItem({ value, children, className }: IItemProps) {
  return (
    <AccordionPrimitive.Item value={value} className={clsx(styles.item, className)}>
      {children}
    </AccordionPrimitive.Item>
  );
}

export function AccordionTrigger({ children, className }: IProps) {
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger className={clsx(styles.trigger, className)}>
        {children}
        <ChevronDown className={styles.icon} aria-hidden />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ children, className }: IProps) {
  return (
    <AccordionPrimitive.Content className={clsx(styles.content, className)}>{children}</AccordionPrimitive.Content>
  );
}
