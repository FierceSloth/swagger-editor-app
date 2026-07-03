import { SwaggerEditor } from '@/widgets/swagger-editor';
import styles from './home-page.module.scss';

export function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <SwaggerEditor />
      </div>
      <div className={styles.viewer}>
        <div className={styles.stub}>
          <h2>Very Cool SwaggerViewer</h2>
        </div>
      </div>
    </div>
  );
}
