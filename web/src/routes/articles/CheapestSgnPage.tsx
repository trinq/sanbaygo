import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'What is the cheapest way from Saigon Airport to District 1?',
    a: 'The cheapest way from Tan Son Nhat Airport to District 1 is Bus 152 at just VND 5,000 — the absolute cheapest airport bus in Vietnam. Bus 109 costs VND 15,000 and is slightly faster. Grab (VND 200,000–300,000) and taxi (VND 200,000–350,000) are far more expensive but significantly faster. Bus 152 departs from outside T1 and T2, making it the best budget option.',
  },
  {
    q: 'How much is Bus 152 from Tan Son Nhat Airport?',
    a: 'Bus 152 from Tan Son Nhat Airport costs VND 5,000 per ride — the cheapest airport bus in all of Vietnam. The fare is fixed regardless of time of day or traffic. Payment is made on the bus (cash or MoMo QR code). The bus operates from 05:00 to 22:00 daily and takes 45–60 minutes to District 1.',
  },
  {
    q: 'Where is the Bus 109 stop at Tan Son Nhat Airport?',
    a: 'Bus 109 departs from outside Terminal 3 (T3) at Tan Son Nhat Airport — the international terminal. The stop is clearly marked on the ground floor (Level 1) of T3, on the arrivals side. Note that Bus 109 does NOT pick up from T1 or T2 — you must go to T3. Bus 152, by contrast, picks up outside T1 and T2.',
  },
  {
    q: 'Can I take Bus 152 with luggage from T1?',
    a: 'Yes, you can take Bus 152 with luggage from T1. The bus has space for standard carry-on luggage and backpacks. However, if you have large suitcases, the bus may be cramped — a Grab (VND 200,000–300,000) would be more comfortable. Bus 152 stops are located on the arrivals level outside T1 and T2, clearly marked with a blue bus stop sign.',
  },
  {
    q: 'How long does Grab take from Saigon Airport to District 1?',
    a: 'Grab from Tan Son Nhat Airport to District 1 typically takes 20–35 minutes depending on traffic. During peak hours (7–9 AM, 5–7 PM) it can take 40–50 minutes. Fares range from VND 200,000 to VND 300,000 normally, and can surge above VND 350,000 during rush hour or bad weather. Grab pickup is at the designated Grab zone on the arrivals level.',
  },
  {
    q: 'Is there a direct bus from T3 to District 1?',
    a: 'Yes, Bus 109 departs directly from T3 (Terminal 3) to District 1 and surrounding areas for VND 15,000. This is the only direct bus from T3 — it is an electric bus, air-conditioned, and takes 30–45 minutes. Bus 152 does NOT pick up from T3; it only serves T1 and T2. If you are arriving at T3, Bus 109 is your best budget option.',
  },
  {
    q: 'Should I take a taxi or Grab at Saigon Airport?',
    a: 'Always choose Grab over a traditional taxi at Tan Son Nhat Airport. Grab (VND 200,000–300,000) is safer, cheaper, and more reliable than metered taxis (VND 200,000–350,000). Every Grab ride is tracked, the fare is shown upfront, and there is no risk of overcharging or route manipulation. Traditional taxis at Tan Son Nhat carry a real overcharging risk — avoid them unless Grab surge pricing is extremely high.',
  },
];

export function CheapestSgnPage() {
  const config: ComparisonArticleConfig = {
    seoPath: '/cheapest-way-saigon-airport-district-1',
    h1En: 'Saigon Airport to District 1: 5 Options Ranked (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 5,000 · VND 15,000 · VND 200,000+ · Chọn phương tiện nào?',
    intro:
      'Năm lựa chọn di chuyển từ sân bay Tân Sơn Nhất về Quận 1 Sài Gòn — từ 5.000đ đến 500.000đ. Bus 152 là lựa chọn rẻ nhất (5.000đ). Grab nhanh hơn nhưng đắt hơn 40–60 lần. <a href="/bus-152-saigon-fare" className="text-primary underline">See full Bus 152 guide →</a> <a href="/bus-109-saigon-airport" className="text-primary underline">See full Bus 109 schedule →</a> <a href="/bus-109-vs-152-tan-son-nhat" className="text-primary underline">Bus 109 vs 152 comparison →</a>',
    options: [
      {
        name: 'Bus 152',
        priceRange: 'VND 5,000',
        durationRange: '45–60 phút',
        pros: [
          'Rẻ nhất — chỉ 5.000đ cho một chuyến',
          'An toàn, không mặc cả',
          'Có điều hòa',
          'Phục vụ T1 và T2',
          'Hoạt động 05:00–22:00',
        ],
        cons: [
          'Không phục vụ T3',
          'Tần suất thấp hơn Bus 109',
          'Thời gian dài hơn Grab',
          'Không gian hành lý hạn chế với vali lớn',
        ],
        bestFor: 'Hành khách siêu tiết kiệm, điểm đến gần tuyến Bus 152',
      },
      {
        name: 'Bus 109',
        priceRange: 'VND 15,000',
        durationRange: '30–45 phút',
        pros: [
          'Giá rẻ — chỉ 15.000đ',
          'Xe buýt điện, có điều hòa',
          'Nhanh hơn Bus 152',
          'Hoạt động 05:30–22:00',
          'Phục vụ T3 trực tiếp',
        ],
        cons: [
          'Chỉ phục vụ T3 — không đón từ T1/T2',
          'Ít phổ biến hơn với du khách',
          'Thời gian phụ thuộc tắc đường',
          'Cần đi bộ đến T3 nếu đáp T1/T2',
        ],
        bestFor: 'Hành khách từ T3, cần lựa chọn rẻ và nhanh',
      },
      {
        name: 'Grab',
        priceRange: 'VND 200,000–300,000',
        durationRange: '20–35 phút',
        pros: [
          'Nhanh nhất trong hầu hết điều kiện',
          'Hoạt động 24/7 — không giới hạn giờ',
          'App theo dõi, tài xế xác minh, giá cố định trước',
          'Phù hợp 1–3 hành khách với hành lý nhẹ',
        ],
        cons: [
          'Đắt hơn Bus 152 gấp 40–60 lần',
          'Phí surge giờ cao điểm',
          'GrabSUV cần cho nhóm ≥ 4 người hoặc nhiều hành lý',
          'Phụ thuộc tắc đường',
        ],
        bestFor: 'Hành khách ưu tiên tốc độ, đáp T1/T2/T3 đều được',
      },
      {
        name: 'Taxi',
        priceRange: 'VND 200,000–350,000',
        durationRange: '20–35 phút',
        pros: [
          'Nhanh nhất trong điều kiện tốt',
          'Phù hợp nhóm 4+ hành khách với hành lý nhiều',
          'Hoạt động 24/7',
          'Không phụ thuộc ứng dụng',
        ],
        cons: [
          'Đắt hơn Bus 152 gấp 40–70 lần',
          'Nguy cơ tính giá cao',
          'Không an toàn bằng Grab',
          'Phụ thuộc tắc đường nặng',
        ],
        bestFor: 'Nhóm 4+ hành khách với nhiều hành lý, tránh giờ cao điểm',
      },
      {
        name: 'Hotel Transfer',
        priceRange: 'VND 300,000–500,000',
        durationRange: '20–30 phút',
        pros: [
          'Không cần chờ đợi — đón ngay tại sân bay',
          'An toàn, tài xế chuyên nghiệp',
          'Phù hợp nhóm hoặc gia đình',
          'Thoải mái, không phải vật lộn với hành lý',
        ],
        cons: [
          'Đắt nhất — gấp 60–100 lần Bus 152',
          'Cần đặt trước (thường qua khách sạn)',
          'Không linh hoạt nếu kế hoạch thay đổi',
          'Có thể không có sẵn nếu đặt muộn',
        ],
        bestFor: 'Gia đình, nhóm nhiều người, hoặc khách cao cấp cần tiện nghi tối đa',
      },
    ],
    verdict:
      'Bus 152 là lựa chọn rẻ nhất tuyệt đối (5.000đ) cho hành khách từ T1/T2. Bus 109 (15.000đ) là lựa chọn giá trị tốt nhất — rẻ và nhanh, dành cho hành khách từ T3. Grab (200.000–300.000đ) đáng giá nếu bạn cần tốc độ hoặc đến Quận 1 nhanh chóng. Tránh taxi truyền thống — Grab an toàn hơn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/',
    },
    alternatePath: '/vi/cach-re-nhat-san-bay-sai-gon',
  };

  return <ComparisonArticleLayout config={config} />;
}
