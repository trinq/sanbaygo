import React, { useMemo, useState } from 'react';
import { RouteMapProps } from './types';
import { BUS_152_STOPS } from './Bus152Stops';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './RouteMap.module.css';

const UNIT = 60;
const PADDING = 50;

export const RouteMap: React.FC<RouteMapProps> = ({
  direction,
  selectedStopId,
  onDirectionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();
  const stops = direction === 'outbound' ? BUS_152_STOPS.outbound : BUS_152_STOPS.return;

  const { pathD, dots } = useMemo(() => {
    const pathPoints = stops.map(s => ({
      x: PADDING + s.position.x * UNIT,
      y: PADDING + s.position.y * UNIT,
    }));

    let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];

      if (prev.y !== curr.y) {
        d += ` L ${prev.x} ${curr.y}`;
      }
      d += ` L ${curr.x} ${curr.y}`;
    }

    const dots = stops.map((stop, idx) => ({
      ...stop,
      x: pathPoints[idx].x,
      y: pathPoints[idx].y,
      isSelected: stop.id === selectedStopId,
    }));

    return { pathD: d, dots };
  }, [stops, selectedStopId]);

  const maxX = Math.max(...dots.map(d => d.x));
  const maxY = Math.max(...dots.map(d => d.y));
  const width = maxX + PADDING + 120;
  const height = maxY + PADDING;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.expandButton}
        onClick={() => setIsExpanded(!isExpanded)}
        data-expanded={isExpanded}
      >
        {t.results.tapToExpandRoute}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
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
          <svg
            key={isExpanded ? 'expanded' : 'collapsed'}
            className={styles.svg}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d={pathD}
              className={`${styles.stopLine} ${styles.stopLineAnimated}`}
            />

            {dots.map((dot, idx) => {
              const dotSize = dot.isSelected
                ? 10
                : dot.isHub || dot.isTerminal
                  ? 8
                  : 6;

              let dotClass = styles.stopDot;
              if (dot.isSelected) dotClass = styles.stopDotDestination;
              else if (dot.isTerminal) dotClass = styles.stopDotTerminal;
              else if (dot.isHub) dotClass = styles.stopDotHub;

              const labelX = dot.x > width / 2 ? dot.x - 8 : dot.x + 8;
              const labelAnchor = dot.x > width / 2 ? 'end' : 'start';

              return (
                <g key={dot.id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={dot.isSelected ? 10 : dotSize}
                    className={dotClass}
                    style={{
                      transformOrigin: `${dot.x}px ${dot.y}px`,
                      animation: dot.isSelected ? 'pulse 2s ease-in-out infinite' : undefined,
                    }}
                  />
                  <text
                    x={labelX}
                    y={dot.y + 4}
                    textAnchor={labelAnchor}
                    className={dot.isHub ? styles.stopLabelHub : styles.stopLabel}
                  >
                    {dot.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
