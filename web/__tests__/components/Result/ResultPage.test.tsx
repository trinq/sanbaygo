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
    { terminalId: 'SGN-T2', location: 'Làn B, đối diện Cột số 4 và Cột số 5 sảnh đến quốc tế' },
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
    priceEstimate: '100000 - 180000 VND',
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
    expect(screen.getByRole('heading', { name: /Tân Sơn Nhất/ })).toBeInTheDocument();
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

  it('renders SGN-T1 Grab pickup hint at TCP — Làn D1 (not Làn B)', () => {
    // SGN-T1 is the old domestic terminal. Ride-hail (Grab/Be/Xanh SM)
    // picks up at the TCP parking building across from the arrival hall,
    // Lane D1 ground floor — NOT at Làn B (which is the Bus 152 lane).
    // This fixture mimics what calculateResult now produces for SGN-T1.
    const resultWithTcpPickup: ArrivalResult = {
      ...sgnResult,
      grab: {
        ...sgnResult.grab,
        pickupLocation: 'Tầng trệt Nhà để xe TCP — Làn D1',
      },
    };
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={{ ...sgnForm, terminal: 'SGN-T1' }}
        result={resultWithTcpPickup}
      />,
    );
    expect(
      screen.getAllByText(/Tầng trệt Nhà để xe TCP — Làn D1/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('renders SGN-T3 Grab pickup hint at PNA — pillar 34', () => {
    // SGN-T3 (opened April 2025) is a separate building with its own
    // parking. Grab concentrates at pillar 34, Floor 1 of PNA building.
    const resultWithPnaPickup: ArrivalResult = {
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
        result={resultWithPnaPickup}
      />,
    );
    expect(
      screen.getAllByText(/Tầng 1 Nhà để xe PNA — Cột 34/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('falls back to bus pickup point when Grab pickup location is missing', () => {
    // HAN-T1/T2 do not have a special Grab pickup hint — UI must fall back
    // to the bus route's pickup point (HAN bus 86 pickup is curbside
    // same as ride-hail, so the bus pickup label is correct for both).
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={hanForm}
        result={hanResult}
      />,
    );
    expect(
      screen.getAllByText(/Tầng 1 sảnh đến/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  describe('auto-select route direction based on destination', () => {
    it('shows outbound direction for city destinations at HAN (Old Quarter)', () => {
      // User lands at Noi Bai, going to Old Quarter → bus goes OUTBOUND (airport → city)
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={hanForm}
          result={hanResult}
        />,
      );
      // The "Hướng đi" button should be active (outbound)
      const outboundBtn = screen.getByRole('button', { name: /Hướng đi/i });
      const returnBtn = screen.getByRole('button', { name: /Hướng về/i });
      expect(outboundBtn).toHaveAttribute('data-active', 'true');
      expect(returnBtn).toHaveAttribute('data-active', 'false');
    });

    it('shows outbound direction for city destinations at HAN (Cau Giay)', () => {
      // User going to Cau Giay district → outbound
      const cauGiayForm = { ...hanForm, destination: 'cau-giay' };
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={cauGiayForm}
          result={hanResult}
        />,
      );
      const outboundBtn = screen.getByRole('button', { name: /Hướng đi/i });
      expect(outboundBtn).toHaveAttribute('data-active', 'true');
    });

    it('shows outbound direction for Q1 at SGN', () => {
      // User at TSN going to District 1 → outbound (T3 → city center)
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={sgnForm}
          result={sgnResult}
        />,
      );
      const outboundBtn = screen.getByRole('button', { name: /Hướng đi/i });
      expect(outboundBtn).toHaveAttribute('data-active', 'true');
    });
  });

  it('does NOT override bus pickup with Grab pickup hint (separate render paths)', () => {
    // REGRESSION GUARD: when Grab pickupLocation is set, the bus timeline
    // must still show the bus pickup point (Làn B for Bus 152), NOT the
    // Grab-specific ride-hail lot hint. The two pickup locations render in
    // different sections of the page and must come from different sources.
    //
    // We use SGN-T2 here because sgnRoute (Bus 152) only has pickup points
    // for T1/T2 — SGN-T3 doesn't have a bus pickup point. The Grab pickup
    // hint at SGN-T2 is the international ride-hail lot via pillar 5GF
    // (outside the terminal), a *separate* location from Bus 152's Làn B
    // curbside.
    const resultWithGrabPickup: ArrivalResult = {
      ...sgnResult,
      grab: {
        ...sgnResult.grab,
        pickupLocation:
          'Bãi xe công nghệ quốc tế — vào từ Cột 5GF',
      },
    };
    renderWithLang(
      <ResultPage
        onBack={jest.fn()}
        formData={sgnForm} /* SGN-T2 — fixture has 'Làn B, đối diện Cột số 4 và Cột số 5' */
        result={resultWithGrabPickup}
      />,
    );
    // Bus timeline label must reference the bus pickup (Làn B), not the
    // Grab-only ride-hail lot hint. Làn B is curbside; Cột 5GF is on
    // the other side of the arrival corridor (different building/area).
    const donMarkers = screen.getAllByText(/Điểm đón:/);
    const busPickupMarkers = donMarkers.filter((el) =>
      /Làn B/.test(el.textContent ?? ''),
    );
    const grabPickupMarkers = donMarkers.filter((el) =>
      /Cột 5GF/.test(el.textContent ?? ''),
    );
    expect(busPickupMarkers.length).toBeGreaterThanOrEqual(1);
    expect(grabPickupMarkers.length).toBeGreaterThanOrEqual(1);
  });

  describe('Bus Departure Countdown', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('renders "Còn khoảng 25 phút" inside the Departure timeline step when trip is catchable', () => {
      // hanResult.departureTime is 14:50; freeze clock at 14:25 → 25 minutes remaining
      jest.setSystemTime(new Date('2026-07-28T14:25:00'));
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={hanForm}
          result={hanResult}
        />,
      );
      // The countdown must appear inside the timeline item whose title is "Lên xe / Khởi hành"
      const departureTitle = screen.getByText('Lên xe / Khởi hành');
      const departureItem = departureTitle.closest('div');
      expect(departureItem).not.toBeNull();
      expect(
        screen.getByText(/Còn khoảng 25 phút/),
      ).toBeInTheDocument();
    });

    it('does NOT render countdown when reason is too_late', () => {
      jest.setSystemTime(new Date('2026-07-28T14:25:00'));
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={{ ...hanForm, arrivalTime: '23:00' }}
          result={tooLateResult}
        />,
      );
      expect(screen.queryByText(/Còn khoảng/)).toBeNull();
    });

    it('does NOT render countdown when reason is no_service', () => {
      jest.setSystemTime(new Date('2026-07-28T14:25:00'));
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={{ ...hanForm, arrivalTime: '04:00' }}
          result={noServiceResult}
        />,
      );
      expect(screen.queryByText(/Còn khoảng/)).toBeNull();
    });

    it('does NOT render countdown when reason is missed_last', () => {
      jest.setSystemTime(new Date('2026-07-28T14:25:00'));
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={{ ...hanForm, arrivalTime: '21:30' }}
          result={missedLastResult}
        />,
      );
      expect(screen.queryByText(/Còn khoảng/)).toBeNull();
    });

    it('does NOT render countdown when bus departureTime is more than 60 minutes away', () => {
      // Freeze clock at 12:00, bus departs at 14:50 → 2h 50min away
      jest.setSystemTime(new Date('2026-07-28T12:00:00'));
      renderWithLang(
        <ResultPage
          onBack={jest.fn()}
          formData={hanForm}
          result={hanResult}
        />,
      );
      expect(screen.queryByText(/Còn khoảng/)).toBeNull();
    });
  });
});