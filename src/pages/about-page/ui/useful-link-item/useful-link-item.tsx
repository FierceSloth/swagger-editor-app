import type { ComponentType, SVGProps } from 'react';

import styles from './useful-link-item.module.scss';

interface IProps {
  title: string;
  description: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function UsefulLinkItem({ title, description, href, Icon }: IProps) {
  return (
    <a className={styles.item} href={href} target="_blank" rel="noopener noreferrer">
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </a>
  );
}
