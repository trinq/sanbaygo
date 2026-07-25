import { render, screen, fireEvent } from '@testing-library/react';
import { ArrivalForm } from '../../../src/components/ArrivalForm';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import type { ArrivalFormData } from '@core';

const initial: ArrivalFormData = {
  arrivalTime: '10:00',
  terminal: null,
  baggage: null,
  destination: null,
  flightType: 'domestic',
};

function renderForm(props: Partial<React.ComponentProps<typeof ArrivalForm>> = {}) {
  const onUpdate = jest.fn();
  const onCalculate = jest.fn();
  render(
    <LanguageProvider>
      <ArrivalForm formData={initial} onUpdate={onUpdate} onCalculate={onCalculate} {...props} />
    </LanguageProvider>,
  );
  return { onUpdate, onCalculate };
}

describe('ArrivalForm', () => {
  it('renders terminal selector + destination picker', () => {
    renderForm();
    expect(screen.getAllByText(/T1|Nội Bài/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hoàn Kiếm|Phố Cổ/i).length).toBeGreaterThan(0);
  });

  it('does not call onCalculate when destination is missing', () => {
    const { onCalculate } = renderForm();
    fireEvent.click(screen.getByRole('button', { name: /tìm phương tiện|tính toán|calculate/i }));
    expect(onCalculate).not.toHaveBeenCalled();
  });
});
