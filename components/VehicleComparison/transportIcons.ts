import { TransportType } from '@core';

export const TRANSPORT_ICONS: Record<TransportType, string> = {
  bus: '🚌',
  motorbike: '🏍️',
  car: '🚗',
};

export const getTransportIcon = (type: TransportType): string =>
  TRANSPORT_ICONS[type] ?? '🚗';
