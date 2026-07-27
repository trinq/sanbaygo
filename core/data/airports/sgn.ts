import { Airport, Terminal } from '../../types';
import { BUS_109, BUS_152 } from '../busSchedules/sgn';
import { SGN_GRAB_ESTIMATE } from '../grabEstimates/sgn';

const TERMINALS: Terminal[] = [
  {
    id: 'SGN-T1',
    name: 'Nhà ga T1 (quốc nội cũ)',
    type: 'domestic',
    flightTypes: ['domestic'],
  },
  {
    id: 'SGN-T2',
    name: 'Nhà ga T2 (quốc tế)',
    type: 'international',
    flightTypes: ['international'],
  },
  {
    id: 'SGN-T3',
    name: 'Nhà ga T3 (mới)',
    type: 'domestic',
    flightTypes: ['domestic', 'international'],
  },
];

export const SGN_AIRPORT: Airport = {
  id: 'tan-son-nhat',
  name: 'Sân bay Tân Sơn Nhất',
  terminals: TERMINALS,
  busRoutes: [BUS_109, BUS_152],
  grabEstimates: SGN_GRAB_ESTIMATE,
};
