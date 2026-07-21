import { DestinationPoint } from '../types';

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
  {
    id: 'other',
    name: 'Khu vực khác',
    nearestBusStop: 'Đại lộ Thăng Long',
    walkingMinutes: 5,
    hasBusCoverage: false,
    travelTime: {
      normal: { min: 60, max: 90 },
      peak: { min: 90, max: 120 },
    },
  },
];
