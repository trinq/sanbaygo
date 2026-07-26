import { Airport, AirportId, Terminal } from '../types';
import { BUS_86 } from './busSchedule';
import { GRAB_ESTIMATE } from './grabEstimates';
import { SGN_AIRPORT } from './airports/sgn';

const TERMINALS: Terminal[] = [
  {
    id: 'HAN-T1' as const,
    name: 'Nhà ga T1',
    type: 'domestic' as const,
    flightTypes: ['domestic', 'international'],
  },
  {
    id: 'HAN-T2' as const,
    name: 'Nhà ga T2',
    type: 'international' as const,
    flightTypes: ['international'],
  },
];

export const NOI_BAI_AIRPORT: Airport = {
  id: 'noi-bai',
  name: 'Sân bay Nội Bài',
  terminals: TERMINALS,
  busRoutes: [BUS_86],
  grabEstimates: GRAB_ESTIMATE,
};

export const AIRPORTS: Record<AirportId, Airport> = {
  'noi-bai': NOI_BAI_AIRPORT,
  'tan-son-nhat': SGN_AIRPORT,
};

export const AIRPORT_LIST: Airport[] = Object.values(AIRPORTS);
