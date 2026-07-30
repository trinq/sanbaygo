import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'How much is Grab from Hanoi Airport to Hoan Kiem Lake?',
    a: 'Grab from Noi Bai Airport to Hoan Kiem Lake costs VND 150,000–250,000 depending on traffic and time of day. During peak hours (7–9 AM, 5–7 PM) fares can reach VND 300,000+. The journey takes 30–45 minutes in normal traffic. Use the Grab app for a fixed price before you book.',
  },
  {
    q: 'Does Bus 86 go near Hoan Kiem Lake?',
    a: 'Yes — Bus 86 stops at "Ga Hà Nội" (Hanoi Train Station), which is a 5-minute walk from Hoan Kiem Lake. The bus fare is VND 50,000. From the airport, the journey takes 60–80 minutes depending on traffic. This is the most popular budget option for reaching the Old Quarter and Hoan Kiem.',
  },
  {
    q: 'How long does it take from Noi Bai Airport to Hoan Kiem?',
    a: 'It depends on your transport choice. Bus 86 takes 60–80 minutes; Bus 17 takes 55–70 minutes; Grab or taxi takes 30–45 minutes. During peak hours (7–9 AM, 5–7 PM), all options can be significantly slower — budget an extra 20–30 minutes for traffic.',
  },
  {
    q: 'Is there a direct bus from Noi Bai to Hoan Kiem Lake?',
    a: 'No single bus goes directly to Hoan Kiem Lake. Bus 86 from Noi Bai stops at Hanoi Train Station, a short walk from the lake. Bus 17 has a different route. For a direct door-to-door option, use Grab — it will take you exactly where you need to go.',
  },
  {
    q: 'Can I walk from the Bus 86 stop to Hoan Kiem Lake?',
    a: 'Yes — Bus 86 stops at Hanoi Train Station (Ga Hà Nội), and Hoan Kiem Lake is a 5-minute walk away. Head south from the train station along Tran Phu Street, then turn left onto Dinh Tien Hoang Street — the lake will be on your right. The walk is flat and safe, with plenty of street food vendors along the way.',
  },
  {
    q: 'Should I take a taxi or Grab from Noi Bai Airport?',
    a: 'Always choose Grab over a traditional taxi at Noi Bai Airport. Grab (VND 150,000–250,000) is safer, cheaper, and more reliable than metered taxis (VND 250,000–400,000). Every Grab ride is tracked, the fare is shown upfront, and there is no risk of overcharging. Traditional taxis at Noi Bai carry a real scam risk — avoid them.',
  },
];

export function HanToHoanKiemPage() {
  const config: ComparisonArticleConfig = {
    seoPath: '/hanoi-airport-to-hoan-kiem-lake',
    h1En: 'Hanoi Airport to Hoan Kiem: 4 Routes (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 7,000 · VND 50,000 · VND 150,000–250,000 · Đến Hồ Hoàn Kiếm',
    intro:
      'Bốn cách di chuyển từ sân bay Nội Bài đến Hồ Hoàn Kiếm — từ 7.000đ đến 400.000đ. Bus 86 dừng gần nhất (Ga Hà Nội, đi bộ 5 phút). Grab nhanh nhất nhưng đắt hơn 3–5 lần. Dưới đây là so sánh chi tiết.',
    options: [
      {
        name: 'Bus 86',
        priceRange: 'VND 50,000',
        durationRange: '60–80 phút',
        pros: [
          'Dừng tại Ga Hà Nội — đi bộ 5 phút đến Hồ Hoàn Kiếm',
          'Giá cố định 50.000đ — không surge, không tắc đường ảnh hưởng giá',
          'An toàn, không mặc cả, có điều hòa',
          'Hoạt động 05:00–22:15',
        ],
        cons: [
          'Chỉ chạy đến 22:15 — không phù hợp nếu đáp muộn',
          'Chậm hơn Grab 20–40 phút',
          'Phụ thuộc tắc đường',
          'Không gian hành lý hạn chế với vali lớn',
        ],
        bestFor: 'Hành khách tiết kiệm, đáp trước 22:00, đi Old Quarter / Hồ Hoàn Kiếm',
      },
      {
        name: 'Bus 17',
        priceRange: 'VND 7,000',
        durationRange: '55–70 phút',
        pros: [
          'Rẻ nhất — chỉ 7.000đ',
          'An toàn, không mặc cả',
          'Có điều hòa',
          'Ít đông đúc hơn Bus 86',
        ],
        cons: [
          'Không dừng gần Hồ Hoàn Kiếm — cần đi bộ hoặc đổi xe',
          'Ít phổ biến hơn Bus 86',
          'Cần kiểm tra lịch trình cụ thể',
          'Tần suất thấp hơn giờ cao điểm',
        ],
        bestFor: 'Hành khách siêu tiết kiệm, quen di chuyển xe buýt Hà Nội',
      },
      {
        name: 'Grab',
        priceRange: 'VND 150,000–250,000',
        durationRange: '30–45 phút',
        pros: [
          'Nhanh nhất — 30–45 phút đến tận nơi',
          'Hoạt động 24/7 — không giới hạn giờ',
          'App theo dõi, tài xế xác minh, giá cố định trước',
          'Phù hợp 1–3 hành khách với hành lý nhẹ',
        ],
        cons: [
          'Đắt hơn Bus 86 gấp 3–5 lần',
          'Phí surge giờ cao điểm',
          'Phụ thuộc tắc đường',
          'GrabSUV cần cho nhóm ≥ 4 người',
        ],
        bestFor: 'Hành khách ưu tiên tốc độ, đáp muộn, hoặc cần đi chính xác đến Hồ Hoàn Kiếm',
      },
      {
        name: 'Taxi',
        priceRange: 'VND 250,000–400,000',
        durationRange: '30–40 phút',
        pros: [
          'Nhanh — 30–40 phút trong điều kiện tốt',
          'Phù hợp nhóm 4+ hành khách với hành lý nhiều',
          'Hoạt động 24/7',
          'Không phụ thuộc ứng dụng',
        ],
        cons: [
          'Đắt nhất — gấp 5–8 lần Bus 86',
          'Nguy cơ bị lừa đảo / tính giá cao',
          'Phụ thuộc tắc đường nặng',
          'Không an toàn bằng Grab',
        ],
        bestFor: 'Nhóm 4+ hành khách với nhiều hành lý, tránh giờ cao điểm',
      },
    ],
    verdict:
      'Bus 86 là lựa chọn tốt nhất cho hầu hết hành khách đến Hồ Hoàn Kiếm — 50.000đ cho chuyến đáng tin cậy, dừng tại Ga Hà Nội (đi bộ 5 phút). Bus 17 (7.000đ) rẻ hơn nhưng không dừng gần Hồ. Grab (150.000–250.000đ) đáng giá nếu bạn cần tốc độ hoặc đáp sau 22:15. Tránh taxi truyền thống — Grab an toàn hơn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/',
    },
    alternatePath: '/vi/san-bay-noi-bai-den-ho-hoan-kiem',
  };

  return <ComparisonArticleLayout config={config} />;
}
