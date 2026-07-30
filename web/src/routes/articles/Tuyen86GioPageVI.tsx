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
    q: 'Xe buýt 86 chạy mấy giờ?',
    a: `Xe buýt 86 chạy từ ${BUS_86.operatingHours.start} đến ${BUS_86.operatingHours.end} hàng ngày.`,
  },
  {
    q: 'Chuyến cuối cùng là mấy giờ?',
    a: `Chuyến cuối cùng khởi hành lúc ${BUS_86.operatingHours.end} từ sân bay Nội Bài về trung tâm Hà Nội.`,
  },
  {
    q: 'Mỗi ngày có bao nhiêu chuyến?',
    a: `Mỗi ngày có ${BUS_86.scheduleSource.kind === 'explicit' ? BUS_86.scheduleSource.departures.length : 0} chuyến từ sân bay Nội Bài đến trung tâm Hà Nội.`,
  },
  {
    q: 'Tần suất bao nhiêu phút?',
    a: 'Tần suất trung bình 15–20 phút mỗi chuyến, tùy theo khung giờ trong ngày.',
  },
  {
    q: 'Có chuyến nào sau 22:00 không?',
    a: 'Không. Chuyến cuối cùng khởi hành lúc 22:15. Sau 22:15 hành khách cần dùng Grab hoặc taxi.',
  },
  {
    q: 'Cuối tuần có chạy không?',
    a: 'Có. Xe buýt 86 chạy hàng ngày, kể cả thứ Bảy, Chủ nhật và ngày lễ với cùng lịch trình 26 chuyến.',
  },
  {
    q: 'Sáng sớm 5 giờ có xe không?',
    a: 'Không. Chuyến sớm nhất trong ngày khởi hành lúc 06:40 từ sân bay Nội Bài.',
  },
  {
    q: 'Nên đến cổng A1 trước giờ khởi hành bao lâu?',
    a: 'Nên đến cổng A1 trước giờ khởi hành khoảng 10–15 phút để mua vé và lên xe buýt đúng giờ.',
  },
];

export function Tuyen86GioPageVI() {
  const schedule =
    BUS_86.scheduleSource.kind === 'explicit' ? BUS_86.scheduleSource.departures : [];

  const config: BusArticleConfig = {
    seoPath: '/vi/tuyen-86-noi-bai-gio',
    h1En: 'Lịch xe buýt 86 Nội Bài — Giờ khởi hành (2026)',
    categoryLabel: 'Xe buýt sân bay Hà Nội',
    subtitle: `VND ${BUS_86.ticketPrice.toLocaleString()} · ${BUS_86.operatingHours.start}–${BUS_86.operatingHours.end} · Mỗi 15–20 phút`,
    bus: BUS_86,
    airportCode: 'HAN',
    defaultTerminal: 'HAN-T1',
    stops: STOPS,
    frequency: '15–20 phút',
    grabPriceRange: 'VND 250,000–350,000',
    scheduleCount: schedule.length,
    dataSource: 'Hanoi Public Transport Center (tramdep.vn)',
    pickupHint:
      'Xe buýt 86 dừng tại T1 Cổng A1 (tầng đến, cột 12) và T2 Cổng A1 (cột 14).',
    faqItems: FAQ_ITEMS,
    alternatePath: '/bus-86-hanoi-airport',
    relatedArticles: [
      { label: 'Tuyến xe buýt 86 sân bay Nội Bài — Lịch trình, Giá vé 2026', href: '/vi/tuyen-86-noi-bai' },
      { label: 'Đi lại đêm khuya từ sân bay Nội Bài (Grab, Taxi, Đưa đón)', href: '/vi/di-chuyen-dem-khuya-san-bay-noi-bai' },
      { label: 'Grab vs xe buýt Nội Bài: So sánh chi phí & thời gian', href: '/vi/grab-vs-xe-buyt-noi-bai' },
      { label: 'Sân bay Nội Bài: Cách rẻ nhất về thành phố', href: '/vi/cach-re-nhat-san-bay-noi-bai' },
    ],
  };

  return <AirportArticleLayout config={config} />;
}