import Image from 'next/image';

import styles from './card.module.scss';
import { GlassCard } from '@/shared/ui/glass-card';
import { GitHubIcon } from '@/shared/ui/github-icon';

interface IProps {
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
  githubUrl: string;
  roleVariant: 'blue' | 'green' | 'yellow';
}

export function Card({ name, role, description, avatarUrl, githubUrl, roleVariant }: IProps) {
  const roleClassName = {
    blue: styles.roleBlue,
    green: styles.roleGreen,
    yellow: styles.roleYellow,
  }[roleVariant];

  return (
    <GlassCard className={styles.card}>
      <div className={styles.avatar}>
        <Image className={styles.avatarImage} src={avatarUrl} alt={name} width={320} height={320} loading="eager" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={`${styles.role} ${roleClassName}`}>{role}</p>
        <p className={styles.description}>{description}</p>
        <a className={styles.githubLink} href={githubUrl} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className={styles.githubIcon} />
        </a>
      </div>
    </GlassCard>
  );
}
