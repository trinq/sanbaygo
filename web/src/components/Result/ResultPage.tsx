import { useState } from 'react';
import { Icon } from '../Icon';
import { RouteMap } from '../RouteMap';
import { BUS_152_MAP } from '@core/data/route-maps/bus152';
import { BUS_109_STOPS } from '../RouteMap/Bus109Stops';
import { BUS_86_STOPS } from '../RouteMap/Bus86Stops';
import { CountdownTimer } from './CountdownTimer';
import { AIRPORTS, DESTINATIONS_BY_AIRPORT } from '@core';
import type { ArrivalResult, ArrivalFormData, AirportId } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ResultPage.module.css';

/**
 * Infer route direction from destination context.
 *
 * - If destination is a terminal (user is leaving airport by bus) → outbound
 * - If destination is a city location (user is going to airport) → return
 *
 * Currently the app only supports "from airport" flows, so this always
 * returns 'outbound' unless the destination matches a terminal ID.
 */
function inferRouteDirection(
  destinationId: string | null,
  airportId: AirportId,
): 'outbound' | 'return' {
  if (!destinationId) return 'outbound';
  const airport = AIRPORTS[airportId];
  const isTerminalDestination = airport.terminals.some((t) => t.id === destinationId);
  return isTerminalDestination ? 'return' : 'outbound';
}

interface ResultPageProps {
  onBack: () => void;
  formData: ArrivalFormData;
  result: ArrivalResult;
}

export function ResultPage({ onBack, formData, result }: ResultPageProps) {
  const { t } = useLanguage();
  const [routeDirection, setRouteDirection] = useState<'outbound' | 'return'>(() =>
    inferRouteDirection(formData.destination, formData.airportId),
  );
  const airport = AIRPORTS[formData.airportId];
  const terminal = airport.terminals.find((t) => t.id === formData.terminal);
  const destination = DESTINATIONS_BY_AIRPORT[formData.airportId].find(
    (d) => d.id === formData.destination,
  );

  const trip = result.bus.trip;
  const catchable = result.bus.available && trip;
  const selectedRoute = trip?.selectedRoute;

  const busPickupLocation =
    selectedRoute?.pickupPoints.find((p) => p.terminalId === formData.terminal)?.location ??
    '';
  // Grab pickup location: prefer airport-specific hint (e.g. pillar 34 at
  // SGN-T3), fall back to bus pickup point (most terminals share curbside
  // lanes for bus and ride-hail), then terminal name as last resort.
  // Bus and Grab pickup points are RENDERED SEPARATELY — bus timeline shows
  // busPickupLocation, ride-hail card shows grabPickupLocation. They must
  // never share the same variable (regression: a 2026-07-27 bug at SGN-T3
  // caused the bus timeline to inherit Grab's "Cột 34 PNA" string).
  const grabPickupLocation =
    result.grab.pickupLocation ?? busPickupLocation ?? terminal?.name ?? '';

  const priceFormatted = trip ? `${trip.ticketPrice.toLocaleString('vi-VN')}₫` : '—';
  const grabPriceNumber = result.grab.priceEstimate.split(' - ')[0];
  const grabPriceFormatted = `${grabPriceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫`;
  const travelMin = trip?.arrivalEstimate?.minutesRange.min ?? 0;
  const travelMax = trip?.arrivalEstimate?.minutesRange.max ?? 0;

  const busRouteNumber = selectedRoute?.routeNumber ?? '152';
  const busStops =
    busRouteNumber === '109'
      ? BUS_109_STOPS
      : busRouteNumber === '86'
        ? BUS_86_STOPS
        : { outbound: BUS_152_MAP.outboundStops, return: BUS_152_MAP.returnStops };

  // Destination → bus stop ID mapping for RouteMap highlight
  // Maps destination IDs to stop IDs. Each bus route has its own stop IDs.
  const getDestinationStopId = (dest: string | null): string | undefined => {
    if (!dest) return undefined;
    // For Bus 152, use the structured mapping from core
    if (busRouteNumber === '152') {
      return BUS_152_MAP.destinationToStopId[dest];
    }
    // For other buses, use inline mappings
    if (busRouteNumber === '109') {
      const mapping109: Record<string, string> = {
        'ga-t3': 'ga-t3',
        'q1': 'ben-xe-buýt-sg',
      };
      return mapping109[dest];
    }
    if (busRouteNumber === '86') {
      const mapping86: Record<string, string> = {
        'han-t1': 'ga-t1',
        'han-t2': 'ga-t2',
        'old-quarter': 'ga-hà-nội',
        'hoan-kiem': 'ga-hà-nội',
        'dong-da': 'ga-hà-nội',
        'ba-dinh': 'ga-hà-nội',
        'cau-giay': 'ga-hà-nội',
        'other': 'ga-hà-nội',
      };
      return mapping86[dest];
    }
    return undefined;
  };

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
            <h1 className={styles.headerTitle}>
              {airport.name} {terminal ? `(${terminal.name})` : ''}
            </h1>
            <div className={styles.headerSubtitle}>
              <span>Đến</span>
              <ChevronRightIcon />
              <span>{destination?.name ?? '—'}</span>
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
            <span className={styles.pageSubtitleMark}>{formData.arrivalTime}</span>
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
                  {catchable && (
                    <div className={styles.badgeRecommended}>Khuyên dùng</div>
                  )}
                  <h3 className={styles.primaryOptionName}>
                    {catchable && selectedRoute
                      ? `Tuyến Buýt ${selectedRoute.routeNumber}`
                      : result.bus.reason === 'too_late'
                        ? t.results.busTooLate
                        : result.bus.reason === 'missed_last'
                          ? t.results.busMissedLast
                          : result.bus.reason === 'no_service'
                            ? t.results.busNoService
                            : 'Không có chuyến phù hợp'}
                  </h3>
                  <p className={styles.primaryOptionTagline}>
                    {catchable ? 'Nhanh chóng & Tiết kiệm nhất' : 'Vui lòng gọi xe công nghệ'}
                  </p>
                </div>
              </div>
              <div className={styles.primaryPrice}>
                <div className={styles.primaryPriceValue}>{priceFormatted}</div>
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
                  <h4 className={styles.timelineTitle}>
                    Điểm đón: {busPickupLocation}
                  </h4>
                  <div className={styles.timelineInline}>
                    <FootprintsIcon />
                    <span>Khoảng {destination?.walkingMinutes ?? '—'} phút đi bộ từ cửa ra</span>
                  </div>
                </div>
              </div>

              {/* Departure */}
              {catchable && trip && (
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDotCol}>
                    <span className={styles.timelineDot} aria-hidden="true" />
                  </div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineTitle}>Lên xe / Khởi hành</h4>
                    <div className={styles.timelineInline}>
                      <Icon name="clock" size={14} color="#64748B" />
                      <span>Dự kiến khởi hành lúc <strong>{trip.departureTime}</strong></span>
                    </div>
                    <CountdownTimer trip={trip} />
                  </div>
                </div>
              )}

              {/* Transit */}
              {catchable && (
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDotCol}>
                    <span
                      className={`${styles.timelineDot} ${styles.timelineDotMuted}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineTitle}>Thời gian di chuyển</h4>
                    <div className={styles.timelineInline}>
                      <Icon name="bus" size={14} color="#64748B" />
                      <span>
                        <strong>{travelMin} – {travelMax} phút</strong> về đến {destination?.name ?? 'trung tâm'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dropoff */}
              {catchable && (
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDotCol}>
                    <span
                      className={`${styles.timelineDot} ${styles.timelineDotFinal}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineTitle}>
                      Điểm trả: {destination?.nearestBusStop ?? destination?.name ?? '—'}
                    </h4>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <aside className={styles.callout}>
              <span className={styles.calloutIcon} aria-hidden="true">
                <Icon name="info" size={20} color="#F59E0B" />
              </span>
              <div className={styles.calloutBody}>
                <h5 className={styles.calloutTitle}>Ghi chú chuyến đi</h5>
                <p className={styles.calloutText}>
                  {catchable
                    ? 'Thanh toán trực tiếp bằng tiền mặt hoặc thẻ trên xe. Có chỗ để hành lý rộng rãi dưới gầm.'
                    : 'Chuyến cuối đã khởi hành. Vui lòng sử dụng Grab hoặc taxi công nghệ.'}
                </p>
              </div>
            </aside>
          </div>
        </article>

        {/* ── Route Map ── */}
        {result.bus && (
          <RouteMap
            stops={busStops}
            direction={routeDirection}
            selectedStopId={getDestinationStopId(formData.destination)}
            onDirectionChange={setRouteDirection}
          />
        )}

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
                    <strong>~{result.grab.travelTime.minutesRange.min} phút</strong>
                  </span>
                  <span className={styles.secondaryMetaDot} aria-hidden="true" />
                  <span className={styles.secondaryMetaItem}>
                    <Icon name="pin" size={16} color="#94A3B8" />
                    <span>Điểm đón: {grabPickupLocation}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.secondaryRight}>
              <div className={styles.secondaryPrice}>
                <div className={styles.secondaryPriceLabel}>Giá tham khảo</div>
                <div className={styles.secondaryPriceValue}>~ {grabPriceFormatted}</div>
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