import { BusStop } from './types';

// Lượt đi: Bến xe buýt Sài Gòn → Ga T3
// Route: Bến xe buýt SG → Lê Lai → Hàm Nghi → Nam Kỳ Khởi Nghĩa → Nguyễn Văn Trỗi → Ga T3
const outboundFromCity: BusStop[] = [
  { id: 'ben-xe-buýt-sg', name: 'Bến xe buýt Sài Gòn', type: 'terminal', position: { x: 2, y: 6 }, labelPos: 'bottom' },
  { id: 'lê-lai', name: 'Lê Lai', type: 'regular', position: { x: 2, y: 5 }, labelPos: 'left' },
  { id: 'hàm-nghi', name: 'Hàm Nghi', type: 'regular', position: { x: 2, y: 4 }, labelPos: 'right' },
  { id: 'nam-kỳ-khởi-nghĩa', name: 'Nam Kỳ Khởi Nghĩa', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'left' },
  { id: 'nguyễn-văn-trỗi', name: 'Nguyễn Văn Trỗi', type: 'regular', position: { x: 2, y: 1 }, labelPos: 'right' },
  { id: 'ga-t3', name: 'Ga T3', type: 'hub', position: { x: 2, y: 0 }, labelPos: 'top' },
];

// Lượt về: Ga T3 → Bến xe buýt Sài Gòn
// Route: Ga T3 → Nguyễn Văn Trỗi → Cộng Hòa → Hoàng Hoa Thám → Bến xe buýt SG
// NOTE: Hiển thị Ga T3 ở ĐẦU TRÊN (y=0) để user thấy rõ điểm bắt đầu
const returnFromT3: BusStop[] = [
  { id: 'ga-t3', name: 'Ga T3', type: 'hub', position: { x: 2, y: 0 }, labelPos: 'top' },
  { id: 'nguyễn-văn-trỗi', name: 'Nguyễn Văn Trỗi', type: 'regular', position: { x: 2, y: 1 }, labelPos: 'right' },
  { id: 'cộng-hòa', name: 'Cộng Hòa', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'left' },
  { id: 'hoàng-hoa-thám', name: 'Hoàng Hoa Thám', type: 'regular', position: { x: 2, y: 3 }, labelPos: 'right' },
  { id: 'ben-xe-buýt-sg', name: 'Bến xe buýt Sài Gòn', type: 'terminal', position: { x: 2, y: 4 }, labelPos: 'bottom' },
];

export const BUS_109_STOPS = {
  outbound: outboundFromCity,
  return: returnFromT3,
};
