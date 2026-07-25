import { useLanguage } from '../contexts/LanguageContext';
import styles from './Header.module.css';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandMark} aria-hidden="true">S</div>
          <div className={styles.title}>{t.header.title}</div>
        </div>
        <button
          className={styles.languageToggle}
          onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        >
          {t.header.languageToggle}
        </button>
      </div>
    </header>
  );
}