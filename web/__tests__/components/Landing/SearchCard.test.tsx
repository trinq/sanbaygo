import { render, screen } from '@testing-library/react';
import { SearchCard } from '../../../src/components/Landing/SearchCard';
import { LanguageContext } from '../../../src/contexts/LanguageContext';
import { NOI_BAI_AIRPORT, SGN_AIRPORT } from '@core';

const mockT = {
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

describe('SearchCard', () => {
  it('renders AirportPicker as first control', () => {
    render(
      <SearchCard
        airport={null}
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={[]}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    expect(screen.getByText('Sân bay')).toBeInTheDocument();
  });

  it('hides TerminalPicker and DestinationChips when no airport selected', () => {
    render(
      <SearchCard
        airport={null}
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={[]}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    expect(screen.queryByText('Nhà ga')).not.toBeInTheDocument();
  });

  it('shows TerminalPicker when airport is selected', () => {
    render(
      <SearchCard
        airport="tan-son-nhat"
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={SGN_AIRPORT.terminals}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    expect(screen.getByText('Nhà ga')).toBeInTheDocument();
  });

  it('CTA is disabled until airport, terminal, and destination all set', () => {
    render(
      <SearchCard
        airport="tan-son-nhat"
        terminal={null}
        destination={null}
        people={1}
        carryOn={false}
        checked={false}
        terminalOptions={SGN_AIRPORT.terminals}
        destinationOptions={[]}
        onAirportChange={() => {}}
        onTerminalChange={() => {}}
        onDestinationChange={() => {}}
        onPeopleChange={() => {}}
        onCarryOnChange={() => {}}
        onCheckedChange={() => {}}
        onSubmit={() => {}}
      />,
      { wrapper },
    );
    const button = screen.getByRole('button', { name: /tìm/i });
    expect(button).toBeDisabled();
  });
});
