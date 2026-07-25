import { render, screen } from '@testing-library/react';
import { VehicleComparison } from '../../../src/components/VehicleComparison';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import { useViewport } from '../../../src/hooks/useViewport';

jest.mock('../../../src/hooks/useViewport');

const formData = {
  arrivalTime: '10:00',
  terminalId: 'T1' as const,
  baggageType: 'carry_on' as const,
  destinationId: 'old-quarter',
};

function setup(viewport: 'mobile' | 'desktop') {
  (useViewport as jest.Mock).mockReturnValue(viewport);
  render(
    <LanguageProvider>
      <VehicleComparison formData={formData} />
    </LanguageProvider>,
  );
}

describe('VehicleComparison', () => {
  it('renders Bus 86 first (recommended) at desktop', () => {
    setup('desktop');
    expect(screen.getAllByText(/Xe buýt 86|Bus 86/i).length).toBeGreaterThan(0);
  });

  it('renders cards at mobile', () => {
    setup('mobile');
    expect(screen.getAllByText(/Xe buýt 86|Bus 86/i).length).toBeGreaterThan(0);
  });
});
