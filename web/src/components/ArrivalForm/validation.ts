import { ArrivalFormData } from '../../types';

export function isFormValid(formData: ArrivalFormData): boolean {
  return (
    formData.arrivalTime !== null &&
    formData.terminal !== null &&
    formData.baggage !== null &&
    formData.destination !== null
  );
}
