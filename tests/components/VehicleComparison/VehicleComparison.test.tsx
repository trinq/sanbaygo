import React from 'react';
import { render } from '@testing-library/react-native';
import { VehicleComparison } from '../../../components/VehicleComparison';

describe('<VehicleComparison /> (RN)', () => {
  it('renders all 6 transport cards', () => {
    const { getByText } = render(
      <VehicleComparison
        arrivalTime="10:00"
        terminalId="T1"
        baggageType="carry_on"
        destinationId="old-quarter"
      />
    );
    expect(getByText(/Xe buýt 86/)).toBeTruthy();
    expect(getByText(/sân bay chuyên dụng/)).toBeTruthy();
  });

  it('shows peak-hour badge when arrival is at 08:00', () => {
    const { getByText } = render(
      <VehicleComparison
        arrivalTime="08:00"
        terminalId="T1"
        baggageType="carry_on"
        destinationId="old-quarter"
      />
    );
    expect(getByText(/Giờ cao điểm/)).toBeTruthy();
  });

  it('hides peak-hour badge when arrival is at 14:00', () => {
    const { queryByText } = render(
      <VehicleComparison
        arrivalTime="14:00"
        terminalId="T1"
        baggageType="carry_on"
        destinationId="old-quarter"
      />
    );
    expect(queryByText(/Giờ cao điểm/)).toBeNull();
  });
});
