import { BUS_86 } from '@core/data/busSchedule';
import { AirportArticleLayout } from '../../components/Layout/AirportArticleLayout';
import type { BusArticleConfig } from '../../components/Layout/AirportArticleLayout';

const STOPS = [
  { name: 'Sân bay Nội Bài – Ga T1, Cổng A1', address: 'Tầng 1 sảnh đến, đối diện cột 12' },
  { name: 'Sân bay Nội Bài – Ga T2, Cổng A1', address: 'Tầng 1 sảnh đến, đối diện cột 14' },
  { name: 'Cầu Nhật Tân', address: 'Qua cầu Nhật Tân' },
  { name: 'Đại lộ Thăng Long', address: 'Đại lộ Thăng Long, quận Bắc Từ Liêm' },
  { name: 'Phố cổ Hà Nội', address: 'Khu phố cổ, quận Hoàn Kiếm' },
];

const FAQ_ITEMS = [
  {
    q: 'Xe buýt 86 từ sân bay Nội Bài giá bao nhiêu?',
    a: `Xe buýt 86 có giá VND ${BUS_86.ticketPrice.toLocaleString()} một chuyến từ sân bay Nội Bài đến trung tâm Hà Nội.`,
  },
  {
    q: 'Xe buýt 86 từ Nội Bài đến trung tâm thành phố mất bao lâu?',
    a: `Hành trình mất khoảng ${BUS_86.travelTime.normal.min}–${BUS_86.travelTime.normal.max} phút bình thường, hoặc ${BUS_86.travelTime.peak.min}–${BUS_86.travelTime.peak.max} phút vào giờ cao điểm (7–9 sáng, 5–7 tối).`,
  },
  {
    q: 'Xe buýt 86 dừng ở đâu tại sân bay Nội Bài?',
    a: 'Xe buýt 86 dừng tại Tầng 1 sảnh đến cổng A1 của cả hai nhà ga T1 và T2 tại sân bay Nội Bài.',
  },
  {
    q: 'Xe buýt 86 chạy mấy giờ?',
    a: `Xe buýt 86 chạy từ ${BUS_86.operatingHours.start} đến ${BUS_86.operatingHours.end} hàng ngày, khởi hành mỗi 15–20 phút.`,
  },
  {
    q: 'Xe buýt 86 có an toàn cho du khách không?',
    a: 'Có, xe buýt 86 là tuyến do nhà nước vận hành với giá cố định. Không có nguy cơ bị tính phí cao hơn.',
  },
];

export function Bus86Page() {
  const schedule =
    BUS_86.scheduleSource.kind === 'explicit' ? BUS_86.scheduleSource.departures : [];

  const config: BusArticleConfig = {
    seoPath: '/bus-86-hanoi-airport',
    h1En: 'Bus 86 — Hanoi Airport to Old Quarter',
    categoryLabel: 'Xe buýt sân bay Hà Nội',
    subtitle: `VND ${BUS_86.ticketPrice.toLocaleString()} · ${BUS_86.operatingHours.start}–${BUS_86.operatingHours.end} · Every 15–20 min`,
    bus: BUS_86,
    airportCode: 'HAN',
    defaultTerminal: 'HAN-T1',
    stops: STOPS,
    frequency: '15–20 phút',
    grabPriceRange: 'VND 250,000–350,000',
    scheduleCount: schedule.length,
    dataSource: 'Hanoi Public Transport Center (tramdep.vn)',
    pickupHint: 'Bus 86 dừng tại T1 Cổng A1 (tầng đến, cột 12) và T2 Cổng A1 (cột 14).',
    faqItems: FAQ_ITEMS,
    alternatePath: '/vi/tuyen-86-noi-bai',
  };

  return <AirportArticleLayout config={config} />;
}
