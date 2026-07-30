import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'What is the cheapest way from Hanoi Airport to the city?',
    a: 'The cheapest way from Noi Bai Airport to central Hanoi is Bus 17 at just VND 7,000 — the absolute cheapest option. Bus 90 is a close second at VND 9,000. If you need more comfort and flexibility, Bus 86 at VND 50,000 is the best balance of cost and reliability, while Grab (VND 200,000–300,000) offers speed and convenience at a premium.',
  },
  {
    q: 'How much is Bus 86 from Noi Bai Airport?',
    a: 'Bus 86 from Noi Bai Airport costs VND 50,000 per ride — one of the most affordable airport bus options in Vietnam. The fare is fixed regardless of time of day or traffic. Payment is made on the bus (cash or MoMo QR code). The bus runs from 05:00 to 22:15 daily.',
  },
  {
    q: 'Is Bus 17 running from Noi Bai Airport?',
    a: 'Yes, Bus 17 operates from Noi Bai Airport to the city center for just VND 7,000. It is the cheapest airport bus in Hanoi. However, Bus 17 runs less frequently than Bus 86 — typically every 15–20 minutes — and the route covers different stops. Check the latest schedule before relying on it for flight arrival timing.',
  },
  {
    q: 'What is Grab fare from Noi Bai Airport to Old Quarter?',
    a: 'Grab fare from Noi Bai Airport to the Old Quarter typically ranges from VND 200,000 to VND 300,000 depending on traffic, time of day, and surge pricing. During peak hours (7–9 AM, 5–7 PM) or bad weather, fares can exceed VND 350,000. The journey takes 35–50 minutes in normal conditions.',
  },
  {
    q: 'Should I take a taxi or Grab at Hanoi Airport?',
    a: 'Always choose Grab over a traditional taxi at Hanoi Airport. Grab (VND 200,000–300,000) is safer, cheaper, and more reliable than metered taxis (VND 300,000–500,000). Every Grab ride is tracked, the fare is shown upfront, and there is no risk of overcharging or route manipulation. Traditional taxis at Noi Bai carry a real scam risk — avoid them unless Grab surge pricing is extremely high.',
  },
  {
    q: 'How long does Bus 86 take from Noi Bai Airport?',
    a: 'Bus 86 from Noi Bai Airport takes 50–75 minutes to reach the Old Quarter depending on traffic. During off-peak hours it is closer to 50 minutes; during rush hour (7–9 AM, 5–7 PM) it can take up to 75 minutes. The bus makes multiple stops along the route, so travel time is less predictable than Grab.',
  },
  {
    q: 'Are there other buses from Noi Bai besides Bus 86?',
    a: 'Yes, several. Bus 17 (VND 7,000) and Bus 90 (VND 9,000) are both cheaper than Bus 86 and go to different parts of the city. Bus 86 is the most popular because it goes directly to the Old Quarter. The other buses serve different routes — Bus 17 and Bus 90 are good budget options if your destination aligns with their stops.',
  },
];

export function CheapestHanPage() {
  const config: ComparisonArticleConfig = {
    seoPath: '/cheapest-way-hanoi-airport',
    h1En: 'Hanoi Airport: Bus vs Grab — Cheapest Route (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 7,000 · VND 50,000 · VND 200,000+ · Chọn phương tiện nào?',
    intro:
      'Năm lựa chọn di chuyển từ sân bay Nội Bài về trung tâm Hà Nội — từ 7.000đ đến 500.000đ. Bus 86 là lựa chọn tốt nhất về giá và độ tin cậy. Grab nhanh hơn nhưng đắt hơn 4–6 lần. Dưới đây là so sánh chi tiết. <a href="/bus-86-hanoi-airport" className="text-primary underline">See full Bus 86 schedule →</a> <a href="/grab-vs-bus-hanoi-airport" className="text-primary underline">Grab vs Bus 86 full comparison →</a> <a href="/airport-scam-vietnam-taxi" className="text-primary underline">Avoid taxi scams →</a>',
    options: [
      {
        name: 'Bus 17',
        priceRange: 'VND 7,000',
        durationRange: '45–60 phút',
        pros: [
          'Rẻ nhất — chỉ 7.000đ cho một chuyến',
          'An toàn, không mặc cả',
          'Có điều hòa',
          'Tần suất 15–20 phút/chuyến',
        ],
        cons: [
          'Ít phổ biến hơn Bus 86',
          'Lộ trình khác — không đến Old Quarter trực tiếp',
          'Tần suất ít hơn giờ cao điểm',
          'Thời gian dài hơn Grab',
        ],
        bestFor: 'Hành khách siêu tiết kiệm, điểm đến gần tuyến Bus 17',
      },
      {
        name: 'Bus 90',
        priceRange: 'VND 9,000',
        durationRange: '40–55 phút',
        pros: [
          'Rẻ thứ hai — chỉ 9.000đ',
          'Tuyến hướng về khu vực Tây Hồ',
          'An toàn, không mặc cả',
          'Thời gian ngắn hơn Bus 17',
        ],
        cons: [
          'Ít phổ biến với du khách',
          'Không đến Old Quarter trực tiếp',
          'Cần kiểm tra lịch trình cụ thể',
          'Tần suất thấp hơn Bus 86',
        ],
        bestFor: 'Hành khách đi khu vực Tây Hồ, muốn tiết kiệm',
      },
      {
        name: 'Bus 86',
        priceRange: 'VND 50,000',
        durationRange: '50–75 phút',
        pros: [
          'Giá cố định VND 50,000 — rẻ và đáng tin cậy',
          'Đến Old Quarter trực tiếp',
          'Không lo surge hay tắc đường',
          'An toàn, không mặc cả, có điều hòa',
        ],
        cons: [
          'Chỉ chạy 05:00–22:15',
          'Thời gian lâu hơn Grab 15–30 phút',
          'Dừng nhiều trạm dọc đường',
          'Không gian hành lý hạn chế',
        ],
        bestFor: 'Hành khách tiết kiệm, đáp chuyến trước 22:00, đi Old Quarter',
      },
      {
        name: 'Grab',
        priceRange: 'VND 200,000–300,000',
        durationRange: '35–50 phút',
        pros: [
          'Nhanh hơn bus 15–30 phút',
          'Hoạt động 24/7 — không giới hạn giờ',
          'App theo dõi, tài xế xác minh, giá cố định trước',
          'Phù hợp 1–3 hành khách với hành lý nhẹ',
        ],
        cons: [
          'Đắt hơn Bus 86 gấp 4–6 lần',
          'Phí surge giờ cao điểm',
          'Phụ thuộc tắc đường',
          'GrabSUV cần cho nhóm ≥ 4 người',
        ],
        bestFor: 'Hành khách ưu tiên tốc độ, đáp sau 22:15, hoặc cần đi ngoài tuyến bus',
      },
      {
        name: 'Taxi',
        priceRange: 'VND 300,000–500,000',
        durationRange: '35–45 phút',
        pros: [
          'Nhanh nhất trong điều kiện tốt',
          'Phù hợp nhóm 4+ hành khách với hành lý nhiều',
          'Hoạt động 24/7',
          'Không phụ thuộc ứng dụng',
        ],
        cons: [
          'Đắt nhất — gấp 6–10 lần Bus 86',
          'Nguy cơ bị lừa đảo / tính giá cao',
          'Phụ thuộc tắc đường nặng',
          'Không an toàn bằng Grab',
        ],
        bestFor: 'Nhóm 4+ hành khách với nhiều hành lý, tránh giờ cao điểm',
      },
    ],
    verdict:
      'Bus 86 là lựa chọn tốt nhất cho hầu hết hành khách — 50.000đ cho chuyến đi sân bay đáng tin cậy, thẳng đến Old Quarter. Bus 17 (7.000đ) và Bus 90 (9.000đ) rẻ hơn nhưng ít phổ biến và lộ trình khác. Grab (200.000–300.000đ) đáng giá nếu bạn cần tốc độ hoặc đáp sau 22:15. Tránh taxi truyền thống — Grab an toàn hơn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/',
    },
    alternatePath: '/vi/cach-re-nhat-san-bay-noi-bai',
  };

  return <ComparisonArticleLayout config={config} />;
}
