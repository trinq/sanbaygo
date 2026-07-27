export type StopType = 'regular' | 'hub' | 'terminal';
export type LabelPos = 'top' | 'bottom' | 'left' | 'right';

export interface BusStop {
  id: string;
  name: string;
  type: StopType;
  position: { x: number; y: number };
  labelPos: LabelPos;
}

export type RouteDirection = 'outbound' | 'return';

export interface RouteMapProps {
  stops: { outbound: BusStop[]; return: BusStop[] };
  direction: RouteDirection;
  selectedStopId?: string;
  onDirectionChange: (dir: RouteDirection) => void;
}
