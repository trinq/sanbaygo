import { useLanguage } from '../contexts/LanguageContext';
import styles from './Header.module.css';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.icon}>🚌</span>
          <span className={styles.title}>{t.header.title}</span>
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
