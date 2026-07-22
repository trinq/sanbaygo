import { ArrivalFormData } from '@core';

export function isFormValid(formData: ArrivalFormData): boolean {
  return (
    formData.arrivalTime !== null &&
    formData.terminal !== null &&
    formData.baggage !== null &&
    formData.destination !== null
  );
}
