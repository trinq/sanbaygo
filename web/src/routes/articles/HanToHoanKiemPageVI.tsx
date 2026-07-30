import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Grab từ sân bay Hà Nội đến Hồ Hoàn Kiếm bao nhiêu tiền?',
    a: 'Grab từ sân bay Nội Bài đến Hồ Hoàn Kiếm có giá 150.000–250.000đ tùy thời điểm và tình trạng giao thông. Giờ cao điểm (7–9 giờ sáng, 5–7 giờ chiều) giá có thể lên đến 300.000đ+. Thời gian di chuyển 30–45 phút khi không tắc đường. Dùng app Grab để biết giá cố định trước khi đặt.',
  },
  {
    q: 'Xe buýt 86 có dừng gần Hồ Hoàn Kiếm không?',
    a: 'Có — Xe buýt 86 dừng tại Ga Hà Nội, cách Hồ Hoàn Kiếm khoảng 5 phút đi bộ. Giá vé xe buýt 86 là 50.000đ. Từ sân bay, thời gian di chuyển khoảng 60–80 phút tùy tắc đường. Đây là lựa chọn tiết kiệm phổ biến nhất để đến khu phố cổ và Hồ Hoàn Kiếm.',
  },
  {
    q: 'Từ sân bay Nội Bài đến Hồ Hoàn Kiếm mất bao lâu?',
    a: 'Tùy phương tiện. Xe buýt 86 mất 60–80 phút; xe buýt 17 mất 55–70 phút; Grab hoặc taxi mất 30–45 phút. Giờ cao điểm (7–9 giờ sáng, 5–7 giờ chiều) tất cả đều chậm hơn — nên dự phòng thêm 20–30 phút cho tắc đường.',
  },
  {
    q: 'Có xe buýt nào đi thẳng từ Nội Bài đến Hồ Hoàn Kiếm không?',
    a: 'Không có xe buýt nào đi thẳng đến Hồ Hoàn Kiếm. Xe buýt 86 từ Nội Bài dừng tại Ga Hà Nội, cách đó 5 phút đi bộ. Xe buýt 17 có lộ trình khác. Muốn đi thẳng đến nơi, dùng Grab — sẽ đưa bạn đến đúng vị trí.',
  },
  {
    q: 'Tôi có thể đi bộ từ điểm dừng xe buýt 86 đến Hồ Hoàn Kiếm không?',
    a: 'Hoàn toàn có thể — Xe buýt 86 dừng tại Ga Hà Nội, và Hồ Hoàn Kiếm cách đó 5 phút đi bộ. Từ ga đi theo đường Trần Phú, rẽ trái vào Đinh Tiên Hoàng — hồ sẽ nằm bên phải. Đoạn đường bằng phẳng, an toàn, dọc đường có nhiều quán ăn vặt.',
  },
  {
    q: 'Tôi nên đi taxi hay Grab từ sân bay Nội Bài?',
    a: 'Luôn chọn Grab thay vì taxi truyền thống tại Nội Bài. Grab (150.000–250.000đ) an toàn hơn, rẻ hơn và đáng tin cậy hơn taxi (250.000–400.000đ). Mỗi chuyến Grab đều được theo dõi qua app, giá hiển thị trước, không có nguy cơ bị tính giá cao. Taxi truyền thống tại Nội Bài có nguy cơ lừa đảo thực — hãy tránh.',
  },
];

export function HanToHoanKiemPageVI() {
  const config: ComparisonArticleConfig = {
    seoPath: '/vi/san-bay-noi-bai-den-ho-hoan-kiem',
    h1En: 'Hanoi Airport to Hoan Kiem: 4 Routes (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 7,000 · VND 50,000 · VND 150,000–250,000 · Đến Hồ Hoàn Kiếm',
    intro:
      'Bốn cách di chuyển từ sân bay Nội Bài đến Hồ Hoàn Kiếm — từ 7.000đ đến 400.000đ. Bus 86 dừng gần nhất (Ga Hà Nội, đi bộ 5 phút). Grab nhanh nhất nhưng đắt hơn 3–5 lần. Dưới đây là so sánh chi tiết. <a href="/vi/tuyen-86-noi-bai" className="text-primary underline">Xem lịch trình xe buýt 86 đầy đủ →</a> <a href="/vi/grab-vs-xe-buyt-noi-bai" className="text-primary underline">So sánh Grab vs Bus 86 chi tiết →</a>',
    options: [
      {
        name: 'Xe buýt 86',
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
        name: 'Xe buýt 17',
        priceRange: 'VND 7,000',
        durationRange: '55–70 phút',
        pros: [
          'Rẻ nhất — chỉ 7.000đ',
          'An toàn, không mặc cả',
          'Có điều hòa',
          'Ít đông đúc hơn xe buýt 86',
        ],
        cons: [
          'Không dừng gần Hồ Hoàn Kiếm — cần đi bộ hoặc đổi xe',
          'Ít phổ biến hơn xe buýt 86',
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
          'Đắt hơn xe buýt 86 gấp 3–5 lần',
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
          'Đắt nhất — gấp 5–8 lần xe buýt 86',
          'Nguy cơ bị lừa đảo / tính giá cao',
          'Phụ thuộc tắc đường nặng',
          'Không an toàn bằng Grab',
        ],
        bestFor: 'Nhóm 4+ hành khách với nhiều hành lý, tránh giờ cao điểm',
      },
    ],
    verdict:
      'Xe buýt 86 là lựa chọn tốt nhất cho hầu hết hành khách đến Hồ Hoàn Kiếm — 50.000đ cho chuyến đáng tin cậy, dừng tại Ga Hà Nội (đi bộ 5 phút). Xe buýt 17 (7.000đ) rẻ hơn nhưng không dừng gần Hồ. Grab (150.000–250.000đ) đáng giá nếu bạn cần tốc độ hoặc đáp sau 22:15. Tránh taxi truyền thống — Grab an toàn hơn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/vi/',
    },
    alternatePath: '/hanoi-airport-to-hoan-kiem-lake',
  };

  return <ComparisonArticleLayout config={config} />;
}
