// Re-implementation of data for web
// Mirrors parent repo's data/

import { BusRoute, DestinationPoint } from '../types';

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
  ticketPrice: 35000,
  operatingHours: { start: '06:40', end: '22:15' },
  travelTime: {
    normal: { min: 60, max: 90 },
    peak: { min: 90, max: 120 },
  },
};

export const DESTINATIONS: DestinationPoint[] = [
  {
    id: 'old-quarter',
    name: 'Khu phố cổ Hà Nội',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 60, max: 90 },
      peak: { min: 90, max: 120 },
    },
  },
  {
    id: 'hoan-kiem',
    name: 'Quận Hoàn Kiếm',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 55, max: 85 },
      peak: { min: 85, max: 115 },
    },
  },
  {
    id: 'dong-da',
    name: 'Quận Đống Đa',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 50, max: 75 },
      peak: { min: 75, max: 105 },
    },
  },
  {
    id: 'ba-dinh',
    name: 'Quận Ba Đình',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 65, max: 95 },
      peak: { min: 95, max: 125 },
    },
  },
  {
    id: 'cau-giay',
    name: 'Quận Cầu Giấy',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 40, max: 60 },
      peak: { min: 60, max: 90 },
    },
  },
];

export interface ExitTimeEstimate {
  terminalType: 'domestic' | 'international';
  baggageType: 'carry_on' | 'checked';
  flightType?: 'international';
  minMinutes: number;
  maxMinutes: number;
}

export const EXIT_TIME_ESTIMATES: ExitTimeEstimate[] = [
  { terminalType: 'domestic', baggageType: 'carry_on', minMinutes: 15, maxMinutes: 25 },
  { terminalType: 'domestic', baggageType: 'checked', minMinutes: 25, maxMinutes: 45 },
  { terminalType: 'international', baggageType: 'carry_on', flightType: 'international', minMinutes: 45, maxMinutes: 75 },
  { terminalType: 'international', baggageType: 'checked', flightType: 'international', minMinutes: 60, maxMinutes: 90 },
];

export const GRAB_ESTIMATE = {
  priceRange: { min: 250000, max: 350000 },
  travelTime: {
    normal: { min: 40, max: 60 },
    peak: { min: 60, max: 90 },
  },
};

export const NOI_BAI_AIRPORT = {
  id: 'noi-bai',
  name: 'Sân bay Nội Bài',
  terminals: [
    { id: 'T1' as const, name: 'Nhà ga T1', type: 'domestic' as const },
    { id: 'T2' as const, name: 'Nhà ga T2', type: 'international' as const },
  ],
  busRoutes: [BUS_86],
  grabEstimates: GRAB_ESTIMATE,
};
