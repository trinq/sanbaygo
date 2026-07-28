import { BusRouteMap } from '../../types';

// Lượt đi: Sân bay Tân Sơn Nhất → KDC Trung Sơn
const outboundStops: import('../../types').BusStop[] = [
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
const returnStops: import('../../types').BusStop[] = [
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

export const BUS_152_MAP: BusRouteMap = {
  routeNumber: '152',
  outboundStops,
  returnStops,
  destinationToStopId: {
    // Hub stops (destination points)
    'ben-thanh': 'ben-thanh',
    'le-lai': 'le-lai',
    'tran-hung-dao': 'tran-hung-dao',
    'nguyen-van-cu': 'nguyen-van-cu',
    'san-bay-tsn': 'san-bay-tsn',
    // District destinations — mapping to nearest stop
    'q1': 'ben-thanh',
    'q3': 'le-lai',           // Lê Lai is closest to Q3 boundary
    'q5': 'tran-hung-dao',    // Trần Hưng Đạo is closest to Q5
    'binh-thanh': 'tran-hung-dao',  // Bình Thạnh north side
    'phu-nhuan': 'tran-hung-dao',   // Phú Nhuận near Trần Hưng Đạo
  },
};
