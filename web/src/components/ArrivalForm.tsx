import { ArrivalFormData } from '../types';

interface ArrivalFormProps {
  formData: ArrivalFormData;
  onUpdate: <K extends keyof ArrivalFormData>(key: K, value: ArrivalFormData[K]) => void;
  onCalculate: () => void;
}

export function ArrivalForm({ onCalculate }: ArrivalFormProps) {
  void onCalculate;
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h2>Arrival Form Placeholder</h2>
      <p>Form components will be implemented in Task 3.</p>
      <button type="button" onClick={onCalculate}>Calculate (stub)</button>
    </div>
  );
}
