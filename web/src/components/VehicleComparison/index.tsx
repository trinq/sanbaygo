'use client';

import { useState, useEffect } from 'react';
import { TransportComparison, SortOption } from '@core';
import { useLanguage } from '../../contexts/LanguageContext';
import { SortToggle } from './SortToggle';
import { VehicleCard } from './VehicleCard';
import { calculateTripComparison } from '@core';
import styles from './index.module.css';

interface VehicleComparisonProps {
  formData: {
    arrivalTime: string;
    terminalId: 'T1' | 'T2';
    baggageType: 'carry_on' | 'checked';
    destinationId: string;
  };
}

export function VehicleComparison({ formData }: VehicleComparisonProps) {
  const { t } = useLanguage();
  const [comparisons, setComparisons] = useState<TransportComparison[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isPeakHour, setIsPeakHour] = useState(false);

  useEffect(() => {
    const savedSort = localStorage.getItem('vehicle-sort') as SortOption;
    if (savedSort) {
      setSortBy(savedSort);
    }
  }, []);

  useEffect(() => {
    const result = calculateTripComparison({
      ...formData,
      sortBy,
    });

    setComparisons(result.comparison);
    setIsPeakHour(result.metadata.isPeakHour);
  }, [formData, sortBy]);

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    localStorage.setItem('vehicle-sort', newSort);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t.results.comparisonTitle}</h2>
        {isPeakHour && (
          <span className={styles.peakBadge}>{t.results.peakWarning}</span>
        )}
      </div>

      <SortToggle value={sortBy} onChange={handleSortChange} />

      <div className={styles.grid}>
        {comparisons.map((comparison) => (
          <VehicleCard key={comparison.id} comparison={comparison} />
        ))}
      </div>
    </div>
  );
}
