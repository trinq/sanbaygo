import { TransportOption } from '../types';

export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: 'BUS_86',
    name: 'Bus 86',
    nameVi: 'Xe buýt 86',
    type: 'bus',
    basePrice: 35000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 50, max: 55 },
      peak: { min: 65, max: 75 },
    },
    luggageScore: 5,
    comfortScore: 2,
    ecoFriendly: false,
    isRecommended: true,
    notes: 'Xe buýt sân bay chuyên dụng, ghế ngồi, giá rẻ nhất',
  },
  {
    id: 'GRAB_BIKE',
    name: 'Grab Bike',
    nameVi: 'Grab Bike',
    type: 'motorbike',
    basePrice: 80000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 50 },
      peak: { min: 55, max: 70 },
    },
    luggageScore: 1,
    comfortScore: 2,
    ecoFriendly: false,
    isRecommended: false,
    notes: 'Xe máy, phù hợp 1 người hành lý nhẹ',
  },
  {
    id: 'XANH_SM_BIKE',
    name: 'Xanh SM Bike',
    nameVi: 'Xanh SM Bike',
    type: 'motorbike',
    basePrice: 80000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 50 },
      peak: { min: 55, max: 70 },
    },
    luggageScore: 1,
    comfortScore: 2,
    ecoFriendly: true,
    isRecommended: false,
    notes: 'Xe máy điện VinGroup, thân thiện môi trường',
  },
  {
    id: 'GRAB_CAR',
    name: 'Grab Car',
    nameVi: 'Grab Car',
    type: 'car',
    basePrice: 250000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 55 },
      peak: { min: 55, max: 75 },
    },
    luggageScore: 4,
    comfortScore: 4,
    ecoFriendly: false,
    isRecommended: false,
    notes: 'Xe 4 chỗ Grab, có điều hòa, phù hợp 1-4 người',
  },
  {
    id: 'XANH_SM',
    name: 'Xanh SM',
    nameVi: 'Xanh SM',
    type: 'car',
    basePrice: 280000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 55 },
      peak: { min: 55, max: 75 },
    },
    luggageScore: 4,
    comfortScore: 5,
    ecoFriendly: true,
    isRecommended: false,
    notes: 'Xe điện VinGroup, êm ái, thân thiện môi trường',
  },
  {
    id: 'BE',
    name: 'Be Car',
    nameVi: 'Be Car',
    type: 'car',
    basePrice: 250000,
    priceUnit: 'per_trip',
    travelTime: {
      normal: { min: 40, max: 55 },
      peak: { min: 55, max: 75 },
    },
    luggageScore: 4,
    comfortScore: 4,
    ecoFriendly: false,
    isRecommended: false,
    notes: 'Dịch vụ xe của Be, xe 4 chỗ có điều hòa',
  },
];

export function getTransportOption(id: string): TransportOption | undefined {
  return TRANSPORT_OPTIONS.find((opt) => opt.id === id);
}

export function getScoreLabel(score: number): string {
  if (score >= 4) return 'Tốt';
  if (score >= 3) return 'Khá';
  if (score >= 2) return 'Trung bình';
  return 'Kém';
}
