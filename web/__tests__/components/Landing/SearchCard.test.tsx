import { render, screen, fireEvent } from '@testing-library/react';
import { SearchCard } from '../../../src/components/Landing/SearchCard';
import { LanguageContext } from '../../../src/contexts/LanguageContext';
import { NOI_BAI_AIRPORT, SGN_AIRPORT } from '@core';

const mockT = {
  form: {
    arrivalTimeLabel: 'Giờ đáp cánh',
    arrivalTimeHint: 'Thời gian máy bay chạm bánh',
  },
  landing: {
    fieldAirport: 'Sân bay',
    airportPlaceholder: 'Chọn',
    fieldTerminal: 'Nhà ga',
    terminalPlaceholder: 'Chọn',
    fieldDestination: 'Điểm đến',
    fieldPeople: 'Người',
    fieldLuggage: 'Hành lý',
    fieldCarryOn: 'Xách tay',
    fieldChecked: 'Ký gửi',
    cta: 'Tìm phương tiện',
  },
  destinations: { 'old-quarter': 'Phố cổ', 'q1': 'Q1' },
  airports: { 'noi-bai': 'Nội Bài', 'tan-son-nhat': 'Tân Sơn Nhất' },
} as any;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageContext.Provider value={{ t: mockT, locale: 'vi' } as any}>
    {children}
  </LanguageContext.Provider>
);

const baseProps = {
  arrivalTime: '12:00',
  airport: null,
  terminal: null,
  destination: null,
  people: 1,
  carryOn: false,
  checked: false,
  terminalOptions: [],
  destinationOptions: [],
  onArrivalTimeChange: () => {},
  onAirportChange: () => {},
  onTerminalChange: () => {},
  onDestinationChange: () => {},
  onPeopleChange: () => {},
  onCarryOnChange: () => {},
  onCheckedChange: () => {},
  onSubmit: () => {},
};

describe('SearchCard', () => {
  it('renders TimePicker with the arrival time label as the first control', () => {
    render(<SearchCard {...baseProps} />, { wrapper });
    expect(screen.getByLabelText(/Giờ đáp cánh/i)).toBeInTheDocument();
    expect(screen.getByText(/Thời gian máy bay chạm bánh/i)).toBeInTheDocument();
    const timeInput = screen.getByLabelText(/Giờ đáp cánh/i) as HTMLInputElement;
    expect(timeInput.value).toBe('12:00');
  });

  it('forwards time-input changes to onArrivalTimeChange', () => {
    const onArrivalTimeChange = jest.fn();
    render(<SearchCard {...baseProps} onArrivalTimeChange={onArrivalTimeChange} />, { wrapper });
    const timeInput = screen.getByLabelText(/Giờ đáp cánh/i) as HTMLInputElement;
    fireEvent.change(timeInput, { target: { value: '18:45' } });
    expect(onArrivalTimeChange).toHaveBeenCalledWith('18:45');
  });

  it('renders AirportPicker below the TimePicker', () => {
    render(<SearchCard {...baseProps} />, { wrapper });
    expect(screen.getByText('Sân bay')).toBeInTheDocument();
  });

  it('hides TerminalPicker and DestinationChips when no airport selected', () => {
    render(<SearchCard {...baseProps} />, { wrapper });
    expect(screen.queryByText('Nhà ga')).not.toBeInTheDocument();
  });

  it('shows TerminalPicker when airport is selected', () => {
    render(
      <SearchCard
        {...baseProps}
        airport="tan-son-nhat"
        terminalOptions={SGN_AIRPORT.terminals}
      />,
      { wrapper },
    );
    expect(screen.getByText('Nhà ga')).toBeInTheDocument();
  });

  it('CTA is disabled until airport, terminal, and destination all set', () => {
    render(
      <SearchCard
        {...baseProps}
        airport="tan-son-nhat"
        terminalOptions={SGN_AIRPORT.terminals}
      />,
      { wrapper },
    );
    const button = screen.getByRole('button', { name: /tìm/i });
    expect(button).toBeDisabled();
  });
});