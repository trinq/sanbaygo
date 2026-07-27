import { BusStop } from './types';

export const outboundStops: BusStop[] = [
  { id: 'kdc-trung-son', name: 'KDC Trung Sơn', isHub: false, isTerminal: true, position: { x: 0, y: 0 } },
  { id: 'duong-9a', name: 'Đường 9A', isHub: false, isTerminal: false, position: { x: 1, y: 0 } },
  { id: 'duong-ba-trac', name: 'Dương Bá Trạc', isHub: false, isTerminal: false, position: { x: 2, y: 0 } },
  { id: 'nguyen-van-cu', name: 'Nguyễn Văn Cừ', isHub: false, isTerminal: false, position: { x: 3, y: 0 } },
  { id: 'tran-hung-dao', name: 'Trần Hưng Đạo', isHub: false, isTerminal: false, position: { x: 4, y: 0 } },
  { id: 'ben-thanh', name: 'Bến Thành', isHub: true, isTerminal: false, position: { x: 4, y: 1 } },
  { id: 'le-lai', name: 'Lê Lai', isHub: false, isTerminal: false, position: { x: 4, y: 2 } },
  { id: 'pham-hong-thai', name: 'Phạm Hồng Thái', isHub: false, isTerminal: false, position: { x: 3, y: 2 } },
  { id: 'cach-mang-thang-8', name: 'Cách Mạng Tháng Tám', isHub: false, isTerminal: false, position: { x: 3, y: 3 } },
  { id: 'nguyen-thi-minh-khai', name: 'Nguyễn Thị Minh Khai', isHub: false, isTerminal: false, position: { x: 2, y: 3 } },
  { id: 'pasteur', name: 'Pasteur', isHub: false, isTerminal: false, position: { x: 2, y: 4 } },
  { id: 'vo-thi-sau', name: 'Võ Thị Sáu', isHub: false, isTerminal: false, position: { x: 1, y: 4 } },
  { id: 'nam-ky-khoi-nghia', name: 'Nam Kỳ Khởi Nghĩa', isHub: false, isTerminal: false, position: { x: 1, y: 5 } },
  { id: 'nguyen-van-troi', name: 'Nguyễn Văn Trỗi', isHub: false, isTerminal: false, position: { x: 0, y: 5 } },
  { id: 'phan-dinh-giot', name: 'Phan Đình Giót', isHub: false, isTerminal: false, position: { x: 0, y: 6 } },
  { id: 'truong-son', name: 'Trường Sơn', isHub: false, isTerminal: false, position: { x: 0, y: 7 } },
  { id: 'sgn-t3', name: 'SGN T3', isHub: true, isTerminal: true, position: { x: 0, y: 8 } },
];

export const returnStops: BusStop[] = [
  { id: 'sgn-t3', name: 'SGN T3', isHub: true, isTerminal: true, position: { x: 0, y: 0 } },
  { id: 'truong-son', name: 'Trường Sơn', isHub: false, isTerminal: false, position: { x: 1, y: 0 } },
  { id: 'tran-quoc-hoan', name: 'Trần Quốc Hoàn', isHub: false, isTerminal: false, position: { x: 2, y: 0 } },
  { id: 'hoang-van-thu', name: 'Hoàng Văn Thụ', isHub: false, isTerminal: false, position: { x: 3, y: 0 } },
  { id: 'nguyen-van-troi-r', name: 'Nguyễn Văn Trỗi', isHub: false, isTerminal: false, position: { x: 4, y: 0 } },
  { id: 'nam-ky-khoi-nghia-r', name: 'Nam Kỳ Khởi Nghĩa', isHub: false, isTerminal: false, position: { x: 4, y: 1 } },
  { id: 'ham-nghi', name: 'Hàm Nghi', isHub: false, isTerminal: false, position: { x: 4, y: 2 } },
  { id: 'ben-thanh-r', name: 'Bến Thành', isHub: true, isTerminal: false, position: { x: 4, y: 3 } },
  { id: 'tran-hung-dao-r', name: 'Trần Hưng Đạo', isHub: false, isTerminal: false, position: { x: 3, y: 3 } },
  { id: 'nguyen-van-cu-r', name: 'Nguyễn Văn Cừ', isHub: false, isTerminal: false, position: { x: 2, y: 3 } },
  { id: 'duong-ba-trac-r', name: 'Dương Bá Trạc', isHub: false, isTerminal: false, position: { x: 1, y: 3 } },
  { id: 'duong-9a-r', name: 'Đường 9A', isHub: false, isTerminal: false, position: { x: 1, y: 4 } },
  { id: 'kdc-trung-son-r', name: 'KDC Trung Sơn', isHub: false, isTerminal: true, position: { x: 1, y: 5 } },
];

export const BUS_152_STOPS = {
  outbound: outboundStops,
  return: returnStops,
};
