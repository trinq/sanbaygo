import { Icon } from '../Icon';
import styles from './ResultPage.module.css';

interface ResultPageProps {
  onBack: () => void;
}

export function ResultPage({ onBack }: ResultPageProps) {
  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button
            type="button"
            onClick={onBack}
            className={styles.backButton}
            aria-label="Quay lại"
          >
            <ArrowLeftIcon />
          </button>
          <div className={styles.headerCenter}>
            <h1 className={styles.headerTitle}>Sân bay Nội Bài (T2)</h1>
            <div className={styles.headerSubtitle}>
              <span>Đến</span>
              <ChevronRightIcon />
              <span>Phố Cổ, Hà Nội</span>
            </div>
          </div>
          <div style={{ width: 36 }} aria-hidden="true" />
        </div>
      </header>

      {/* ── Main ── */}
      <main className={styles.main}>
        {/* Page title */}
        <div className={styles.pageTitleBlock}>
          <h2 className={styles.pageTitle}>Phương án di chuyển tốt nhất</h2>
          <p className={styles.pageSubtitle}>
            <Icon name="airport" size={16} color="#0284C7" />
            Dự kiến hạ cánh lúc{' '}
            <span className={styles.pageSubtitleMark}>14:30</span>
          </p>
        </div>

        {/* ── Primary option: Bus ── */}
        <article className={styles.primaryCard}>
          <div className={styles.primaryCardAccent} aria-hidden="true" />
          <div className={styles.primaryCardBody}>
            <div className={styles.primaryHeader}>
              <div className={styles.primaryLeft}>
                <div className={styles.primaryIcon}>
                  <Icon name="bus" size={24} color="#0284C7" />
                </div>
                <div className={styles.primaryHeading}>
                  <div className={styles.badgeRecommended}>Khuyên dùng</div>
                  <h3 className={styles.primaryOptionName}>Tuyến Buýt 86</h3>
                  <p className={styles.primaryOptionTagline}>
                    Nhanh chóng & Tiết kiệm nhất
                  </p>
                </div>
              </div>
              <div className={styles.primaryPrice}>
                <div className={styles.primaryPriceValue}>45.000₫</div>
                <div className={styles.primaryPriceUnit}>/ hành khách</div>
              </div>
            </div>

            {/* Journey Timeline — 4 steps */}
            <div className={styles.timeline}>
              <div className={styles.timelineConnector} aria-hidden="true" />

              {/* Pickup */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineDotCol}>
                  <span className={styles.timelineDot} aria-hidden="true" />
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>Điểm đón: Sảnh đến T2, Cột 2</h4>
                  <div className={styles.timelineInline}>
                    <FootprintsIcon />
                    <span>Khoảng 3 phút đi bộ từ cửa ra</span>
                  </div>
                </div>
              </div>

              {/* Departure */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineDotCol}>
                  <span className={styles.timelineDot} aria-hidden="true" />
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>Lên xe / Khởi hành</h4>
                  <div className={styles.timelineInline}>
                    <Icon name="clock" size={14} color="#64748B" />
                    <span>Dự kiến khởi hành lúc <strong>14:50</strong></span>
                  </div>
                </div>
              </div>

              {/* Transit */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineDotCol}>
                  <span className={`${styles.timelineDot} ${styles.timelineDotMuted}`} aria-hidden="true" />
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>Thời gian di chuyển</h4>
                  <div className={styles.timelineInline}>
                    <Icon name="bus" size={14} color="#64748B" />
                    <span><strong>45 – 50 phút</strong> về đến trung tâm</span>
                  </div>
                </div>
              </div>

              {/* Dropoff */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineDotCol}>
                  <span className={`${styles.timelineDot} ${styles.timelineDotFinal}`} aria-hidden="true" />
                </div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>Điểm trả: Ga Hà Nội / Phố Cổ</h4>
                </div>
              </div>
            </div>

            {/* Notes */}
            <aside className={styles.callout}>
              <span className={styles.calloutIcon} aria-hidden="true">
                <Icon name="info" size={20} color="#F59E0B" />
              </span>
              <div className={styles.calloutBody}>
                <h5 className={styles.calloutTitle}>Ghi chú chuyến đi</h5>
                <p className={styles.calloutText}>
                  Thanh toán trực tiếp bằng tiền mặt hoặc thẻ trên xe. Có chỗ để hành lý rộng rãi dưới gầm.
                </p>
              </div>
            </aside>
          </div>
        </article>

        {/* ── Divider ── */}
        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerRule} />
          <span className={styles.dividerLabel}>Hoặc gọi xe</span>
          <span className={styles.dividerRule} />
        </div>

        {/* ── Secondary option: Ride-hail ── */}
        <a
          className={styles.secondaryCard}
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label="Gọi Grab hoặc Taxi công nghệ"
        >
          <div className={styles.secondaryInner}>
            <div className={styles.secondaryLeft}>
              <div className={styles.secondaryIcon}>
                <Icon name="taxi" size={24} color="#059669" />
              </div>
              <div className={styles.secondaryHeading}>
                <h3 className={styles.secondaryTitle}>Gọi Grab / Taxi Công nghệ</h3>
                <div className={styles.secondaryMeta}>
                  <span className={styles.secondaryMetaItem}>
                    <Icon name="clock" size={16} color="#94A3B8" />
                    <strong>~35 phút</strong>
                  </span>
                  <span className={styles.secondaryMetaDot} aria-hidden="true" />
                  <span className={styles.secondaryMetaItem}>
                    <Icon name="pin" size={16} color="#94A3B8" />
                    <span>Điểm đón: Cột 4 - Cột 6</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.secondaryRight}>
              <div className={styles.secondaryPrice}>
                <div className={styles.secondaryPriceLabel}>Giá tham khảo</div>
                <div className={styles.secondaryPriceValue}>~ 250.000₫</div>
              </div>
              <button type="button" className={styles.secondaryCta}>
                <NavigationIcon />
                Mở ứng dụng
              </button>
            </div>
          </div>
        </a>
      </main>
    </div>
  );
}

/* ── Inline icons (lucide-style, 24×24 viewBox, stroke 2) ── */

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M5 12l7 7M5 12l7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FootprintsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 16v-2a3 3 0 013-3h2a3 3 0 013 3v2M7 18v3M14 16v-2a3 3 0 013-3h2a3 3 0 013 3v2M17 18v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavigationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 11l18-8-8 18-2-8-8-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}