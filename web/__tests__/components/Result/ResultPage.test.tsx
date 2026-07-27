import { render, screen } from '@testing-library/react';
import { ResultPage } from '../../../src/components/Result/ResultPage';
import { LanguageProvider } from '../../../src/contexts/LanguageContext';
import type { ArrivalResult, ArrivalFormData, BusRoute } from '@core';

// HAN fixtures
const hanRoute: BusRoute = {
  id: 'bus-86',
  routeNumber: '86',
  ticketPrice: 50000,
  operatingHours: { start: '06:40', end: '22:15' },
  travelTime: {
    normal: { min: 50, max: 55 },
    peak: { min: 65, max: 75 },
  },
  pickupPoints: [
    { terminalId: 'HAN-T1', location: 'Tầng 1 sảnh đến, đối diện cột 12' },
    { terminalId: 'HAN-T2', location: 'Tầng 1 sảnh đến, đối diện cột 14' },
  ],
  scheduleSource: {
    kind: 'explicit',
    departures: ['06:40', '07:20', '08:00', '14:50'],
  },
};

const hanResult: ArrivalResult = {
  bus: {
    available: true,
    trip: {
      departureTime: '14:50',
      waitMinutes: 25,
      ticketPrice: 50000,
      arrivalEstimate: { early: '15:35', late: '15:45', minutesRange: { min: 45, max: 50 } },
      selectedRoute: hanRoute,
    },
  },
  grab: {
    available: true,
    priceEstimate: '200000 - 350000 VND',
    travelTime: { early: '15:00', late: '15:10', minutesRange: { min: 30, max: 40 } },
  },
  direction: {
    description: 'Đi bộ 5 phút đến điểm đón xe buýt',
    estimatedMinutes: 5,
  },
};

const hanForm: ArrivalFormData = {
  arrivalTime: '14:30',
  terminal: 'HAN-T2',
  baggage: 'carry_on',
  destination: 'old-quarter',
  flightType: 'international',
  airportId: 'noi-bai',
};

// SGN fixtures
const sgnRoute: BusRoute = {
  id: 'bus-152',
  routeNumber: '152',
  ticketPrice: 6000,
  operatingHours: { start: '05:00', end: '19:00' },
  travelTime: {
    normal: { min: 25, max: 35 },
    peak: { min: 40, max: 55 },
  },
  pickupPoints: [
    { terminalId: 'SGN-T1', location: 'Làn B ga quốc nội, cột B06–B09' },
    { terminalId: 'SGN-T2', location: 'Làn B gần sảnh đến quốc tế' },
  ],
  scheduleSource: {
    kind: 'explicit',
    departures: ['05:00', '14:21', '14:36'],
  },
};

const sgnResult: ArrivalResult = {
  bus: {
    available: true,
    trip: {
      departureTime: '14:21',
      waitMinutes: 10,
      ticketPrice: 6000,
      arrivalEstimate: { early: '14:46', late: '14:56', minutesRange: { min: 25, max: 35 } },
      selectedRoute: sgnRoute,
    },
  },
  grab: {
    available: true,
    priceEstimate: '90000 - 150000 VND',
    travelTime: { early: '14:55', late: '15:05', minutesRange: { min: 25, max: 35 } },
  },
  direction: {
    description: 'Đi bộ 5 phút đến điểm đón xe buýt',
    estimatedMinutes: 5,
  },
};

const sgnForm: ArrivalFormData = {
  arrivalTime: '14:30',
  terminal: 'SGN-T2',
  baggage: 'carry_on',
  destination: 'q1',
  flightType: 'international',
  airportId: 'tan-son-nhat',
};

// Out-of-hours fixture
const tooLateResult: ArrivalResult = {
  bus: { available: false, reason: 'too_late' },
  grab: {
    available: true,
    priceEstimate: '200000 - 350000 VND',
    travelTime: { early: '15:00', late: '15:10', minutesRange: { min: 30, max: 40 } },
  },
};

const noServiceResult: ArrivalResult = {
  bus: { available: false, reason: 'no_service' },
  grab: {
    available: true,
    priceEstimate: '200000 - 350000 VND',
    travelTime: { early: '15:00', late: '15:10', minutesRange: { min: 30, max: 40 } },
  },
};

const missedLastResult: ArrivalResult = {
  bus: { available: false, reason: 'missed_last' },
  grab: {
    available: true,
    priceEstimate: '200000 - 350000 VND',
    travelTime: { early: '15:00', late: '15:10', minutesRange: { min: 30, max: 40 } },
  },
};

function renderWithLang(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('ResultPage', () => {
  it('renders HAN content when airportId is noi-bai', () => {
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={hanForm}
        result={hanResult}
      />,
    );
    expect(screen.getByText(/Sân bay Nội Bài/)).toBeInTheDocument();
    expect(screen.getByText(/T2/)).toBeInTheDocument();
    expect(screen.getByText(/Tuyến Buýt 86/)).toBeInTheDocument();
    expect(screen.getByText(/50\.000/)).toBeInTheDocument();
  });

  it('renders SGN content when airportId is tan-son-nhat', () => {
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={sgnForm}
        result={sgnResult}
      />,
    );
    expect(screen.queryByText(/Nội Bài/)).toBeNull();
    expect(screen.getByText(/Tân Sơn Nhất/)).toBeInTheDocument();
    expect(screen.getByText(/SGN-T2|Nhà ga T2 \(quốc tế\)/)).toBeInTheDocument();
    expect(screen.queryByText(/Tuyến Buýt 86/)).toBeNull();
    expect(screen.getByText(/Tuyến Buýt 152/)).toBeInTheDocument();
    expect(screen.getByText(/6\.000/)).toBeInTheDocument();
    expect(screen.queryByText(/45\.000/)).toBeNull();
  });

  it('renders "Đã hết giờ hoạt động" when reason is too_late', () => {
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={{ ...hanForm, arrivalTime: '23:00' }}
        result={tooLateResult}
      />,
    );
    expect(screen.getByText(/Đã hết giờ hoạt động/)).toBeInTheDocument();
  });

  it('renders "Chưa đến giờ xe buýt chạy" when reason is no_service', () => {
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={{ ...hanForm, arrivalTime: '04:00' }}
        result={noServiceResult}
      />,
    );
    expect(screen.getByText(/Chưa đến giờ xe buýt chạy/)).toBeInTheDocument();
  });

  it('renders "Đã lỡ chuyến cuối" when reason is missed_last', () => {
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={{ ...hanForm, arrivalTime: '21:30' }}
        result={missedLastResult}
      />,
    );
    expect(screen.getByText(/Đã lỡ chuyến cuối/)).toBeInTheDocument();
  });

  it('renders airport-specific Grab pickup location (pillar 34, PNA) when provided', () => {
    // Build a SGN result with the Grab-specific pickup hint set, mimicking
    // what calculateResult propagates from airport.grabEstimates.pickupLocation.
    const resultWithGrabPickup: ArrivalResult = {
      ...sgnResult,
      grab: {
        ...sgnResult.grab,
        pickupLocation: 'Tầng 1 Nhà để xe PNA — Cột 34',
      },
    };
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={{ ...sgnForm, terminal: 'SGN-T3' }}
        result={resultWithGrabPickup}
      />,
    );
    expect(
      screen.getAllByText(/Tầng 1 Nhà để xe PNA — Cột 34/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('falls back to bus pickup point when Grab pickup location is missing', () => {
    // SGN-T1/T2 do not have a special Grab pickup hint — UI must fall back
    // to the bus route's pickup point (the existing pre-Option-1 behavior).
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={sgnForm}
        result={sgnResult}
      />,
    );
    expect(
      screen.getAllByText(/Làn B gần sảnh đến quốc tế/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('does NOT override bus pickup with Grab pickup hint (separate render paths)', () => {
    // REGRESSION GUARD: when Grab pickupLocation is set (SGN-T3), the bus
    // timeline must still show the bus pickup point (Làn B for Bus 152), NOT
    // the Grab pillar 34 hint. The two pickup locations render in different
    // sections of the page and must come from different sources.
    //
    // We use SGN-T2 here because sgnRoute (Bus 152) only has pickup points
    // for T1/T2 — SGN-T3 doesn't have a bus pickup point. The Grab pickup
    // hint is then a *separate* string that should appear ONLY in the
    // Grab row, not in the bus timeline.
    const resultWithGrabPickup: ArrivalResult = {
      ...sgnResult,
      grab: {
        ...sgnResult.grab,
        pickupLocation: 'Tầng 1 Nhà để xe PNA — Cột 34',
      },
    };
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={sgnForm} /* SGN-T2 — fixture has 'Làn B gần sảnh đến quốc tế' */
        result={resultWithGrabPickup}
      />,
    );
    // Bus timeline label must reference the bus pickup (Làn B), not the
    // Grab-only pillar 34 — these are physically different locations.
    const donMarkers = screen.getAllByText(/Điểm đón:/);
    const busPickupMarkers = donMarkers.filter((el) =>
      /Làn B/.test(el.textContent ?? ''),
    );
    const grabPickupMarkers = donMarkers.filter((el) =>
      /Cột 34/.test(el.textContent ?? ''),
    );
    expect(busPickupMarkers.length).toBeGreaterThanOrEqual(1);
    expect(grabPickupMarkers.length).toBeGreaterThanOrEqual(1);
  });
});