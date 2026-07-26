import { BusRoute } from '../types';

export const BUS_86_SCHEDULE: string[] = [
  '06:40', '07:20', '08:00', '08:40', '09:15', '09:40', '10:25', '11:00',
  '11:40', '12:20', '12:45', '13:15', '13:50', '14:30', '15:10', '15:40',
  '16:00', '16:45', '17:20', '17:55', '18:40', '19:20', '20:00', '20:45',
  '21:30', '22:15',
];

export const BUS_86: BusRoute = {
  id: 'bus-86',
  routeNumber: '86',
  ticketPrice: 50000,
  operatingHours: { start: '06:40', end: '22:15' },
  // Real-world travel time from Noi Bai to central Hanoi
  // Source: user research (2026-07-21)
  // Peak hours (7-9 AM, 5-7 PM): 65-75 min due to traffic on Vo Nguyen Giap + Nhat Tan bridge
  // Normal hours: 50-55 min
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
    departures: BUS_86_SCHEDULE,
  },
};
