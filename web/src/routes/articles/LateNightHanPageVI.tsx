import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'Grab có hoạt động ở sân bay Nội Bài sau nửa đêm không?',
    a: 'Có. Grab hoạt động 24/7 tại sân bay Nội Bài (HAN). Ứng dụng Grab hoạt động suốt đêm, khu đón P1/P2 mở cửa quanh clock. Đặt xe qua app — giá cố định và hiển thị trước khi xác nhận.',
  },
  {
    q: 'Giá Grab từ sân bay Nội Bài vào ban đêm là bao nhiêu?',
    a: 'Chuyến Grab từ sân bay Nội Bài vào trung tâm Hà Nội có giá 300.000đ–450.000đ vào ban đêm. Phụ phí ban đêm (1,5×–2×) áp dụng từ 22:00 đến 05:00. Giá chính xác hiển thị trên app trước khi xác nhận — không có bất ngờ nào.',
  },
  {
    q: 'Chuyến xe buýt cuối cùng rời sân bay Nội Bài lúc mấy giờ?',
    a: 'Xe buýt 86 là xe buýt công cộng cuối cùng từ sân bay Nội Bài, khởi hành lúc 22:15. Sau 22:15, không có xe buýt công cộng nào cho đến sáng hôm sau (chuyến đầu tiên khoảng 06:40). Nếu bạn đến sau 22:15, Grab hoặc taxi là lựa chọn duy nhất.',
  },
  {
    q: 'Taxi có an toàn ở sân bay Nội Bài vào ban đêm không?',
    a: 'Taxi bên ngoài tại Nội Bài không được khuyến khích vào ban đêm. Tài xế không bật đồng hồ có thể tính 3–5× giá thực. Taxi Mai Linh (hotline 024 38 61 61 61) là lựa chọn có đồng hồ an toàn nhất. Grab là lựa chọn đáng tin cậy nhất — giá cố định và chuyến đi được theo dõi.',
  },
  {
    q: 'Tôi có thể ở lại qua đêm tại sân bay Nội Bài không?',
    a: 'Có — sân bay Nội Bài nhà ga T2 có ghế cơ bản tại sảnh đến và một số quán cà phê mở 24h. Nhà ga mở cửa suốt đêm. Để thoải mái hơn, các khách sạn gần sân bay (5–10 phút bằng Grab) cung cấp xe đưa đón sân bay miễn phí nếu đặt trước.',
  },
  {
    q: 'Số hotline taxi Mai Linh cho sân bay Nội Bài là gì?',
    a: 'Taxi Mai Linh có thể gọi qua 024 38 61 61 61 (Hà Nội). Yêu cầu tổng đài gửi xe đến nhà ga — chỉ định khu đón P1 hoặc P2. Mai Linh sử dụng đồng hồ và được đánh giá là uy tín. Luôn xác nhận đồng hồ sẽ được sử dụng trước khi bắt đầu chuyến đi.',
  },
];

export function LateNightHanPageVI() {
  return (
    <>
      <SEOHelmet path="/vi/di-chuyen-dem-khuya-san-bay-noi-bai" />
      <ArticleLayout languageSwitchPath="/hanoi-airport-late-night-transfer">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Hướng dẫn sân bay Nội Bài
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Đi lại đêm khuya từ sân bay Nội Bài: Grab, Taxi, Đưa đón khách sạn (2026)
            </h1>
            <p className="text-lg opacity-90">
              Đến sân bay từ 22:00 đến 05:00? Xe buýt 86 đã dừng. Đây là những gì thực sự hoạt động —
              và những gì cần tránh.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Direct Answer */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <p className="text-emerald-800 font-semibold text-lg leading-relaxed">
              ✅ Grab là lựa chọn an toàn nhất sau nửa đêm tại sân bay Nội Bài (HAN).
              Giá ban đêm cao hơn 1,5×–2× (300.000đ–450.000đ vào trung tâm Hà Nội),
              nhưng giá được hiển thị trước khi xác nhận. Đặt dịch vụ đưa đón từ khách sạn
              trước để yên tâm hơn.
            </p>
          </section>

          {/* Time Window */}
          <section className="mb-10">
            <div className="bg-white border border-surface-border rounded-xl overflow-hidden">
              <div className="bg-amber-50 px-5 py-3 border-b border-amber-200">
                <p className="text-amber-800 font-semibold text-sm">
                  ⏰ Khung giờ: 22:00 – 05:00 hàng ngày
                </p>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-ink-soft leading-relaxed">
                  Xe buýt 86 ngừng hoạt động lúc <strong className="text-ink">22:15</strong> từ
                  sân bay Nội Bài. Chuyến đầu tiên sáng hôm sau khởi hành khoảng{' '}
                  <strong className="text-ink">06:40</strong>. Điều đó có nghĩa là có 8 tiếng —
                  từ 22:15 đến 06:40 — khi Grab, taxi hoặc đưa đón khách sạn là những lựa chọn
                  thực tế duy nhất.
                </p>
              </div>
            </div>
          </section>

          {/* Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">Các lựa chọn của bạn sau nửa đêm</h2>
            <div className="space-y-4">
              {/* Grab */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    ✅ An toàn nhất
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Grab (Khuyến nghị)</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Hoạt động 24/7. Đặt qua app Grab — giá hiển thị trước khi xác nhận.
                  Không đồng hồ, không mặc cả, không bị tính giá cao.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Giá ban đêm</p>
                    <p className="font-semibold text-ink">300.000đ–450.000đ</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Phụ phí ban đêm</p>
                    <p className="font-semibold text-ink">1,5×–2×</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Thời gian di chuyển</p>
                    <p className="font-semibold text-ink">35–55 phút</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Khu đón</p>
                    <p className="font-semibold text-ink">P1 hoặc P2</p>
                  </div>
                </div>
              </div>

              {/* Mai Linh */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    📞 Truyền thống
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Taxi Mai Linh</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Hãng taxi có đồng hồ uy tín. Gọi trước hoặc tìm tại bãi taxi.
                  <strong className="text-ink"> Luôn yêu cầu bật đồng hồ.</strong>
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Hotline (Hà Nội)</p>
                    <p className="font-semibold text-ink">024 38 61 61 61</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Ước tính giá</p>
                    <p className="font-semibold text-ink">350.000đ–500.000đ</p>
                  </div>
                </div>
              </div>

              {/* Hotel Pickup */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-purple-100 text-purple-700 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    🏨 Tiện nhất
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Đưa đón sân bay từ khách sạn</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Nhiều khách sạn gần sân bay Nội Bài cung cấp xe đưa đón miễn phí hoặc
                  chuyến đi riêng. Phù hợp nhất cho những người có kế hoạch sáng sớm
                  hoặc hành lý nặng.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Chi phí</p>
                    <p className="font-semibold text-ink">Miễn phí – 300.000đ</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Đặt qua</p>
                    <p className="font-semibold text-ink">Khách sạn trực tiếp</p>
                  </div>
                </div>
              </div>

              {/* Sleep at airport */}
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-block bg-gray-100 text-gray-600 text-sm font-bold px-2.5 py-1 rounded mt-0.5 shrink-0">
                    💤 Miễn phí
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-1">Ở lại sân bay</h3>
                <p className="text-ink-soft text-sm mb-3">
                  Sảnh đến T2 Nội Bài có ghế ngồi cơ bản và một số quán cà phê 24h. Cơ bản
                  nhưng miễn phí. Không khuyến khích cho những chuyến đi sớm — mệt mỏi có thể
                  đến nhanh chóng.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Chi phí</p>
                    <p className="font-semibold text-ink">Miễn phí</p>
                  </div>
                  <div className="bg-surface-bg rounded-lg p-3">
                    <p className="text-ink-soft">Phù hợp nhất cho</p>
                    <p className="font-semibold text-ink">Chờ ngắn (&lt;4h)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What to avoid */}
          <section className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-4">Những gì cần tránh vào ban đêm</h2>
            <ul className="space-y-3 text-ink-soft">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Taxi không bật đồng hồ</strong> — tài xế báo giá cố định trước hầu như luôn tính giá cao, đặc biệt vào ban đêm.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Người tiếp cận bạn</strong> bên trong hoặc bên ngoài nhà ga với &ldquo; taxi, taxi &rdquo; — đây là cách lừa đảo phổ biến nhất.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Giao dịch tiền mặt không có biên nhận</strong> — luôn lấy biên nhận hoặc sử dụng thanh toán qua app. Dấu vết kỹ thuật số bảo vệ bạn.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✕</span>
                <span><strong className="text-ink">Đi cùng người lạ</strong> được giới thiệu là taxi chung ở lề đường — không an toàn và thường có giá cao hơn.</span>
              </li>
            </ul>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Hướng dẫn liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/bus-86-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">🚌 Xe buýt 86</p>
                <p className="font-semibold text-ink">Xe buýt 86 sân bay Nội Bài — Lịch trình, Giá 50.000đ</p>
                <p className="text-sm text-ink-soft mt-1">Xe buýt công cộng trực tiếp cho khách đến ban ngày.</p>
              </a>
              <a
                href="/grab-vs-bus-hanoi-airport"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⚖️ So sánh</p>
                <p className="font-semibold text-ink">Grab vs xe buýt 86 sân bay Nội Bài — Phân tích thực tế</p>
                <p className="text-sm text-ink-soft mt-1">So sánh chi phí và thời gian đầy đủ cho mọi giờ.</p>
              </a>
              <a
                href="/airport-scam-vietnam-taxi"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⚠️ An toàn</p>
                <p className="font-semibold text-ink">Xe lừa đảo tại sân bay Việt Nam — Cách phòng tránh</p>
                <p className="text-sm text-ink-soft mt-1">Bảo vệ bản thân khỏi các chiêu lừa đảo phổ biến.</p>
              </a>
              <a
                href="/hanoi-airport-late-night-bus"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">🌙 Xe buýt đêm</p>
                <p className="font-semibold text-ink">8 giờ tối tại sân bay Nội Bài — Xe buýt còn chạy không?</p>
                <p className="text-sm text-ink-soft mt-1">Giờ xe buýt cuối cùng và khung chuyển tiếp.</p>
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">Câu hỏi thường gặp</h2>
            <FAQSection items={FAQ_ITEMS} />
          </section>
        </div>

        {/* FAQ Schema */}
        <FAQSchema items={FAQ_ITEMS} />
      </ArticleLayout>
    </>
  );
}
