'use client';

import { useState, useEffect } from 'react';
import { TransportComparison, SortOption, TripCalculationResponse } from '@/types';
import { SortToggle } from './SortToggle';
import { VehicleCard } from './VehicleCard';
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
  const [comparisons, setComparisons] = useState<TransportComparison[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isPeakHour, setIsPeakHour] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSort = localStorage.getItem('vehicle-sort') as SortOption;
    if (savedSort) {
      setSortBy(savedSort);
    }
  }, []);

  useEffect(() => {
    async function fetchComparison() {
      setLoading(true);
      try {
        const response = await fetch('/api/calculate-trip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            sortBy,
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const data: TripCalculationResponse = await response.json();
        setComparisons(data.comparison);
        setIsPeakHour(data.metadata.isPeakHour);
      } catch (error) {
        console.error('Error fetching comparison:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchComparison();
  }, [formData, sortBy]);

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    localStorage.setItem('vehicle-sort', newSort);
  };

  if (loading) {
    return <div className={styles.loading}>Đang tính toán...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>So sánh phương tiện</h2>
        {isPeakHour && (
          <span className={styles.peakBadge}>Giờ cao điểm</span>
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
