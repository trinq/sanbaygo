import { useLanguage } from '../contexts/LanguageContext';
import styles from './Header.module.css';

/**
 * Editorial-paper header.
 * The wordmark is a serif. The language toggle is a segmented pair — no icons.
 */
export function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.wordmark} href="/" aria-label="SanBayGo">
          <span className={styles.wordmarkName}>SanBayGo</span>
          <span className={styles.wordmarkSub}>Tuyến 86 · Nội Bài → Hà Nội</span>
        </a>

        <div className={styles.lang} role="group" aria-label="Language">
          <button
            type="button"
            className={`${styles.langBtn} ${language === 'vi' ? styles.langActive : ''}`}
            onClick={() => setLanguage('vi')}
            aria-pressed={language === 'vi'}
          >
            VI
          </button>
          <span className={styles.langDivider} aria-hidden="true">/</span>
          <button
            type="button"
            className={`${styles.langBtn} ${language === 'en' ? styles.langActive : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
