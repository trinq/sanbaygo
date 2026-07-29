import { BUS_152 } from '@core/data/busSchedules/sgn';
import { AirportArticleLayout } from '../../components/Layout/AirportArticleLayout';
import type { BusArticleConfig } from '../../components/Layout/AirportArticleLayout';

const STOPS = [
  { name: 'Sân bay Tân Sơn Nhất – Ga T1, Cổng B', address: 'Làn B ga quốc nội, cột B06–B09' },
  { name: 'Sân bay Tân Sơn Nhất – Ga T2, Cổng B', address: 'Làn B, đối diện Cột số 4 và Cột số 5 sảnh đến quốc tế' },
  { name: 'Trường Chinh', address: 'Quận Tân Bình, TP.HCM' },
  { name: 'Lăng Cha Cả', address: 'Quận Tân Bình, TP.HCM' },
  { name: 'Bến Thành', address: 'Quận 1, TP.HCM' },
];

const FAQ_ITEMS = [
  {
    q: 'Xe buýt 152 từ sân bay Tân Sơn Nhất giá bao nhiêu?',
    a: `Xe buýt 152 có giá VND ${BUS_152.ticketPrice.toLocaleString()} một chuyến từ sân bay Tân Sơn Nhất đến trung tâm TP.HCM.`,
  },
  {
    q: 'Xe buýt 152 từ Tân Sơn Nhất đến trung tâm mất bao lâu?',
    a: `Hành trình mất khoảng ${BUS_152.travelTime.normal.min}–${BUS_152.travelTime.normal.max} phút bình thường, hoặc ${BUS_152.travelTime.peak.min}–${BUS_152.travelTime.peak.max} phút vào giờ cao điểm (7–9 sáng, 5–7 tối).`,
  },
  {
    q: 'Xe buýt 152 dừng ở đâu tại sân bay Tân Sơn Nhất?',
    a: 'Xe buýt 152 đón tại Ga T1 (Làn B, cột B06–B09) và Ga T2 (Làn B, đối diện Cột số 4 và 5). Không đón tại T3.',
  },
  {
    q: 'Xe buýt 152 chạy mấy giờ?',
    a: `Xe buýt 152 chạy từ ${BUS_152.operatingHours.start} đến ${BUS_152.operatingHours.end} hàng ngày, khởi hành mỗi 12–20 phút.`,
  },
  {
    q: 'Xe buýt 152 có an toàn cho du khách không?',
    a: 'Có, xe buýt 152 là tuyến do nhà nước vận hành với giá cố định. Không có nguy cơ bị tính phí cao hơn.',
  },
];

export function Bus152PageVI() {
  const config: BusArticleConfig = {
    seoPath: '/vi/tuyen-152-tan-son-nhat',
    h1En: 'Tuyến xe buýt 152 — Ga T1/T2 Tân Sơn Nhất đến Bến Thành',
    categoryLabel: 'Xe buýt sân bay TP.HCM',
    subtitle: `VND ${BUS_152.ticketPrice.toLocaleString()} · ${BUS_152.operatingHours.start}–${BUS_152.operatingHours.end} · Mỗi 12–20 phút`,
    bus: BUS_152,
    airportCode: 'SGN',
    defaultTerminal: 'SGN-T1',
    stops: STOPS,
    frequency: '12–20 phút',
    grabPriceRange: 'VND 100,000–180,000',
    scheduleCount: BUS_152.scheduleSource.kind === 'explicit'
      ? BUS_152.scheduleSource.departures.length
      : 0,
    dataSource: 'FUTA City Bus (Phương Trang)',
    pickupHint: 'Bus 152 đón tại Ga T1 (Làn B, cột B06–B09) và Ga T2 (Làn B, cột 4–5).',
    faqItems: FAQ_ITEMS,
    alternatePath: '/bus-152-saigon-fare',
  };

  return <AirportArticleLayout config={config} />;
}
