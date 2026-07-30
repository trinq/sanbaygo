import { BUS_109 } from '@core/data/busSchedules/sgn';
import { AirportArticleLayout } from '../../components/Layout/AirportArticleLayout';
import type { BusArticleConfig } from '../../components/Layout/AirportArticleLayout';

const STOPS = [
  { name: 'Sân bay Tân Sơn Nhất – Ga T3, Cổng A', address: 'Tầng 1 sảnh đến, cột A17–A20' },
  { name: 'Nguyễn Văn Trỗi', address: 'Quận Tân Bình' },
  { name: 'Nam Kỳ Khởi Nghĩa', address: 'Quận 3, TP.HCM' },
  { name: 'Hàm Nghi', address: 'Quận 1, TP.HCM' },
  { name: 'Bến xe buýt Sài Gòn', address: 'Quận 1, TP.HCM' },
];

const FAQ_ITEMS = [
  {
    q: 'Xe buýt 109 từ sân bay Tân Sơn Nhất giá bao nhiêu?',
    a: `Xe buýt 109 có giá VND ${BUS_109.ticketPrice.toLocaleString()} một chuyến từ Ga T3 sân bay Tân Sơn Nhất đến trung tâm TP.HCM.`,
  },
  {
    q: 'Xe buýt 109 từ Tân Sơn Nhất đến trung tâm mất bao lâu?',
    a: `Hành trình mất khoảng ${BUS_109.travelTime.normal.min}–${BUS_109.travelTime.normal.max} phút bình thường, hoặc ${BUS_109.travelTime.peak.min}–${BUS_109.travelTime.peak.max} phút vào giờ cao điểm (7–9 sáng, 5–7 tối).`,
  },
  {
    q: 'Xe buýt 109 dừng ở đâu tại sân bay Tân Sơn Nhất?',
    a: 'Xe buýt 109 chỉ đón tại Ga T3, cột A17–A20. Không đón tại T1 hay T2.',
  },
  {
    q: 'Xe buýt 109 chạy mấy giờ?',
    a: `Xe buýt 109 chạy từ ${BUS_109.operatingHours.start} đến ${BUS_109.operatingHours.end} hàng ngày, khởi hành mỗi 45 phút.`,
  },
  {
    q: 'Xe buýt 109 có an toàn cho du khách không?',
    a: 'Có, xe buýt 109 là tuyến xe buýt do nhà nước vận hành với giá cố định. Không có nguy cơ bị tính phí cao hơn.',
  },
];

export function Bus109PageVI() {
  const config: BusArticleConfig = {
    seoPath: '/vi/tuyen-109-tan-son-nhat',
    h1En: 'Tuyến xe buýt 109 — Ga T3 Tân Sơn Nhất đến Bến xe buýt Sài Gòn',
    categoryLabel: 'Xe buýt sân bay TP.HCM',
    subtitle: `VND ${BUS_109.ticketPrice.toLocaleString()} · ${BUS_109.operatingHours.start}–${BUS_109.operatingHours.end} · Mỗi 45 phút`,
    bus: BUS_109,
    airportCode: 'SGN',
    defaultTerminal: 'SGN-T3',
    stops: STOPS,
    frequency: '45 phút',
    grabPriceRange: 'VND 100,000–180,000',
    scheduleCount: BUS_109.scheduleSource.kind === 'explicit'
      ? BUS_109.scheduleSource.departures.length
      : 0,
    dataSource: 'FUTA City Bus (Phương Trang)',
    pickupHint: 'Bus 109 đón tại Ga T3, tầng đến, cột A17–A20.',
    faqItems: FAQ_ITEMS,
    alternatePath: '/bus-109-saigon-airport',
  };

  return (
    <>
      <AirportArticleLayout config={config} />
      <nav className="max-w-3xl mx-auto px-4 pb-8 text-sm text-ink-soft">
        Bài viết liên quan:{' '}
        <a href="/vi/tuyen-109-tan-son-nhat" className="text-primary underline">Tuyến 109 Tân Sơn Nhất</a>
        {' · '}
        <a href="/vi/tuyen-152-tan-son-nhat" className="text-primary underline">Tuyến 152</a>
        {' · '}
        <a href="/vi/cach-re-nhat-san-bay-sai-gon" className="text-primary underline">Cách rẻ nhất từ sân bay Sài Gòn</a>
      </nav>
    </>
  );
}
