import { Icon } from '../Icon';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { t } = useLanguage();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">S</div>
        <div className={styles.brandWord}>{t.layout.brand}</div>
      </div>

      <div className={styles.search}>
        <Icon name="search" size={16} />
        <span>{t.layout.sidebar.search}</span>
      </div>

      <div className={styles.section}>{t.layout.sidebar.sectionPlan}</div>
      <NavItem label={t.layout.sidebar.navCompare} active />
      <NavItem label={t.layout.sidebar.navFavorites} />
      <NavItem label={t.layout.sidebar.navHistory} />

      <div className={styles.section}>{t.layout.sidebar.sectionReference}</div>
      <NavItem label={t.layout.sidebar.navBusPricing} />
      <NavItem label={t.layout.sidebar.navPeakHours} />
    </aside>
  );
}

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      role="link"
      tabIndex={0}
      className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
    >
      <span className={styles.navDot} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
