import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'Grab từ sân bay Nội Bài về Hoàn Kiếm giá bao nhiêu?',
    a: 'Grab từ sân bay Nội Bài (HAN) về quận Hoàn Kiếm có giá 180.000đ–250.000đ cho xe 4 chỗ và 280.000đ–350.000đ cho xe 7 chỗ. Đây là một trong những tuyến phổ biến nhất vì khách sạn và điểm tham quan trung tâm Hà Nội tập trung quanh Hồ Hoàn Kiếm.',
  },
  {
    q: 'Grab có nhận chở vali lớn không?',
    a: 'Grab nhận chở vali lớn tùy theo loại xe. GrabCar 4 chỗ phù hợp cho 1–2 vali lớn, GrabCar 7 chỗ (GrabCar 7) phù hợp cho nhóm 3–4 người với 3–4 vali lớn. Luôn chọn GrabCar 7 khi đi cùng hành lý cồng kềnh và ghi chú số lượng vali trong ứng dụng trước khi đặt.',
  },
  {
    q: 'Gọi Grab ở đâu sau khi ra khỏi nhà ga Nội Bài?',
    a: 'Điểm đón Grab tại sân bay Nội Bài nằm ở bãi đỗ P1 (tầng 1 nhà ga đến). Sau khi làm thủ tục hải quan và nhận hành lý, đi theo biển chỉ dẫn ra bãi đỗ — Grab chờ ở khu vực được sơn vạch kẻ rõ ràng. Mở Grab app và cập nhật vị trí điểm đón ngay trước khi ra để tài xế dễ tìm.',
  },
  {
    q: 'Grab có hoạt động 24/7 không?',
    a: 'Có — Grab hoạt động 24/7 tại khu vực sân bay Nội Bài. Tuy nhiên, vào các khung giờ cao điểm (17:00–20:00) sẽ có phí surge 1,3×–1,5× và ban đêm (22:00–05:00) phí surge 1,5×–2×. Giá chính xác luôn hiển thị trên app trước khi xác nhận đặt.',
  },
  {
    q: 'Khung giá Grab từ Nội Bài về các quận trung tâm?',
    a: 'Giá Grab từ Nội Bài về các quận trung tâm dao động: Tây Hồ gần nhất (130.000đ–200.000đ), Cầu Giấy (150.000đ–220.000đ), Ba Đình (170.000đ–240.000đ), Hoàn Kiếm và Đống Đa (180.000đ–250.000đ), Hai Bà Trưng xa hơn (200.000đ–280.000đ), và Long Biên xa nhất (220.000đ–300.000đ).',
  },
  {
    q: 'Có mất phí khi đặt Grab từ sân bay không?',
    a: 'Không có phí đặt riêng khi gọi Grab từ sân bay Nội Bài. Giá hiển thị trên app đã bao gồm phí sân bay (nếu có) và phí quãng đường. Tuy nhiên, phí surge có thể áp dụng vào giờ cao điểm hoặc thời tiết xấu. Giá được cố định tại thời điểm đặt — không tăng thêm sau chuyến đi.',
  },
];

const PRICING_TABLE = [
  { quan: 'Hoàn Kiếm (Phố cổ)', grab4: '180.000–250.000đ', grab7: '280.000–350.000đ', note: 'Điểm đến phổ biến nhất' },
  { quan: 'Ba Đình', grab4: '170.000–240.000đ', grab7: '270.000–340.000đ', note: '' },
  { quan: 'Cầu Giấy', grab4: '150.000–220.000đ', grab7: '250.000–320.000đ', note: '' },
  { quan: 'Đống Đa', grab4: '180.000–250.000đ', grab7: '280.000–350.000đ', note: '' },
  { quan: 'Hai Bà Trưng', grab4: '200.000–280.000đ', grab7: '300.000–380.000đ', note: '' },
  { quan: 'Tây Hồ', grab4: '130.000–200.000đ', grab7: '230.000–300.000đ', note: 'Gần sân bay nhất' },
  { quan: 'Long Biên', grab4: '220.000–300.000đ', grab7: '320.000–400.000đ', note: '' },
];

export function GrabNoiBaiGiaPageVI() {
  return (
    <>
      <SEOHelmet path="/vi/grab-noi-bai-gia-bao-nhieu" />
      <ArticleLayout languageSwitchPath="/grab-vs-bus-hanoi-airport">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Hướng dẫn sân bay Nội Bài
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Grab Nội Bài giá bao nhiêu 2026? Cập nhật theo quận
            </h1>
            <p className="text-lg opacity-90">
              Bảng giá Grab từ sân bay Nội Bài (HAN) về các quận trung tâm Hà Nội — cập nhật 2026, không surge, không bất ngờ.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Direct Answer */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <p className="text-emerald-800 font-semibold text-lg leading-relaxed">
              💰 Giá Grab từ sân bay Nội Bài về trung tâm Hà Nội:{' '}
              <strong className="text-2xl">130.000đ–300.000đ</strong> cho xe 4 chỗ và{' '}
              <strong className="text-2xl">230.000đ–400.000đ</strong> cho xe 7 chỗ.
              Giá hiển thị trước khi đặt — không phí ẩn.
            </p>
          </section>

          {/* Pricing Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Bảng giá Grab từ Nội Bài theo quận</h2>
            <div className="bg-white border border-surface-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-bg border-b border-surface-border">
                      <th className="text-left px-4 py-3 font-semibold text-ink">Quận đến</th>
                      <th className="text-center px-4 py-3 font-semibold text-ink">Grab 4 chỗ</th>
                      <th className="text-center px-4 py-3 font-semibold text-ink">GrabCar 7 chỗ</th>
                      <th className="text-left px-4 py-3 font-semibold text-ink hidden sm:table-cell">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {PRICING_TABLE.map((row) => (
                      <tr key={row.quan} className="hover:bg-surface-bg/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-ink">{row.quan}</td>
                        <td className="px-4 py-3 text-center text-emerald-700 font-semibold">{row.grab4}</td>
                        <td className="px-4 py-3 text-center text-amber-700 font-semibold">{row.grab7}</td>
                        <td className="px-4 py-3 text-ink-soft hidden sm:table-cell text-xs">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-surface-bg px-4 py-2 border-t border-surface-border">
                <p className="text-xs text-ink-soft">
                  * Giá ước tính cho xe 4–7 chỗ, không bao gồm surge. Giá chính xác hiển thị trên app trước khi xác nhận đặt.
                </p>
              </div>
            </div>
          </section>

          {/* Surcharge Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Khi nào Grab từ Nội Bài đắt hơn?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🌧️</span>
                  <h3 className="font-semibold text-ink">Giờ cao điểm</h3>
                </div>
                <p className="text-ink-soft text-sm mb-2">
                  17:00–20:00 các ngày làm việc, surge pricing <strong className="text-ink">1,3×–1,5×</strong>.
                </p>
                <p className="text-ink-soft text-sm">
                  Lái xe đông, thời gian chờ tăng. Nếu không vội, chờ 15–20 phút sau 20:00 để giá bình thường.
                </p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🌙</span>
                  <h3 className="font-semibold text-ink">Ban đêm</h3>
                </div>
                <p className="text-ink-soft text-sm mb-2">
                  22:00–05:00, surge pricing <strong className="text-ink">1,5×–2×</strong>.
                </p>
                <p className="text-ink-soft text-sm">
                  Xe buýt 86 đã dừng. Grab là lựa chọn thực tế duy nhất. Giá cao hơn nhưng an toàn và tiện lợi.
                </p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎊</span>
                  <h3 className="font-semibold text-ink">Tết Nguyên Đán</h3>
                </div>
                <p className="text-ink-soft text-sm mb-2">
                  Surge pricing lên đến <strong className="text-ink">3×</strong> trong dịp Tết.
                </p>
                <p className="text-ink-soft text-sm">
                  Nên đặt trước qua GrabCar hoặc đặt đưa đón từ khách sạn. Khó kiếm xe vào ngày 28–30 Tết.
                </p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⛈️</span>
                  <h3 className="font-semibold text-ink">Mưa to / Nắng nóng</h3>
                </div>
                <p className="text-ink-soft text-sm mb-2">
                  Surge pricing có thể kích hoạt khi trời mưa to hoặc nắng nóng đặc biệt.
                </p>
                <p className="text-ink-soft text-sm">
                  Giá cố định trước khi đặt — không có bất ngờ. So sánh Grab với taxi đồng hồ nếu surge cao.
                </p>
              </div>
            </div>
          </section>

          {/* Grab vs Bus CTA */}
          <section className="bg-surface-bg border border-surface-border rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-2">So sánh Grab với xe buýt 86</h2>
            <p className="text-ink-soft mb-4 leading-relaxed">
              Xe buýt 86 là lựa chọn tiết kiệm nhất — chỉ <strong className="text-ink">50.000đ/chuyến</strong>.
              Grab nhanh hơn 15–30 phút nhưng đắt hơn 4–6 lần. Nếu bạn đáp chuyến trước 22:15 và ngân sách là ưu tiên, xe buýt 86 là lựa chọn tốt.
            </p>
            <a
              href="/vi/grab-vs-xe-buyt-noi-bai"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              So sánh Grab vs xe buýt 86 →
            </a>
          </section>

          {/* Grab Luggage Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Mẹo đặt Grab từ Nội Bài</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-2 py-1 rounded mt-0.5 shrink-0">1</span>
                <div>
                  <p className="font-semibold text-ink">Cập nhật điểm đón chính xác</p>
                  <p className="text-ink-soft text-sm">Chọn điểm đón P1 — khu vực được sơn vạch dành riêng cho Grab. Ghi chú số cổng trong app để tài xế tìm dễ hơn.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-2 py-1 rounded mt-0.5 shrink-0">2</span>
                <div>
                  <p className="font-semibold text-ink">Chọn đúng loại xe cho hành lý</p>
                  <p className="text-ink-soft text-sm">2 vali lớn trở lên → chọn GrabCar 7. 1 vali nhỏ → GrabCar 4 đủ. Đọc mô tả xe trong app trước khi đặt.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-2 py-1 rounded mt-0.5 shrink-0">3</span>
                <div>
                  <p className="font-semibold text-ink">Đặt trước 5–10 phút khi đêm muộn</p>
                  <p className="text-ink-soft text-sm">Vào ban đêm hoặc giờ cao điểm, có thể mất thời gian chờ hơn. Mở app và đặt ngay khi bắt đầu làm thủ tục hải quan.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-2 py-1 rounded mt-0.5 shrink-0">4</span>
                <div>
                  <p className="font-semibold text-ink">Xác nhận biển số và ảnh tài xế</p>
                  <p className="text-ink-soft text-sm">Luôn kiểm tra biển số và khuôn mặt tài xế trước khi lên xe. Không lên xe nếu thông tin không khớp — hủy chuyến qua app và đặt lại.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Hướng dẫn liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/vi/tuyen-86-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">🚌 Xe buýt 86</p>
                <p className="font-semibold text-ink">Tuyến xe buýt 86 sân bay Nội Bài — Giá 50.000đ</p>
                <p className="text-sm text-ink-soft mt-1">Lựa chọn tiết kiệm nhất vào ban ngày.</p>
              </a>
              <a
                href="/vi/grab-vs-xe-buyt-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⚖️ So sánh</p>
                <p className="font-semibold text-ink">Grab vs xe buýt 86 Nội Bài — Nên chọn gì?</p>
                <p className="text-sm text-ink-soft mt-1">So sánh chi phí, thời gian và tiện nghi đầy đủ.</p>
              </a>
              <a
                href="/vi/di-chuyen-dem-khuya-san-bay-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">🌙 Đi đêm khuya</p>
                <p className="font-semibold text-ink">Di chuyển đêm khuya từ sân bay Nội Bài</p>
                <p className="text-sm text-ink-soft mt-1">Grab ban đêm, taxi, đưa đón khách sạn.</p>
              </a>
              <a
                href="/vi/xe-lo-gio-sanh-bay-viet-nam"
                className="block bg-white border border-surface-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <p className="text-sm text-primary font-medium mb-1">⚠️ An toàn</p>
                <p className="font-semibold text-ink">Xe lừa đảo tại sân bay Việt Nam</p>
                <p className="text-sm text-ink-soft mt-1">Cách nhận biết và phòng tránh lừa đảo.</p>
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
