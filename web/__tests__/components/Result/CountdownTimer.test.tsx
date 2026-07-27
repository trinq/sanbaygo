import { render, screen, act, cleanup } from '@testing-library/react';
import { CountdownTimer } from '../../../src/components/Result/CountdownTimer';
import type { BusRecommendation } from '@core';

type BusTrip = NonNullable<BusRecommendation['trip']>;

const makeTrip = (departureTime: string): BusTrip => ({
  departureTime,
  waitMinutes: 30,
  ticketPrice: 50000,
});

describe('CountdownTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it('renders "Còn khoảng X phút" when 30 minutes remain until departure', () => {
    // Freeze clock at 14:20:00, bus departs at 14:50 → 30 minutes remaining
    jest.setSystemTime(new Date('2026-07-28T14:20:00'));
    render(<CountdownTimer trip={makeTrip('14:50')} />);
    expect(screen.getByText(/Còn khoảng 30 phút/)).toBeInTheDocument();
  });

  it('renders "Còn khoảng 0 phút" when less than one minute remains but bus has not departed', () => {
    // Freeze clock at 14:49:30, bus departs at 14:50 → 30 seconds remaining
    jest.setSystemTime(new Date('2026-07-28T14:49:30'));
    render(<CountdownTimer trip={makeTrip('14:50')} />);
    expect(screen.getByText(/Còn khoảng 0 phút/)).toBeInTheDocument();
  });

  it('hides countdown when more than 60 minutes remain until departure', () => {
    // Freeze clock at 12:00, bus departs at 14:50 → 2h 50min remaining
    jest.setSystemTime(new Date('2026-07-28T12:00:00'));
    render(<CountdownTimer trip={makeTrip('14:50')} />);
    expect(screen.queryByText(/Còn khoảng/)).toBeNull();
  });

  it('hides countdown when the departure time has been reached', () => {
    // Freeze clock at 14:51, bus departs at 14:50 → already departed
    jest.setSystemTime(new Date('2026-07-28T14:51:00'));
    render(<CountdownTimer trip={makeTrip('14:50')} />);
    expect(screen.queryByText(/Còn khoảng/)).toBeNull();
  });

  it('hides countdown when trip is null', () => {
    jest.setSystemTime(new Date('2026-07-28T14:20:00'));
    render(<CountdownTimer trip={null} />);
    expect(screen.queryByText(/Còn khoảng/)).toBeNull();
  });

  it('shows countdown at the 60-minute boundary (≤ 60 minutes remaining)', () => {
    // Freeze clock at 13:50, bus departs at 14:50 → exactly 60 minutes remaining
    jest.setSystemTime(new Date('2026-07-28T13:50:00'));
    render(<CountdownTimer trip={makeTrip('14:50')} />);
    expect(screen.getByText(/Còn khoảng 60 phút/)).toBeInTheDocument();
  });

  it('hides countdown when 61 minutes remain (just outside the boundary)', () => {
    // Freeze clock at 13:49, bus departs at 14:50 → 61 minutes remaining
    jest.setSystemTime(new Date('2026-07-28T13:49:00'));
    render(<CountdownTimer trip={makeTrip('14:50')} />);
    expect(screen.queryByText(/Còn khoảng/)).toBeNull();
  });

  it('updates the countdown minute value after setInterval tick without recomputing', () => {
    // Start at 14:20:00 → 30 minutes remaining
    jest.setSystemTime(new Date('2026-07-28T14:20:00'));
    render(<CountdownTimer trip={makeTrip('14:50')} />);
    expect(screen.getByText(/Còn khoảng 30 phút/)).toBeInTheDocument();

    // Advance 1 minute on the fake clock and trigger the interval
    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(screen.getByText(/Còn khoảng 29 phút/)).toBeInTheDocument();
  });

  it('clears the interval when the component unmounts', () => {
    jest.setSystemTime(new Date('2026-07-28T14:20:00'));
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<CountdownTimer trip={makeTrip('14:50')} />);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('clears the interval when trip transitions from non-null to null', () => {
    jest.setSystemTime(new Date('2026-07-28T14:20:00'));
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { rerender } = render(<CountdownTimer trip={makeTrip('14:50')} />);
    rerender(<CountdownTimer trip={null} />);
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('does not change the trip reference — only re-renders the countdown text', () => {
    jest.setSystemTime(new Date('2026-07-28T14:20:00'));
    const trip = makeTrip('14:50');
    const { rerender } = render(<CountdownTimer trip={trip} />);
    expect(screen.getByText(/Còn khoảng 30 phút/)).toBeInTheDocument();

    // Same trip object re-passed; advance clock by 1 minute
    act(() => {
      jest.advanceTimersByTime(60_000);
    });
    rerender(<CountdownTimer trip={trip} />);
    expect(screen.getByText(/Còn khoảng 29 phút/)).toBeInTheDocument();
  });
});
