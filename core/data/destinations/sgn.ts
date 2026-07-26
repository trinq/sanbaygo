import { DestinationPoint } from '../../types';

export const SGN_DESTINATIONS: DestinationPoint[] = [
  {
    id: 'q1',
    name: 'Quận 1',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 5,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 25, max: 35 },
      peak: { min: 40, max: 55 },
    },
  },
  {
    id: 'q3',
    name: 'Quận 3',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 8,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 28, max: 38 },
      peak: { min: 45, max: 60 },
    },
  },
  {
    id: 'q5',
    name: 'Quận 5',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 10,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 30, max: 40 },
      peak: { min: 45, max: 60 },
    },
  },
  {
    id: 'binh-thanh',
    name: 'Bình Thạnh',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 12,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 28, max: 38 },
      peak: { min: 42, max: 55 },
    },
  },
  {
    id: 'phu-nhuan',
    name: 'Phú Nhuận',
    nearestBusStop: 'Chợ Bến Thành',
    walkingMinutes: 7,
    hasBusCoverage: true,
    travelTime: {
      normal: { min: 22, max: 32 },
      peak: { min: 35, max: 50 },
    },
  },
];
