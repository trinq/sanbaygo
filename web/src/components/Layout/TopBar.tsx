import { Icon } from '../Icon';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './TopBar.module.css';

interface Props {
  title: string;
  onMenu?: () => void;
}

export function TopBar({ title, onMenu }: Props) {
  const { t, language, setLanguage } = useLanguage();
  return (
    <header className={styles.bar}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={onMenu}
        aria-label={t.layout.topBar.menuLabel}
      >
        <Icon name="menu" size={22} />
      </button>
      <div className={styles.title}>{title}</div>
      <button
        type="button"
        className={styles.langBtn}
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        aria-label={t.layout.languageToggle}
      >
        {t.layout.languageToggle}
      </button>
    </header>
  );
}

export function TabletTopBar() {
  const { t, language, setLanguage } = useLanguage();
  return (
    <header className={styles.tablet}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">S</div>
        <span className={styles.brandWord}>{t.layout.brand}</span>
      </div>
      <nav className={styles.tabs} aria-label="primary">
        <button className={`${styles.tab} ${styles.tabActive}`}>
          {t.layout.tabletTopBar.tabCompare}
        </button>
        <button className={styles.tab}>{t.layout.tabletTopBar.tabHistory}</button>
        <button className={styles.tab}>{t.layout.tabletTopBar.tabReference}</button>
      </nav>
      <button
        type="button"
        className={styles.langBtn}
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        aria-label={t.layout.languageToggle}
      >
        {t.layout.languageToggle}
      </button>
    </header>
  );
}
