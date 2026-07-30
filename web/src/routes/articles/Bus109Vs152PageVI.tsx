import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Xe buýt 109 hay 152 rẻ hơn từ sân bay Tân Sơn Nhất?',
    a: 'Xe buýt 152 rẻ hơn nhiều với giá 5.000đ so với xe buýt 109 là 15.000đ — chênh lệch gấp 3 lần, tiết kiệm được 10.000đ mỗi người. Nếu đi 2 người, bạn tiết kiệm 20.000đ. Tuy nhiên, xe buýt 152 đón tại T1/T2 chứ không đón tại T3, và thời gian chờ có thể dài hơn.',
  },
  {
    q: 'Xe buýt 109 có chạy sau 22:00 không?',
    a: 'Không. Xe buýt 109 hoạt động từ 05:30 đến 22:00 (chuyến cuối từ thành phố về sân bay). Nếu bạn hạ cánh sau 22:00, cả xe buýt 109 và 152 đều đã ngừng hoạt động. Lựa chọn duy nhất lúc này là Grab (100.000đ–180.000đ) hoặc taxi.',
  },
  {
    q: 'Xe buýt 152 có chấp nhận hành lý lớn không?',
    a: 'Xe buýt 152 là xe buýt thành phố — không có khoang hành lý riêng. Bạn tự mang vali lên xe và để ở lối đi. Không gian hạn chế, nhất là vào giờ cao điểm. Nếu bạn có 2 vali lớn trở lên, Grab hoặc taxi sẽ thực tế hơn nhiều.',
  },
  {
    q: 'Mỗi tuyến xe buýt mất bao lâu để đến Quận 1?',
    a: 'Xe buýt 109 mất 30–45 phút khi giao thông bình thường và 50–70 phút vào giờ cao điểm (7–9 sáng, 5–7 tối). Xe buýt 152 mất 25–35 phút bình thường và 40–55 phút giờ cao điểm. Xe buýt 152 nhanh hơn một chút trong điều kiện bình thường.',
  },
  {
    q: 'Tuyến nào an toàn hơn về đêm?',
    a: 'Cả hai tuyến đều do nhà nước vận hành với giá cố định nên nguy cơ bị lừa rất thấp. Xe buýt 109 cảm giác an toàn hơn về đêm vì là xe buýt điện, ít khách hơn và lộ trình trực tiếp hơn. Xe buýt 152 dừng nhiều trạm hơn nên đông đúc hơn vào giờ tan tầm. Dù chọn tuyến nào, cũng an toàn hơn taxi không phép.',
  },
  {
    q: 'Điểm đón xe buýt 109 ở đâu tại T3?',
    a: 'Xe buýt 109 đón khách tại Ga T3 (Ga đến nội địa/quốc tế), tầng 1, dãy cột A17–A20 bên ngoài sảnh đến. Đi theo biển chỉ dẫn "Xe buýt công cộng". Xe buýt 109 KHÔNG đón tại T1 hay T2 — bạn phải ra T3 trước.',
  },
];

export function Bus109Vs152PageVI() {
  const config: ComparisonArticleConfig = {
    seoPath: '/vi/xe-buyt-109-vs-152-tan-son-nhat',
    h1En: 'So sánh xe buýt 109 và 152: Tân Sơn Nhất — Nên chọn tuyến nào? (2026)',
    categoryLabel: 'So sánh xe buýt sân bay',
    subtitle: '5.000đ · 15.000đ · 25–70 phút · Chọn tuyến nào?',
    intro:
      'Hai tuyến xe buýt công cộng phổ biến nhất từ sân bay Tân Sơn Nhất là Bus 109 và Bus 152. Bus 109 là xe buýt điện chạy từ T3 vào trung tâm; Bus 152 là xe buýt thường giá rẻ nhất Việt Nam, chạy từ T1/T2. Cả hai đều rẻ hơn Grab (100.000đ–180.000đ) nhưng cần thời gian chờ. Dưới đây là so sánh chi tiết để bạn chọn đúng tuyến. <a href="/vi/tuyen-109-tan-son-nhat" className="text-primary underline">Xem lịch xe buýt 109 đầy đủ →</a> <a href="/vi/tuyen-152-tan-son-nhat" className="text-primary underline">Xem hướng dẫn xe buýt 152 →</a>',
    options: [
      {
        name: 'Xe buýt 109',
        priceRange: '15.000đ',
        durationRange: '30–70 phút (tùy giờ)',
        pros: [
          'Xe buýt điện hiện đại, có điều hòa',
          'Đón tại T3 — tiện nếu bay nội địa hoặc quốc tế đã đến T3',
          'Lộ trình trực tiếp, ít trạm dừng hơn',
          'Không chen lấn như xe buýt thường',
        ],
        cons: [
          'Giá cao hơn Bus 152 gấp 3 lần (15.000đ vs 5.000đ)',
          'Chỉ đón tại T3 — không đón tại T1/T2',
          'Tần suất thưa (45 phút/chuyến)',
          'Giờ cao điểm, thời gian lên đến 70 phút',
        ],
        bestFor: 'Hành khách tại Ga T3, có thêm hành lý, muốn sự thoải mái với giá hợp lý',
      },
      {
        name: 'Xe buýt 152',
        priceRange: '5.000đ',
        durationRange: '25–55 phút (tùy giờ)',
        pros: [
          'Rẻ nhất Việt Nam — chỉ 5.000đ một chuyến',
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
      'Chọn xe buýt 152 nếu bạn ở T1 hoặc T2 và có ít hành lý — 5.000đ là mức giá không thể tin được cho một chuyến xe sân bay. Chọn xe buýt 109 nếu bạn đang ở T3, có thêm hành lý lớn, hoặc muốn sự thoải mái của xe buýt điện có điều hòa. Cả hai đều rẻ hơn Grab ít nhất 6 lần.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/',
    },
    alternatePath: '/bus-109-vs-152-tan-son-nhat',
  };

  return <ComparisonArticleLayout config={config} />;
}
