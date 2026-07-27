export interface BusStop {
  id: string;
  name: string;
  isHub: boolean;
  isTerminal: boolean;
  position: { x: number; y: number };
}

export type RouteDirection = 'outbound' | 'return';

export interface RouteMapProps {
  direction: RouteDirection;
  selectedStopId?: string;
  onDirectionChange: (dir: RouteDirection) => void;
}
