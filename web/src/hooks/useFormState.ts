import { useState, useCallback } from 'react';
import { ArrivalFormData } from '@core';

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

const initialFormState: ArrivalFormData = {
  arrivalTime: getCurrentTime(),
  terminal: null,
  baggage: null,
  destination: null,
  flightType: 'domestic',
};

export function useFormState() {
  const [formData, setFormData] = useState<ArrivalFormData>(initialFormState);

  const updateFormData = useCallback((patch: Partial<ArrivalFormData>) => {
    setFormData(prev => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setFormData({ ...initialFormState, arrivalTime: getCurrentTime() });
  }, []);

  return {
    formData,
    updateFormData,
    reset,
  };
}
