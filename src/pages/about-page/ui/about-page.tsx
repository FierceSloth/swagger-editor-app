import { AboutHeroSection } from './about-hero-section/about-hero-section';

import styles from './about-page.module.scss';

export function AboutPage() {
  return (
    <div className={styles.container}>
      <AboutHeroSection />
    </div>
  );
}
