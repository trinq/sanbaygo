import { render, screen } from '@testing-library/react';
import { TiaHint } from '../../../src/components/Result/TiaHint';

describe('TiaHint', () => {
  it('renders nothing for HAN', () => {
    const { container } = render(
      <TiaHint airportId="noi-bai" terminalId="HAN-T1" recommendedBusId="bus-86" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for SGN-T3', () => {
    const { container } = render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T3" recommendedBusId="bus-109" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the TIA hint for SGN-T1 + bus-109', () => {
    render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T1" recommendedBusId="bus-109" />,
    );
    expect(screen.getByText(/TIA/i)).toBeInTheDocument();
  });

  it('renders nothing for SGN-T1 + bus-152 (direct bus, no transfer needed)', () => {
    const { container } = render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T1" recommendedBusId="bus-152" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders hint when bus-109 is recommended at SGN-T2', () => {
    render(
      <TiaHint airportId="tan-son-nhat" terminalId="SGN-T2" recommendedBusId="bus-109" />,
    );
    expect(screen.getByText(/TIA/i)).toBeInTheDocument();
  });
});
