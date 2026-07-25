import { Icon } from '../Icon';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">S</div>
        <div className={styles.brandWord}>SanBayGo</div>
      </div>

      <div className={styles.search}>
        <Icon name="search" size={16} />
        <span>Tìm chuyến gần đây</span>
      </div>

      <div className={styles.section}>PLAN</div>
      <NavItem label="So sánh" active />
      <NavItem label="Tuyến thường dùng" />
      <NavItem label="Lịch sử" />

      <div className={styles.section}>REFERENCE</div>
      <NavItem label="Bảng giá Bus 86" />
      <NavItem label="Giờ cao điểm" />
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
