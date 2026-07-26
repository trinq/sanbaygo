import { render, screen } from '@testing-library/react-native';
import { TiaHint } from '../TiaHint';

describe('TiaHint', () => {
  it('renders nothing for HAN', () => {
    const { toJSON } = render(
      <TiaHint airportId="noi-bai" terminalId="HAN-T1" recommendedBusId="bus-86" />,
    );
    expect(toJSON()).toBeNull();
  });

  it('renders nothing for SGN-T3', () => {
    const { toJSON } = render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T3" recommendedBusId="bus-109" />,
    );
    expect(toJSON()).toBeNull();
  });

  it('renders the TIA hint for SGN-T1 + bus-109', () => {
    render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T1" recommendedBusId="bus-109" />,
    );
    expect(screen.getByText(/TIA/i)).toBeTruthy();
  });

  it('renders nothing for SGN-T1 + bus-152 (direct bus, no transfer needed)', () => {
    const { toJSON } = render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T1" recommendedBusId="bus-152" />,
    );
    expect(toJSON()).toBeNull();
  });

  it('renders the TIA hint for SGN-T2 + bus-109 (international terminal)', () => {
    render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T2" recommendedBusId="bus-109" />,
    );
    expect(screen.getByText(/quốc tế/i)).toBeTruthy();
  });
});
