import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Is Bus 109 or 152 cheaper from Tan Son Nhat Airport?',
    a: 'Bus 152 is significantly cheaper at VND 5,000 versus Bus 109 at VND 15,000. That is a 3× price difference — VND 10,000 saved per person. For two passengers, you save VND 20,000. However, Bus 152 stops at T1/T2, not T3, and takes slightly less time on average.',
  },
  {
    q: 'Does Bus 109 run after 10pm?',
    a: 'No. Bus 109 operates from 05:30 to 22:00 (last departure from city to airport). If you land after 22:00, both Bus 109 and Bus 152 will have stopped running. Your only options are Grab (VND 100,000–180,000) or a taxi.',
  },
  {
    q: 'Does Bus 152 accept large luggage?',
    a: 'Bus 152 is a public city bus — there is no formal luggage hold. You carry large bags onto the bus yourself. Space is limited on the aisle. If you have 2+ large suitcases, Grab or a taxi is more practical, as buses can get crowded during peak hours.',
  },
  {
    q: 'How long does each bus take to District 1?',
    a: 'Bus 109 takes 30–45 minutes in normal traffic and 50–70 minutes during peak hours (7–9 AM, 5–7 PM). Bus 152 takes 25–35 minutes normally and 40–55 minutes during peak hours. Bus 152 is marginally faster on average.',
  },
  {
    q: 'Which bus is safer at night?',
    a: 'Both buses are state-operated with fixed fares, so scam risk is low. Bus 109 tends to feel safer at night because it is an electric bus with fewer passengers and a direct route. Bus 152 serves more city stops and may be more crowded during evening rush. Either is safer than an unlicensed taxi.',
  },
  {
    q: 'Where exactly is the Bus 109 stop at T3?',
    a: 'Bus 109 picks up at Tan Son Nhat Terminal 3 (T3), Arrivals Hall, curbside columns A17–A20 on the ground floor. Follow the signs for "Xe buýt công cộng" (public bus). Bus 109 does NOT stop at T1 or T2 — you must get to T3 first.',
  },
];

export function Bus109Vs152Page() {
  const config: ComparisonArticleConfig = {
    seoPath: '/bus-109-vs-152-tan-son-nhat',
    h1En: 'Bus 109 vs 152: Tan Son Nhat Airport — Which Should You Take? (2026)',
    categoryLabel: 'So sánh xe buýt sân bay',
    subtitle: 'VND 5,000 · VND 15,000 · 25–70 phút · Chọn tuyến nào?',
    intro:
      'Hai tuyến xe buýt công cộng phổ biến nhất từ sân bay Tân Sơn Nhất là Bus 109 và Bus 152. Bus 109 là xe buýt điện chạy từ T3 vào trung tâm; Bus 152 là xe buýt thường giá rẻ nhất Việt Nam, chạy từ T1/T2. Cả hai đều rẻ hơn Grab (VND 100,000–180,000) nhưng cần thời gian chờ. Dưới đây là so sánh chi tiết để bạn chọn đúng tuyến.',
    options: [
      {
        name: 'Bus 109',
        priceRange: 'VND 15,000',
        durationRange: '30–70 phút (tùy giờ)',
        pros: [
          'Xe buýt điện hiện đại, có điều hòa',
          'Đón tại T3 — tiện nếu bay nội địa hoặc quốc tế đã đến T3',
          'Lộ trình trực tiếp, ít trạm dừng hơn',
          'Không chen lấn như xe buýt thường',
        ],
        cons: [
          'Giá cao hơn Bus 152 gấp 3 lần (VND 15,000 vs 5,000)',
          'Chỉ đón tại T3 — không đón tại T1/T2',
          'Tần suất thưa (45 phút/chuyến)',
          'Giờ cao điểm, thời gian lên đến 70 phút',
        ],
        bestFor: 'Hành khách tại Ga T3, có thêm hành lý, muốn sự thoải mái với giá hợp lý',
      },
      {
        name: 'Bus 152',
        priceRange: 'VND 5,000',
        durationRange: '25–55 phút (tùy giờ)',
        pros: [
          'Rẻ nhất Việt Nam — chỉ VND 5,000 một chuyến',
          'Đón tại cả T1 và T2 (đối với hành khách quốc tế)',
          'Tần suất dày (12–20 phút/chuyến)',
          'Thời gian hành trình ngắn hơn Bus 109 trong điều kiện bình thường',
        ],
        cons: [
          'Xe buýt thường, không có điều hòa mạnh',
          'Không đón tại T3 — phải di chuyển từ T3 sang T1/T2 hoặc bỏ qua',
          'Nhiều trạm dừng dọc đường, hành trình có thể dài vào giờ cao điểm',
          'Hạn chế về không gian hành lý lớn',
        ],
        bestFor: 'Hành khách tại Ga T1/T2, đi ít hành lý, muốn tiết kiệm tối đa',
      },
    ],
    verdict:
      'Chọn Bus 152 nếu bạn ở T1 hoặc T2 và có ít hành lý — VND 5,000 là mức giá không thể tin được cho một chuyến xe sân bay. Chọn Bus 109 nếu bạn đang ở T3, có thêm hành lý lớn, hoặc muốn sự thoải mái của xe buýt điện có điều hòa. Cả hai đều rẻ hơn Grab ít nhất 6 lần.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/',
    },
    alternatePath: '/vi/xe-buyt-109-vs-152-tan-son-nhat',
  };

  return <ComparisonArticleLayout config={config} />;
}
