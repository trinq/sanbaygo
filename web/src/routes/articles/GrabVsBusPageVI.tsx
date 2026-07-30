import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Xe buýt 86 có rẻ hơn Grab từ sân bay Nội Bài không?',
    a: 'Có, rẻ hơn rất nhiều. Xe buýt 86 giá 50.000đ mỗi chuyến trong khi Grab thường từ 200.000–300.000đ — chênh lệch 4–6 lần. Nếu ngân sách là ưu tiên, xe buýt 86 luôn thắng. Lý do duy nhất để trả thêm cho Grab là bạn hạ cánh sau chuyến xe buýt cuối (22:15) hoặc cần đi ngoài lộ trình xe buýt.',
  },
  {
    q: 'Grab từ sân bay Nội Bài mất bao lâu?',
    a: 'Grab từ sân bay Nội Bài mất 35–50 phút vào trung tâm Hà Nội tùy thời điểm. Giờ cao điểm (7–9 giờ sáng, 5–7 giờ chiều) có thể lên đến 60 phút. Xe buýt 86 mất 50–75 phút. Grab nhanh hơn trung bình, nhưng khoảng cách thu hẹp đáng kể vào giờ cao điểm.',
  },
  {
    q: 'Chuyến xe buýt 86 cuối cùng khởi hành lúc mấy giờ từ Nội Bài?',
    a: 'Chuyến xe buýt 86 cuối cùng từ sân bay Nội Bài khởi hành lúc 22:15. Chuyến đầu tiên từ thành phố ra sân bay khởi hành lúc 05:00. Nếu chuyến bay của bạn hạ cánh sau 22:15, xe buýt 86 sẽ không còn hoạt động và Grab hoặc taxi là lựa chọn duy nhất.',
  },
  {
    q: 'Grab có an toàn tại sân bay Nội Bài không?',
    a: 'Có. Grab là một trong những lựa chọn an toàn nhất từ sân bay Nội Bài vì mỗi chuyến đi đều được theo dõi qua ứng dụng, tài xế được xác minh và giá cố định trước khi đặt. Không giống taxi truyền thống, không có mặc cả và không có nguy cơ bị tính giá cao. Cả GrabCar (sedan) và GrabSUV (xe lớn hơn cho nhóm có hành lý) đều có sẵn.',
  },
  {
    q: 'Tôi có thể mang vali lớn lên xe buýt 86 không?',
    a: 'Bạn có thể mang hành lý lên xe buýt 86 — túi xách tiêu chuẩn được mang miễn phí. Tuy nhiên, không gian hạn chế và xe buýt có thể đông đúc vào giờ cao điểm. Nếu bạn có 2+ vali lớn, Grab hoặc taxi thực tế hơn. Xe buýt 86 không có khoang hành lý chính thức.',
  },
  {
    q: 'Phương tiện nào nhanh hơn: Grab hay xe buýt 86 từ Nội Bài?',
    a: 'Grab nhanh hơn trong hầu hết điều kiện — 35–50 phút so với 50–75 phút của xe buýt 86. Khoảng cách thu hẹp vào giờ cao điểm khi cả hai đều mất thời gian lâu hơn. Xe buýt 86 có lộ trình cố định ít trạm dừng, nên thời gian di chuyển dễ dự đoán hơn Grab phụ thuộc vào tắc đường.',
  },
  {
    q: 'Tôi có nên đi taxi tại sân bay Nội Bài không?',
    a: 'Tránh taxi truyền thống tại Nội Bài trừ khi bạn đi nhóm 4+ hành khách với nhiều hành lý. Taxi tính theo đồng hồ (300.000–500.000đ) đắt hơn Grab đáng kể và có nguy cơ bị lừa. Grab (200.000–300.000đ) an toàn hơn, rẻ hơn và có app theo dõi. Chỉ đi taxi nếu phí surge Grab tăng vọt vào giờ cao điểm sự kiện.',
  },
];

export function GrabVsBusPageVI() {
  const config: ComparisonArticleConfig = {
    seoPath: '/vi/grab-vs-xe-buyt-noi-bai',
    h1En: 'Grab vs Bus 86: Hanoi Airport Cost & Time (2026)',
    h1Vi: 'Grab vs Bus 86 Nội Bài: So sánh Chi phí (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 50,000 · VND 200,000–300,000 · 35–75 phút · Chọn phương tiện nào?',
    intro:
      'Hai phương tiện phổ biến nhất từ sân bay Nội Bài là xe buýt 86 và Grab. Xe buýt 86 giá 50.000đ cố định, Grab giá 200.000–300.000đ tùy thời điểm. Bus 86 chạy 05:00–22:15; Grab hoạt động 24/7. Dưới đây là so sánh chi tiết để bạn chọn đúng. <a href="/vi/tuyen-86-noi-bai" className="text-primary underline">Xem lịch trình xe buýt 86 đầy đủ →</a> <a href="/vi/xe-lo-gio-sanh-bay-viet-nam" className="text-primary underline">An toàn Grab tại sân bay Nội Bài →</a>',
    options: [
      {
        name: 'Xe buýt 86',
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
          'Nhanh hơn xe buýt 86 khoảng 15–30 phút',
          'Hoạt động 24/7 — không giới hạn giờ',
          'App theo dõi, tài xế được xác minh',
          'Phù hợp 1–3 hành khách với hành lý',
        ],
        cons: [
          'Đắt hơn xe buýt 86 gấp 4–6 lần',
          'Phí surge giờ cao điểm',
          'Phụ thuộc tắc đường',
          'GrabSUV cần cho nhóm ≥ 4 người',
        ],
        bestFor: 'Hành khách ưu tiên tốc độ và thoải mái, đáp chuyến sau 22:15',
      },
    ],
    verdict:
      'Chọn xe buýt 86 nếu bạn tiết kiệm và đáp chuyến trước 22:00 — 50.000đ cho một chuyến xe sân bay là mức giá tuyệt vời. Chọn Grab nếu bạn đáp sau 22:15, cần tốc độ, hoặc đi nhóm có hành lý lớn. Tránh taxi truyền thống trừ khi bạn đi nhóm 4+ người — Grab an toàn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/vi/',
    },
    alternatePath: '/grab-vs-bus-hanoi-airport',
  };

  return <ComparisonArticleLayout config={config} />;
}
