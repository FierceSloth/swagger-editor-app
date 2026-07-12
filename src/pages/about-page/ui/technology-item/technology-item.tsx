import Image from 'next/image';

import styles from './technology-item.module.scss';

interface IProps {
  name: string;
  icon: string;
}

export function TechnologyItem({ name, icon }: IProps) {
  return (
    <div className={styles.item}>
      <Image className={styles.icon} src={icon} alt={name} width={20} height={20} />
      <span className={styles.name}>{name}</span>
    </div>
  );
}
