import { BusStop } from './types';

// Lượt đi: Sân bay Tân Sơn Nhất → KDC Trung Sơn
// Bus 152 dừng đón/trả khách tại T1 (Ga quốc nội, cột B06-B09) và T2 (Ga quốc tế, cột 13-14)
// KHÔNG kết nối đến nhà ga T3
const outboundFromSGN: BusStop[] = [
  { id: 'san-bay-tsn', name: 'Sân bay Tân Sơn Nhất', type: 'hub', position: { x: 2, y: 8 }, labelPos: 'bottom' },
  { id: 'truong-son', name: 'Trường Sơn', type: 'regular', position: { x: 2, y: 6 }, labelPos: 'right' },
  { id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', type: 'regular', position: { x: 2, y: 5 }, labelPos: 'left' },
  { id: 'duong-3-2', name: 'Đường 3/2', type: 'regular', position: { x: 2, y: 3 }, labelPos: 'right' },
  { id: 'ly-thai-to', name: 'Lý Thái Tổ', type: 'regular', position: { x: 1, y: 3 }, labelPos: 'bottom' },
  { id: 'le-hong-phong', name: 'Lê Hồng Phong', type: 'regular', position: { x: 0, y: 3 }, labelPos: 'left' },
  { id: 'tran-phu', name: 'Trần Phú', type: 'regular', position: { x: 0, y: 2 }, labelPos: 'left' },
  { id: 'nguyen-thi-minh-khai', name: 'Nguyễn Thị Minh Khai', type: 'regular', position: { x: 1, y: 2 }, labelPos: 'bottom' },
  { id: 'cach-mang-thang-8', name: 'Cách Mạng Tháng 8', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'top' },
  { id: 'pham-hong-thai', name: 'Phạm Hồng Thái', type: 'regular', position: { x: 3, y: 2 }, labelPos: 'bottom' },
  { id: 'le-lai', name: 'Lê Lai', type: 'regular', position: { x: 4, y: 2 }, labelPos: 'right' },
  { id: 'ben-thanh', name: 'Bến Thành', type: 'hub', position: { x: 4, y: 1 }, labelPos: 'right' },
  { id: 'tran-hung-dao', name: 'Trần Hưng Đạo', type: 'regular', position: { x: 4, y: 0 }, labelPos: 'right' },
  { id: 'nguyen-van-cu', name: 'Nguyễn Văn Cừ', type: 'regular', position: { x: 3, y: 0 }, labelPos: 'top' },
  { id: 'duong-ba-trac', name: 'Dương Bá Trạc', type: 'regular', position: { x: 2, y: 0 }, labelPos: 'bottom' },
  { id: 'duong-9a', name: 'Đường 9A', type: 'regular', position: { x: 1, y: 0 }, labelPos: 'top' },
  { id: 'kdc-trung-son', name: 'KDC Trung Sơn', type: 'terminal', position: { x: 0, y: 0 }, labelPos: 'left' },
];

// Lượt về: KDC Trung Sơn → Sân bay Tân Sơn Nhất
// NOTE: Hiển thị Sân bay TSN ở ĐẦU TRÊN (y=0) để user thấy rõ điểm bắt đầu
const returnFromKDC: BusStop[] = [
  { id: 'san-bay-tsn', name: 'Sân bay Tân Sơn Nhất', type: 'hub', position: { x: 2, y: 0 }, labelPos: 'top' },
  { id: 'truong-son', name: 'Trường Sơn', type: 'regular', position: { x: 2, y: 1 }, labelPos: 'right' },
  { id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', type: 'regular', position: { x: 2, y: 2 }, labelPos: 'left' },
  { id: 'duong-3-2', name: 'Đường 3/2', type: 'regular', position: { x: 2, y: 3 }, labelPos: 'right' },
  { id: 'ly-thai-to', name: 'Lý Thái Tổ', type: 'regular', position: { x: 1, y: 3 }, labelPos: 'bottom' },
  { id: 'le-hong-phong', name: 'Lê Hồng Phong', type: 'regular', position: { x: 0, y: 3 }, labelPos: 'left' },
  { id: 'tran-phu', name: 'Trần Phú', type: 'regular', position: { x: 0, y: 4 }, labelPos: 'left' },
  { id: 'nguyen-thi-minh-khai', name: 'Nguyễn Thị Minh Khai', type: 'regular', position: { x: 1, y: 4 }, labelPos: 'bottom' },
  { id: 'cach-mang-thang-8', name: 'Cách Mạng Tháng 8', type: 'regular', position: { x: 2, y: 4 }, labelPos: 'top' },
  { id: 'pham-hong-thai', name: 'Phạm Hồng Thái', type: 'regular', position: { x: 3, y: 4 }, labelPos: 'bottom' },
  { id: 'le-lai', name: 'Lê Lai', type: 'regular', position: { x: 4, y: 4 }, labelPos: 'right' },
  { id: 'ben-thanh', name: 'Bến Thành', type: 'hub', position: { x: 4, y: 5 }, labelPos: 'right' },
  { id: 'tran-hung-dao', name: 'Trần Hưng Đạo', type: 'regular', position: { x: 4, y: 6 }, labelPos: 'right' },
  { id: 'nguyen-van-cu', name: 'Nguyễn Văn Cừ', type: 'regular', position: { x: 3, y: 6 }, labelPos: 'top' },
  { id: 'duong-ba-trac', name: 'Dương Bá Trạc', type: 'regular', position: { x: 2, y: 6 }, labelPos: 'bottom' },
  { id: 'duong-9a', name: 'Đường 9A', type: 'regular', position: { x: 1, y: 6 }, labelPos: 'top' },
  { id: 'kdc-trung-son', name: 'KDC Trung Sơn', type: 'terminal', position: { x: 0, y: 6 }, labelPos: 'left' },
];

export const BUS_152_STOPS = {
  outbound: outboundFromSGN,
  return: returnFromKDC,
};
