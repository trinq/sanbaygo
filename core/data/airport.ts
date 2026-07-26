import { Airport, Terminal } from '../types';
import { BUS_86 } from './busSchedule';
import { GRAB_ESTIMATE } from './grabEstimates';

const TERMINALS: Terminal[] = [
  {
    id: 'HAN-T1',
    name: 'Nhà ga T1',
    type: 'domestic',
    flightTypes: ['domestic', 'international'],
  },
  {
    id: 'HAN-T2',
    name: 'Nhà ga T2',
    type: 'international',
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
