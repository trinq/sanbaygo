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
  schedule: BUS_86_SCHEDULE,
  ticketPrice: 35000, // VND
  operatingHours: { start: '06:40', end: '22:15' },
  travelTime: {
    normal: { min: 60, max: 90 },
    peak: { min: 90, max: 120 },
  },
};
