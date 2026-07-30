import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Cách rẻ nhất từ sân bay Sài Gòn về Quận 1 là gì?',
    a: 'Cách rẻ nhất từ sân bay Tân Sơn Nhất về Quận 1 là xe buýt 152 chỉ 5.000đ — lựa chọn rẻ nhất trong tất cả các tuyến xe buýt sân bay Việt Nam. Xe buýt 109 giá 15.000đ và nhanh hơn một chút. Grab (200.000–300.000đ) và taxi (200.000–350.000đ) đắt hơn nhiều nhưng nhanh hơn đáng kể. Xe buýt 152 đón khách ngay tại T1 và T2.',
  },
  {
    q: 'Xe buýt 152 từ sân bay Tân Sơn Nhất bao nhiêu tiền?',
    a: 'Xe buýt 152 từ sân bay Tân Sơn Nhất giá 5.000đ mỗi chuyến — lựa chọn rẻ nhất trong tất cả các tuyến xe buýt sân bay Việt Nam. Giá cố định không phụ thuộc giờ hay tắc đường. Thanh toán ngay trên xe (tiền mặt hoặc mã QR MoMo). Xe buýt hoạt động từ 05:00 đến 22:00 hàng ngày và mất 45–60 phút đến Quận 1.',
  },
  {
    q: 'Bến xe buýt 109 ở đâu tại sân bay Tân Sơn Nhất?',
    a: 'Xe buýt 109 đón khách tại tầng trệt (Tầng 1) nhà ga T3 — nhà ga quốc tế của sân bay Tân Sơn Nhất. Bến xe có biển báo rõ ràng ở phía đến của T3. Lưu ý: xe buýt 109 KHÔNG đón tại T1 hay T2 — bạn phải đến T3. Ngược lại, xe buýt 152 đón tại T1 và T2.',
  },
  {
    q: 'Tôi có thể mang hành lý lên xe buýt 152 từ T1 không?',
    a: 'Có, bạn có thể mang hành lý lên xe buýt 152 từ T1. Xe buýt có không gian cho hành lý xách tay và ba lô tiêu chuẩn. Tuy nhiên, nếu bạn có vali lớn, xe buýt có thể chật chội — Grab (200.000–300.000đ) sẽ thoải mái hơn. Bến xe buýt 152 nằm ở tầng đến, ngay bên ngoài T1 và T2, có biển báo màu xanh dương.',
  },
  {
    q: 'Grab từ sân bay Sài Gòn về Quận 1 mất bao lâu?',
    a: 'Grab từ sân bay Tân Sơn Nhất về Quận 1 thường mất 20–35 phút tùy tắc đường. Vào giờ cao điểm (7–9 giờ sáng, 5–7 giờ chiều) có thể mất 40–50 phút. Giá Grab dao động từ 200.000đ đến 300.000đ bình thường, và có thể tăng trên 350.000đ vào giờ cao điểm hoặc trời mưa. Điểm đón Grab nằm ở khu vực được chỉ định trên tầng đến.',
  },
  {
    q: 'Có xe buýt trực tiếp từ T3 về Quận 1 không?',
    a: 'Có, xe buýt 109 đi trực tiếp từ T3 về Quận 1 và các khu vực lân cận với giá 15.000đ. Đây là xe buýt trực tiếp duy nhất từ T3 — là xe buýt điện, có điều hòa, và mất 30–45 phút. Xe buýt 152 KHÔNG đón tại T3; chỉ phục vụ T1 và T2. Nếu bạn đáp tại T3, xe buýt 109 là lựa chọn tiết kiệm tốt nhất.',
  },
  {
    q: 'Tôi nên đi taxi hay Grab tại sân bay Tân Sơn Nhất?',
    a: 'Luôn chọn Grab thay vì taxi truyền thống tại sân bay Tân Sơn Nhất. Grab (200.000–300.000đ) an toàn hơn, rẻ hơn và đáng tin cậy hơn taxi tính theo đồng hồ (200.000–350.000đ). Mỗi chuyến Grab đều được theo dõi, giá hiển thị trước và không có nguy cơ bị tính giá cao. Taxi truyền thống tại Tân Sơn Nhất có nguy cơ tính giá cao thực sự — tránh chúng trừ khi phí surge Grab tăng vọt.',
  },
];

export function CheapestSgnPageVI() {
  const config: ComparisonArticleConfig = {
    seoPath: '/vi/cach-re-nhat-san-bay-sai-gon',
    h1En: 'Saigon Airport to District 1: 5 Options Ranked (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 5,000 · VND 15,000 · VND 200,000+ · Chọn phương tiện nào?',
    intro:
      'Năm lựa chọn di chuyển từ sân bay Tân Sơn Nhất về Quận 1 Sài Gòn — từ 5.000đ đến 500.000đ. Bus 152 là lựa chọn rẻ nhất (5.000đ). Grab nhanh hơn nhưng đắt hơn 40–60 lần. <a href="/vi/tuyen-152-tan-son-nhat" className="text-primary underline">Xem hướng dẫn xe buýt 152 đầy đủ →</a> <a href="/vi/tuyen-109-tan-son-nhat" className="text-primary underline">Xem lịch trình xe buýt 109 →</a> <a href="/vi/xe-buyt-109-vs-152-tan-son-nhat" className="text-primary underline">So sánh xe buýt 109 vs 152 →</a>',
    options: [
      {
        name: 'Xe buýt 152',
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
          'Tần suất thấp hơn xe buýt 109',
          'Thời gian dài hơn Grab',
          'Không gian hành lý hạn chế với vali lớn',
        ],
        bestFor: 'Hành khách siêu tiết kiệm, điểm đến gần tuyến xe buýt 152',
      },
      {
        name: 'Xe buýt 109',
        priceRange: 'VND 15,000',
        durationRange: '30–45 phút',
        pros: [
          'Giá rẻ — chỉ 15.000đ',
          'Xe buýt điện, có điều hòa',
          'Nhanh hơn xe buýt 152',
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
          'Đắt hơn xe buýt 152 gấp 40–60 lần',
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
          'Đắt hơn xe buýt 152 gấp 40–70 lần',
          'Nguy cơ tính giá cao',
          'Không an toàn bằng Grab',
          'Phụ thuộc tắc đường nặng',
        ],
        bestFor: 'Nhóm 4+ hành khách với nhiều hành lý, tránh giờ cao điểm',
      },
      {
        name: 'Dịch vụ đưa đón khách sạn',
        priceRange: 'VND 300,000–500,000',
        durationRange: '20–30 phút',
        pros: [
          'Không cần chờ đợi — đón ngay tại sân bay',
          'An toàn, tài xế chuyên nghiệp',
          'Phù hợp nhóm hoặc gia đình',
          'Thoải mái, không phải vật lộn với hành lý',
        ],
        cons: [
          'Đắt nhất — gấp 60–100 lần xe buýt 152',
          'Cần đặt trước (thường qua khách sạn)',
          'Không linh hoạt nếu kế hoạch thay đổi',
          'Có thể không có sẵn nếu đặt muộn',
        ],
        bestFor: 'Gia đình, nhóm nhiều người, hoặc khách cao cấp cần tiện nghi tối đa',
      },
    ],
    verdict:
      'Xe buýt 152 là lựa chọn rẻ nhất tuyệt đối (5.000đ) cho hành khách từ T1/T2. Xe buýt 109 (15.000đ) là lựa chọn giá trị tốt nhất — rẻ và nhanh, dành cho hành khách từ T3. Grab (200.000–300.000đ) đáng giá nếu bạn cần tốc độ hoặc đến Quận 1 nhanh chóng. Tránh taxi truyền thống — Grab an toàn hơn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/vi/',
    },
    alternatePath: '/cheapest-way-saigon-airport-district-1',
  };

  return <ComparisonArticleLayout config={config} />;
}
