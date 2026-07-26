import { render, screen, fireEvent } from '@testing-library/react';
import { AirportPicker } from '../../../src/components/Landing/AirportPicker';
import { LanguageContext } from '../../../src/contexts/LanguageContext';

const mockT = {
  landing: {
    fieldAirport: 'Sân bay khởi hành',
    airportPlaceholder: 'Chọn sân bay',
  },
  airports: {
    'noi-bai': 'Sân bay Nội Bài',
    'tan-son-nhat': 'Sân bay Tân Sơn Nhất',
  },
} as any;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageContext.Provider value={{ t: mockT, language: 'vi', setLanguage: () => {} } as any}>
    {children}
  </LanguageContext.Provider>
);

const renderPicker = (overrides = {}) =>
  render(<AirportPicker value={null} onChange={() => {}} {...overrides} />, { wrapper });

describe('AirportPicker', () => {
  it('renders placeholder when no airport selected', () => {
    renderPicker();
    expect(screen.getByText('Chọn sân bay')).toBeTruthy();
  });

  it('opens dropdown and shows both airports', () => {
    renderPicker();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Sân bay Nội Bài')).toBeTruthy();
    expect(screen.getByText('Sân bay Tân Sơn Nhất')).toBeTruthy();
  });

  it('calls onChange with the selected airport id', () => {
    const onChange = jest.fn();
    renderPicker({ onChange });
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Sân bay Tân Sơn Nhất'));
    expect(onChange).toHaveBeenCalledWith('tan-son-nhat');
  });
});
