import { useState, useCallback } from 'react';
import { FormData } from '../types';

const initialFormData: FormData = {
  arrivalTime: '',
  terminal: 'T1',
  baggage: 'carry-on',
  destination: 'old-quarter',
};

export function useFormState() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = useCallback(<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return { formData, updateFormData, reset };
}
