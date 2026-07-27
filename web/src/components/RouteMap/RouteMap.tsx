import React, { useMemo, useState } from 'react';
import { RouteMapProps, BusStop } from './types';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './RouteMap.module.css';

const GRID_UNIT_X = 80;
const GRID_UNIT_Y = 60;
const OFFSET_X = 100;
const OFFSET_Y = 40;

function getPoint(x: number, y: number) {
  return {
    cx: OFFSET_X + x * GRID_UNIT_X,
    cy: OFFSET_Y + y * GRID_UNIT_Y,
  };
}

function getLabelClasses(pos: BusStop['labelPos']) {
  switch (pos) {
    case 'top':
      return styles.labelTop;
    case 'bottom':
      return styles.labelBottom;
    case 'left':
      return styles.labelLeft;
    case 'right':
      return styles.labelRight;
  }
}

function getLabelClass(stop: BusStop) {
  if (stop.type === 'hub') return styles.stopLabelHub;
  if (stop.type === 'terminal') return styles.stopLabelTerminal;
  return styles.stopLabel;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  stops,
  direction,
  selectedStopId,
  onDirectionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();
  const activeStops = direction === 'outbound' ? stops.outbound : stops.return;

  const { pathD } = useMemo(() => {
    const points = activeStops.map(s => getPoint(s.position.x, s.position.y));

    const d = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.cx} ${p.cy}`)
      .join(' ');

    return { pathD: d };
  }, [activeStops]);

  return (
    <div className={styles.routeWrapper}>
      <button
        className={styles.expandButton}
        onClick={() => setIsExpanded(!isExpanded)}
        data-expanded={isExpanded}
      >
        {t.results.tapToExpandRoute}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className={styles.content} data-expanded={isExpanded}>
        <div className={styles.directionToggle}>
          <button
            className={styles.directionButton}
            data-active={direction === 'outbound'}
            onClick={() => onDirectionChange('outbound')}
          >
            Hướng đi
          </button>
          <button
            className={styles.directionButton}
            data-active={direction === 'return'}
            onClick={() => onDirectionChange('return')}
          >
            Hướng về
          </button>
        </div>

        <div className={styles.mapContainer}>
          <div className={styles.svgContainer}>
            {/* SVG layer — route line + direction arrows */}
            <svg
              key={`svg-${direction}`}
              className={styles.svg}
              viewBox="0 0 560 560"
            >
              <path
                d={pathD}
                className={`${styles.stopLine} ${styles.stopLineAnimated}`}
              />

            </svg>

            {/* Stops + labels — HTML overlay for crisp text rendering */}
            {activeStops.map((stop) => {
              const { cx, cy } = getPoint(stop.position.x, stop.position.y);
              const isSelected = stop.id === selectedStopId;

              return (
                <div
                  key={`${direction}-${stop.id}`}
                  className={styles.stopWrapper}
                  style={{ left: cx, top: cy }}
                >
                  {/* Dot */}
                  <div className={styles.dotWrapper}>
                    {isSelected ? (
                      <div className={styles.dotPulse}>
                        <div className={styles.dotSelected} />
                      </div>
                    ) : stop.type === 'hub' ? (
                      <div className={`${styles.dot} ${styles.dotHub}`} />
                    ) : stop.type === 'terminal' ? (
                      <div className={`${styles.dot} ${styles.dotTerminal}`} />
                    ) : (
                      <div className={`${styles.dot} ${styles.dotRegular}`} />
                    )}
                  </div>

                  {/* Label */}
                  <div className={`${styles.label} ${getLabelClasses(stop.labelPos)}`}>
                    {stop.type === 'hub' ? (
                      <span className={styles.hubBadge}>
                        {stop.name}
                      </span>
                    ) : (
                      <span className={getLabelClass(stop)}>{stop.name}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
