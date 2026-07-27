import { BusStop } from './types';

// Hướng đi: Ga T1 → Ga Hà Nội (từ sân bay ra phố)
// Route: Ga T1 → Nghi Tàm → Yên Phụ → Long Biên → Bờ Hồ → Lý Thường Kiệt → Ga Hà Nội
const outboundToCity: BusStop[] = [
  { id: 'ga-t1', name: 'Ga T1', type: 'hub', position: { x: 2, y: 0 }, labelPos: 'top' },
  { id: 'nghi-tàm', name: 'Nghi Tàm', type: 'regular', position: { x: 2, y: 1 }, labelPos: 'left' },
  { id: 'yên-phụ', name: 'Yên Phụ', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'right' },
  { id: 'long-biên', name: 'Long Biên', type: 'regular', position: { x: 2, y: 3 }, labelPos: 'left' },
  { id: 'bờ-hồ', name: 'Bờ Hồ', type: 'regular', position: { x: 2, y: 4 }, labelPos: 'right' },
  { id: 'ga-hà-nội', name: 'Ga Hà Nội', type: 'terminal', position: { x: 2, y: 6 }, labelPos: 'bottom' },
];

// Hướng về: Ga Hà Nội → Ga T1 (từ phố vào sân bay)
// Route: Ga Hà Nội → Lý Thường Kiệt → Bờ Hồ → Long Biên → Yên Phụ → Nghi Tàm → Ga T1
// NOTE: Hiển thị Ga Hà Nội ở ĐẦU TRÊN (y=0) để user thấy rõ điểm bắt đầu
const returnToAirport: BusStop[] = [
  { id: 'ga-hà-nội', name: 'Ga Hà Nội', type: 'terminal', position: { x: 2, y: 0 }, labelPos: 'top' },
  { id: 'lý-thường-kiệt', name: 'Lý Thường Kiệt', type: 'regular', position: { x: 2, y: 1 }, labelPos: 'left' },
  { id: 'bờ-hồ', name: 'Bờ Hồ', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'right' },
  { id: 'long-biên', name: 'Long Biên', type: 'regular', position: { x: 2, y: 3 }, labelPos: 'left' },
  { id: 'yên-phụ', name: 'Yên Phụ', type: 'regular', position: { x: 2, y: 4 }, labelPos: 'right' },
  { id: 'nghi-tàm', name: 'Nghi Tàm', type: 'regular', position: { x: 2, y: 5 }, labelPos: 'left' },
  { id: 'ga-t1', name: 'Ga T1', type: 'hub', position: { x: 2, y: 6 }, labelPos: 'bottom' },
];

export const BUS_86_STOPS = {
  outbound: outboundToCity,
  return: returnToAirport,
};
