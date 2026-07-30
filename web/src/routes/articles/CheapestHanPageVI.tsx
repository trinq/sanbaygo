import { ComparisonArticleLayout } from '../../components/Layout/ComparisonArticleLayout';
import type { ComparisonArticleConfig } from '../../components/Layout/ComparisonArticleLayout';

const FAQ_ITEMS = [
  {
    q: 'Cách rẻ nhất từ sân bay Nội Bài về trung tâm là gì?',
    a: 'Cách rẻ nhất từ sân bay Nội Bài về trung tâm Hà Nội là xe buýt 17 chỉ 7.000đ — lựa chọn rẻ nhất tuyệt đối. Xe buýt 90 đứng thứ hai với 9.000đ. Nếu bạn cần sự thoải mái và linh hoạt hơn, xe buýt 86 với 50.000đ là sự cân bằng tốt nhất giữa giá và độ tin cậy, trong khi Grab (200.000–300.000đ) mang lại tốc độ và tiện nghi với mức giá cao hơn.',
  },
  {
    q: 'Xe buýt 86 từ sân bay Nội Bài bao nhiêu tiền?',
    a: 'Xe buýt 86 từ sân bay Nội Bài giá 50.000đ mỗi chuyến — một trong những tuyến xe buýt sân bay phổ biến nhất Việt Nam. Giá cố định không phụ thuộc giờ hay tắc đường. Thanh toán ngay trên xe (tiền mặt hoặc mã QR MoMo). Xe buýt chạy từ 05:00 đến 22:15 hàng ngày.',
  },
  {
    q: 'Xe buýt 17 có chạy từ sân bay Nội Bài không?',
    a: 'Có, xe buýt 17 hoạt động từ sân bay Nội Bài vào trung tâm thành phố chỉ với 7.000đ. Đây là tuyến xe buýt sân bay rẻ nhất Hà Nội. Tuy nhiên, xe buýt 17 chạy ít tần suất hơn xe buýt 86 — thường 15–20 phút/chuyến — và lộ trình đến các điểm khác nhau. Kiểm tra lịch trình mới nhất trước khi dựa vào nó để đón chuyến bay.',
  },
  {
    q: 'Giá Grab từ sân bay Nội Bài về Phố Cổ bao nhiêu?',
    a: 'Giá Grab từ sân bay Nội Bài về Phố Cổ thường từ 200.000đ đến 300.000đ tùy thời điểm, tắc đường và phí surge. Vào giờ cao điểm (7–9 giờ sáng, 5–7 giờ chiều) hoặc trời mưa, giá có thể vượt 350.000đ. Thời gian di chuyển 35–50 phút trong điều kiện bình thường.',
  },
  {
    q: 'Tôi nên đi taxi hay Grab tại sân bay Nội Bài?',
    a: 'Luôn chọn Grab thay vì taxi truyền thống tại sân bay Nội Bài. Grab (200.000–300.000đ) an toàn hơn, rẻ hơn và đáng tin cậy hơn taxi tính theo đồng hồ (300.000–500.000đ). Mỗi chuyến Grab đều được theo dõi, giá hiển thị trước và không có nguy cơ bị tính giá cao. Taxi truyền thống tại Nội Bài có nguy cơ bị lừa đảo thực sự — tránh chúng trừ khi phí surge Grab tăng vọt.',
  },
  {
    q: 'Xe buýt 86 từ sân bay Nội Bài mất bao lâu?',
    a: 'Xe buýt 86 từ sân bay Nội Bài mất 50–75 phút để đến Phố Cổ tùy thời điểm. Giờ thấp điểm khoảng 50 phút; giờ cao điểm (7–9 giờ sáng, 5–7 giờ chiều) có thể lên đến 75 phút. Xe buýt dừng nhiều trạm dọc đường nên thời gian di chuyển kém dự đoán hơn Grab.',
  },
  {
    q: 'Có những xe buýt nào khác từ Nội Bài ngoài xe buýt 86?',
    a: 'Có, có nhiều tuyến. Xe buýt 17 (7.000đ) và xe buýt 90 (9.000đ) đều rẻ hơn xe buýt 86 và đến các khu vực khác nhau của thành phố. Xe buýt 86 phổ biến nhất vì đi thẳng đến Phố Cổ. Các tuyến khác phù hợp nếu điểm đến của bạn nằm trên lộ trình của chúng.',
  },
];

export function CheapestHanPageVI() {
  const config: ComparisonArticleConfig = {
    seoPath: '/vi/cach-re-nhat-san-bay-noi-bai',
    h1En: 'Hanoi Airport: Bus vs Grab — Cheapest Route (2026)',
    categoryLabel: 'So sánh phương tiện sân bay',
    subtitle: 'VND 7,000 · VND 50,000 · VND 200,000+ · Chọn phương tiện nào?',
    intro:
      'Năm lựa chọn di chuyển từ sân bay Nội Bài về trung tâm Hà Nội — từ 7.000đ đến 500.000đ. Bus 86 là lựa chọn tốt nhất về giá và độ tin cậy. Grab nhanh hơn nhưng đắt hơn 4–6 lần. Dưới đây là so sánh chi tiết. <a href="/vi/tuyen-86-noi-bai" className="text-primary underline">Xem lịch trình xe buýt 86 đầy đủ →</a> <a href="/vi/grab-vs-xe-buyt-noi-bai" className="text-primary underline">So sánh Grab vs xe buýt 86 chi tiết →</a> <a href="/vi/xe-lo-gio-sanh-bay-viet-nam" className="text-primary underline">Tránh lừa đảo taxi →</a>',
    options: [
      {
        name: 'Xe buýt 17',
        priceRange: 'VND 7,000',
        durationRange: '45–60 phút',
        pros: [
          'Rẻ nhất — chỉ 7.000đ cho một chuyến',
          'An toàn, không mặc cả',
          'Có điều hòa',
          'Tần suất 15–20 phút/chuyến',
        ],
        cons: [
          'Ít phổ biến hơn xe buýt 86',
          'Lộ trình khác — không đến Phố Cổ trực tiếp',
          'Tần suất ít hơn giờ cao điểm',
          'Thời gian dài hơn Grab',
        ],
        bestFor: 'Hành khách siêu tiết kiệm, điểm đến gần tuyến xe buýt 17',
      },
      {
        name: 'Xe buýt 90',
        priceRange: 'VND 9,000',
        durationRange: '40–55 phút',
        pros: [
          'Rẻ thứ hai — chỉ 9.000đ',
          'Tuyến hướng về khu vực Tây Hồ',
          'An toàn, không mặc cả',
          'Thời gian ngắn hơn xe buýt 17',
        ],
        cons: [
          'Ít phổ biến với du khách',
          'Không đến Phố Cổ trực tiếp',
          'Cần kiểm tra lịch trình cụ thể',
          'Tần suất thấp hơn xe buýt 86',
        ],
        bestFor: 'Hành khách đi khu vực Tây Hồ, muốn tiết kiệm',
      },
      {
        name: 'Xe buýt 86',
        priceRange: 'VND 50,000',
        durationRange: '50–75 phút',
        pros: [
          'Giá cố định VND 50,000 — rẻ và đáng tin cậy',
          'Đến Phố Cổ trực tiếp',
          'Không lo surge hay tắc đường',
          'An toàn, không mặc cả, có điều hòa',
        ],
        cons: [
          'Chỉ chạy 05:00–22:15',
          'Thời gian lâu hơn Grab 15–30 phút',
          'Dừng nhiều trạm dọc đường',
          'Không gian hành lý hạn chế',
        ],
        bestFor: 'Hành khách tiết kiệm, đáp chuyến trước 22:00, đi Phố Cổ',
      },
      {
        name: 'Grab',
        priceRange: 'VND 200,000–300,000',
        durationRange: '35–50 phút',
        pros: [
          'Nhanh hơn xe buýt 15–30 phút',
          'Hoạt động 24/7 — không giới hạn giờ',
          'App theo dõi, tài xế xác minh, giá cố định trước',
          'Phù hợp 1–3 hành khách với hành lý nhẹ',
        ],
        cons: [
          'Đắt hơn xe buýt 86 gấp 4–6 lần',
          'Phí surge giờ cao điểm',
          'Phụ thuộc tắc đường',
          'GrabSUV cần cho nhóm ≥ 4 người',
        ],
        bestFor: 'Hành khách ưu tiên tốc độ, đáp sau 22:15, hoặc cần đi ngoài tuyến xe buýt',
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
          'Đắt nhất — gấp 6–10 lần xe buýt 86',
          'Nguy cơ bị lừa đảo / tính giá cao',
          'Phụ thuộc tắc đường nặng',
          'Không an toàn bằng Grab',
        ],
        bestFor: 'Nhóm 4+ hành khách với nhiều hành lý, tránh giờ cao điểm',
      },
    ],
    verdict:
      'Xe buýt 86 là lựa chọn tốt nhất cho hầu hết hành khách — 50.000đ cho chuyến đi sân bay đáng tin cậy, thẳng đến Phố Cổ. Xe buýt 17 (7.000đ) và xe buýt 90 (9.000đ) rẻ hơn nhưng ít phổ biến và lộ trình khác. Grab (200.000–300.000đ) đáng giá nếu bạn cần tốc độ hoặc đáp sau 22:15. Tránh taxi truyền thống — Grab an toàn hơn và rẻ hơn.',
    faqItems: FAQ_ITEMS,
    cta: {
      label: 'Mở SanBayGo — Tính giờ ra cổng',
      href: '/vi/',
    },
    alternatePath: '/cheapest-way-hanoi-airport',
  };

  return <ComparisonArticleLayout config={config} />;
}
