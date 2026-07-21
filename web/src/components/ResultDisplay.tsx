import { ArrivalResult, FormData } from '../types';

interface ResultDisplayProps {
  result: ArrivalResult;
  formData: FormData;
  onRecalculate: () => void;
}

export function ResultDisplay({ onRecalculate }: ResultDisplayProps) {
  void onRecalculate;
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h2>Result Display Placeholder</h2>
      <p>Result components will be implemented in Task 4.</p>
      <button type="button" onClick={onRecalculate}>Recalculate (stub)</button>
    </div>
  );
}
