import { AboutHeroSection } from './about-hero-section/about-hero-section';

import styles from './about-page.module.scss';
import { AboutProjectSection } from './about-project-section/about-project-section';
import { ContributorsSection } from './contributors-section/contributors-section';
import { PoweredBySection } from './powered-by-section/powered-by-section';
import { UsefulLinksSection } from './useful-links-section/useful-links-section';

export function AboutPage() {
  return (
    <div className={styles.container}>
      <AboutHeroSection />
      <AboutProjectSection />
      <ContributorsSection />
      <PoweredBySection />
      <UsefulLinksSection />
    </div>
  );
}
