import { Icon } from '../Icon';
import styles from './TopBar.module.css';

interface Props {
  title: string;
  onMenu?: () => void;
}

export function TopBar({ title, onMenu }: Props) {
  return (
    <header className={styles.bar}>
      <button type="button" className={styles.menuBtn} onClick={onMenu} aria-label="menu">
        <Icon name="menu" size={22} />
      </button>
      <div className={styles.title}>{title}</div>
      <div style={{ width: 22 }} aria-hidden="true" />
    </header>
  );
}

export function TabletTopBar() {
  return (
    <header className={styles.tablet}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">S</div>
        <span className={styles.brandWord}>SanBayGo</span>
      </div>
      <nav className={styles.tabs} aria-label="primary">
        <button className={`${styles.tab} ${styles.tabActive}`}>So sánh</button>
        <button className={styles.tab}>Lịch sử</button>
        <button className={styles.tab}>Tham khảo</button>
      </nav>
      <div style={{ width: 80 }} />
    </header>
  );
}
