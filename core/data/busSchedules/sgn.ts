import { BusRoute } from '../../types';

export const BUS_109: BusRoute = {
  id: 'bus-109',
  routeNumber: '109',
  ticketPrice: 15000,
  operatingHours: { start: '05:30', end: '22:00' },
  travelTime: {
    normal: { min: 30, max: 45 },
    peak: { min: 50, max: 70 },
  },
  pickupPoints: [
    { terminalId: 'SGN-T3', location: 'Ngay tại T3 — cột A17–A20' },
  ],
  scheduleSource: {
    kind: 'explicit',
    departures: [
      '05:30', '06:10', '06:50', '07:30', '08:10', '08:55', '09:35', '10:20',
      '11:05', '11:45', '12:30', '13:15', '14:00', '14:45', '15:30', '16:15',
      '17:00', '17:45', '18:30', '19:15', '20:00', '20:45', '21:30', '22:00',
    ],
  },
};

export const BUS_152: BusRoute = {
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
    departures: [
      '05:00', '05:18', '05:36', '05:51', '06:06', '06:21', '06:36', '06:51',
      '07:06', '07:21', '07:36', '07:51', '08:06', '08:21', '08:36', '08:51',
      '09:06', '09:21', '09:36', '09:51', '10:06', '10:21', '10:36', '10:51',
      '11:06', '11:21', '11:36', '11:51', '12:06', '12:21', '12:36', '12:51',
      '13:06', '13:21', '13:36', '13:51', '14:06', '14:21', '14:36', '14:51',
      '15:06', '15:21', '15:36', '15:51', '16:06', '16:21', '16:36', '16:51',
      '17:06', '17:21', '17:36', '17:51', '18:06', '18:21', '18:36', '18:51',
      '19:00',
    ],
  },
};

export const TIA: BusRoute = {
  id: 'tia',
  routeNumber: 'TIA',
  ticketPrice: 0,
  operatingHours: { start: '04:30', end: '00:30' },
  travelTime: {
    normal: { min: 15, max: 20 },
    peak: { min: 15, max: 20 },
  },
  pickupPoints: [
    { terminalId: 'SGN-T1', location: 'Làn B, cột B17–B20' },
    { terminalId: 'SGN-T2', location: 'Làn B, cột B15–B16' },
    { terminalId: 'SGN-T3', location: 'Cột A17–A20' },
  ],
  scheduleSource: {
    kind: 'frequency',
    headwayMinutes: { peak: 15, normal: 20 },
  },
};