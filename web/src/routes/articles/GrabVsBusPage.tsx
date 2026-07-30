import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Is Bus 86 cheaper than Grab from Hanoi Airport?',
    a: 'Yes, by a huge margin. Bus 86 costs VND 50,000 per ride while Grab typically costs VND 200,000–300,000 — a 4–6× difference. If budget is your priority, Bus 86 wins every time. The only reason to pay more for Grab is if you land after the last Bus 86 (22:15) or need to travel outside its route.',
  },
  {
    q: 'How long does Grab take from Noi Bai Airport?',
    a: 'Grab from Noi Bai Airport takes 35–50 minutes to central Hanoi depending on traffic. During peak hours (7–9 AM, 5–7 PM), it can take up to 60 minutes. Bus 86 takes 50–75 minutes. Grab is faster on average, but the time difference shrinks during rush hour.',
  },
  {
    q: 'What time does the last Bus 86 leave from Noi Bai?',
    a: 'The last Bus 86 from Noi Bai Airport departs at 22:15. The first departure from the city to the airport is at 05:00. If your flight lands after 22:15, Bus 86 will no longer be running and Grab or a taxi will be your only options from the airport.',
  },
  {
    q: 'Is Grab safe at Hanoi Airport?',
    a: 'Yes. Grab is one of the safest options from Noi Bai Airport because every ride is tracked via the app, the driver is verified, and the fare is fixed before you book. Unlike traditional taxis, there is no negotiation and no risk of being overcharged. Both GrabCar (sedan) and GrabSUV (larger vehicle for groups with luggage) are available.',
  },
  {
    q: 'Can I take Bus 86 with a large suitcase?',
    a: 'You can bring luggage onto Bus 86 — standard carry-on bags are allowed at no extra charge. However, space is limited and the bus can get crowded during peak hours. If you have 2+ large suitcases, Grab or a taxi is more practical. There is no formal luggage hold on Bus 86.',
  },
  {
    q: 'Which is faster: Grab or Bus 86 from Noi Bai?',
    a: 'Grab is faster in most conditions — 35–50 minutes versus 50–75 minutes for Bus 86. The gap narrows during peak hours when both take longer. Bus 86 also has a fixed route with limited stops, so travel time is more predictable than Grab which follows traffic.',
  },
  {
    q: 'Should I take a taxi at Hanoi Airport?',
    a: 'Avoid traditional taxis at Noi Bai unless you are a group of 4+ passengers with lots of luggage. Metered taxis (VND 300,000–500,000) are significantly more expensive than Grab and carry scam/overcharging risk. Grab (VND 200,000–300,000) is safer, cheaper, and app-tracked. Only take a taxi if Grab surge pricing spikes during peak events.',
  },
];

export function GrabVsBusPage() {
  const config: ComparisonArticleConfig = {
    seoPath: '/grab-vs-bus-hanoi-airport',
    h1En: 'Grab vs Bus 86: Hanoi Airport Cost & Time (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 50,000 · VND 200,000–300,000 · 35–75 phút · Chọn phương tiện nào?',
    intro:
      'Hai phương tiện phổ biến nhất từ sân bay Nội Bài là xe buýt 86 và Grab. Xe buýt 86 giá 50.000đ cố định, Grab giá 200.000–300.000đ tùy thời điểm. Bus 86 chạy 05:00–22:15; Grab hoạt động 24/7. Dưới đây là so sánh chi tiết để bạn chọn đúng. <a href="/bus-86-hanoi-airport" className="text-primary underline">See full Bus 86 schedule →</a> <a href="/is-grab-safe-hanoi-airport" className="text-primary underline">Is Grab safe at Hanoi Airport? →</a>',
    options: [
      {
        name: 'Bus 86',
        priceRange: 'VND 50,000',
        durationRange: '50–75 phút (tùy giờ)',
        pros: [
          'Giá cố định VND 50,000 — rẻ nhất từ Nội Bài',
          'Không lo tắc đường hay phí surge',
          'An toàn, không mặc cả',
          'Có điều hòa, chỗ ngồi rộng rãi',
        ],
        cons: [
          'Chỉ chạy 05:00–22:15',
          'Dừng nhiều trạm dọc đường',
          'Không gian hành lý hạn chế',
          'Thời gian lâu hơn Grab 15–30 phút',
        ],
        bestFor: 'Hành khách tiết kiệm, không vội, đáp chuyến trước 22:00',
      },
      {
        name: 'Grab',
        priceRange: 'VND 200,000–300,000',
        durationRange: '35–50 phút (tùy giờ)',
        pros: [
          'Nhanh hơn Bus 86 khoảng 15–30 phút',
          'Hoạt động 24/7 — không giới hạn giờ',
          'App theo dõi, tài xế được xác minh',
          'Phù hợp 1–3 hành khách với hành lý',
        ],
        cons: [
          'Đắt hơn Bus 86 gấp 4–6 lần',
          'Phí surge giờ cao điểm',
          'Phụ thuộc tắc đường',
          'GrabSUV cần cho nhóm ≥ 4 người',
        ],
        bestFor: 'Hành khách ưu tiên tốc độ và thoải mái, đáp chuyến sau 22:15',
      },
    ],
    verdict:
      'Chọn Bus 86 nếu bạn tiết kiệm và đáp chuyến trước 22:00 — 50.000đ cho một chuyến xe sân bay là mức giá tuyệt vời. Chọn Grab nếu bạn đáp sau 22:15, cần tốc độ, hoặc đi nhóm có hành lý lớn. Tránh taxi truyền thống trừ khi bạn đi nhóm 4+ người — Grab an toàn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/',
    },
    alternatePath: '/vi/grab-vs-xe-buyt-noi-bai',
  };

  return <ComparisonArticleLayout config={config} />;
}
