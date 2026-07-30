import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'Hành lý có tính phí trên xe buýt sân bay không?',
    a: 'Không. Tất cả xe buýt sân bay Việt Nam — Tuyến 86, Tuyến 109 và Tuyến 152 — đều miễn phí cho hành lý xách tay tiêu chuẩn. Bạn chỉ trả giá vé (5.000đ–50.000đ tùy tuyến). Không phụ phí cho vali thường hoặc ba lô vừa vặn lối đi.',
  },
  {
    q: 'Tôi có thể mang bao nhiêu hành lý lên xe buýt 86?',
    a: 'Xe buýt 86 cho phép mang theo một kiện hành lý xách tay tiêu chuẩn miễn phí. Các loại vali cỡ lớn — thường trên 70 cm mỗi chiều — có thể bị tính phụ phí nhỏ theo quyết định của tài xế. Nếu bạn có nhiều vali lớn, Grab hoặc taxi sẽ thực tế hơn.',
  },
  {
    q: 'Xe buýt 109 có tính phí hành lý cồng kềnh không?',
    a: 'Xe buýt 109 là xe buýt điện từ nhà ga T3 sân bay Tân Sơn Nhất. Hành lý xách tay tiêu chuẩn được miễn phí. Các vật dụng cồng kềnh (xe đạp, ván lướt sóng, thùng lớn) có thể bị từ chối hoặc tính phí tùy theo không gian trống. Tài xế có quyết định cuối cùng cho các vật dụng cồng kềnh.',
  },
  {
    q: 'Tôi có thể mang ván lướt sóng lên xe buýt 152 không?',
    a: 'Xe buýt 152 là xe buýt công cộng thành phố với không gian hạn chế cho các vật dụng cồng kềnh. Tài xế có thể cho phép các vật dụng nhỏ gấp được, nhưng ván lướt sóng hoặc thiết bị thể thao lớn sẽ bị từ chối. Dùng Grab hoặc taxi cho thiết bị thể thao. Xe buýt 152 không có khoang hành lý chính thức — bạn tự mang tất cả lên xe.',
  },
  {
    q: 'Nếu hành lý quá lớn cho xe buýt thì sao?',
    a: 'Nếu hành lý vượt quá sức chứa của xe buýt, tài xế có thể từ chối cho lên xe. Các xe buýt sân bay Việt Nam không được thiết kế cho hàng hóa lớn. Các lựa chọn của bạn: (1) Đón Grab (100.000đ–350.000đ tùy điểm đến), (2) Đặt taxi trước qua khách sạn, hoặc (3) Sử dụng dịch vụ giữ hành lý gần sân bay trước khi lên xe buýt.',
  },
  {
    q: 'Xe đẩy trẻ em có phải trả phí trên xe buýt sân bay không?',
    a: 'Xe đẩy trẻ em gấp gọn được miễn phí trên cả ba tuyến xe buýt sân bay. Hãy gấp xe đẩy trước khi lên xe, mang lên và đặt ở lối đi hoặc khu vực được chỉ định. Xe đẩy không gấp được có thể bị coi là hành lý cồng kềnh — tài xế thường cho phép nếu còn chỗ, nhưng không có chỗ đảm bảo.',
  },
  {
    q: 'Xe buýt sân bay Việt Nam có giới hạn cân nặng không?',
    a: 'Không có giới hạn cân nặng chính thức được công bố cho xe buýt sân bay Việt Nam. Tuy nhiên, có giới hạn thực tế: bạn phải tự mang hành lý lên xuống. Đối với hành lý ký gửi (vali lớn trên 20 kg), nên dùng Grab hoặc taxi. Xe buýt sân bay không có khoang hành lý.',
  },
  {
    q: 'Tôi có thể gửi hành lý ở đâu tại sân bay Nội Bài nếu xe buýt không chở được?',
    a: 'Sân bay Nội Bài (HAN) có dịch vụ gửi hành lý tại sảnh đến — tìm quầy dịch vụ gần Cổng A1. Phí gửi khoảng 50.000đ–100.000đ/món/ngày tùy kích thước. Tại sân bay Tân Sơn Nhất (SGN), tủ khóa hành lý có tại T1 và T3. Dùng tủ khóa cho phép bạn đón xe buýt chỉ với túi ngày rồi lấy hành lý sau.',
  },
];

export function LuggageFeePageVI() {
  return (
    <>
      <SEOHelmet path="/vi/phi-hanh-ly-xe-buyt-san-bay" />
      <ArticleLayout languageSwitchPath="/airport-bus-luggage-fee-vietnam">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Xe buýt sân bay Việt Nam
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Phí hành lý xe buýt sân bay Việt Nam: Tuyến 86 / 109 / 152 (2026)
            </h1>
            <p className="text-lg opacity-90">
              Hành lý xách tay miễn phí trên cả ba tuyến. Vali cồng kềnh có thể bị tính phụ phí nhỏ.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick answer */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Trả lời nhanh</h2>
            <p className="text-ink">
              Tất cả xe buýt sân bay Việt Nam (Tuyến 86, Tuyến 109, Tuyến 152) đều{' '}
              <strong>miễn phí cho hành lý xách tay tiêu chuẩn</strong>. Các loại vali cồng kềnh (vali
              lớn, thiết bị thể thao) có thể bị tính phụ phí nhỏ theo quyết định của tài xế hoặc bị
              từ chối nếu không gian hạn chế. Không cần đặt trước hay thanh toán trước cho hành lý.
            </p>
          </section>

          {/* Per-bus breakdown */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6">Chi tiết theo từng tuyến</h2>
            <div className="space-y-6">
              {/* Bus 86 */}
              <div className="bg-white border border-surface-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
                    HAN — Hà Nội
                  </span>
                  <h3 className="text-lg font-bold text-ink">Tuyến 86: Sân bay Nội Bài</h3>
                </div>
                <p className="text-ink-soft mb-3">
                  <strong>Hành lý tiêu chuẩn:</strong> Miễn phí. Mỗi hành khách được mang một kiện hành lý xách tay.
                </p>
                <p className="text-ink-soft mb-3">
                  <strong>Vali cỡ lớn:</strong> Có thể bị tính phụ phí nhỏ cho các vật dụng rất lớn. Theo quyết định của tài xế.
                </p>
                <p className="text-ink-soft">
                  <strong>Điểm đón:</strong> T1 Cổng A1 (Cột 12) và T2 Cổng A1 (Cột 14), Tầng 1 sảnh đến.
                </p>
              </div>

              {/* Bus 109 */}
              <div className="bg-white border border-surface-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    SGN — Sài Gòn
                  </span>
                  <h3 className="text-lg font-bold text-ink">Tuyến 109: Sân bay Tân Sơn Nhất (Ga T3)</h3>
                </div>
                <p className="text-ink-soft mb-3">
                  <strong>Hành lý tiêu chuẩn:</strong> Miễn phí. Xe buýt điện có lối đi rộng cho hành lý xách tay.
                </p>
                <p className="text-ink-soft mb-3">
                  <strong>Vật dụng cồng kềnh:</strong> Có thể bị từ chối nếu xe đông. Không có khoang hành lý chính thức. Xe đạp và ván lướt sóng không được phép.
                </p>
                <p className="text-ink-soft">
                  <strong>Điểm đón:</strong> Tầng đến Ga T3, cổng A17–A20 bên ngoài.
                </p>
              </div>

              {/* Bus 152 */}
              <div className="bg-white border border-surface-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    SGN — Sài Gòn
                  </span>
                  <h3 className="text-lg font-bold text-ink">Tuyến 152: Sân bay Tân Sơn Nhất (Ga T1/T2)</h3>
                </div>
                <p className="text-ink-soft mb-3">
                  <strong>Hành lý tiêu chuẩn:</strong> Miễn phí. Tự mang vali lên xe.
                </p>
                <p className="text-ink-soft mb-3">
                  <strong>Vật dụng cồng kềnh:</strong> Không gian rất hạn chế. Tài xế có thể từ chối các vật dụng lớn, đặc biệt vào giờ cao điểm. Không có khoang hành lý chính thức.
                </p>
                <p className="text-ink-soft">
                  <strong>Điểm đón:</strong> Sảnh đến T1 và T2 bên ngoài.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison table */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Bảng so sánh hạn mức hành lý</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-surface-border">
                    <th className="text-left py-3 px-4 font-semibold text-ink">Tuyến xe</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink">Sân bay / Nhà ga</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink">Hành lý xách tay</th>
                    <th className="text-left py-3 px-4 font-semibold text-ink">Phí hành lý cồng kềnh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-4 text-ink font-medium">Tuyến 86</td>
                    <td className="py-3 px-4 text-ink">HAN — T1 &amp; T2</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Miễn phí</td>
                    <td className="py-3 px-4 text-ink-soft">Theo quyết định tài xế</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-4 text-ink font-medium">Tuyến 109</td>
                    <td className="py-3 px-4 text-ink">SGN — Chỉ T3</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Miễn phí</td>
                    <td className="py-3 px-4 text-ink-soft">Có thể bị từ chối</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-ink font-medium">Tuyến 152</td>
                    <td className="py-3 px-4 text-ink">SGN — T1 &amp; T2</td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">Miễn phí</td>
                    <td className="py-3 px-4 text-ink-soft">Không gian rất hạn chế</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-soft mt-3">
              <strong>Lưu ý:</strong> Tất cả giá vé được nhà nước quy định cố định. Không phụ phí cho hành lý xách tay tiêu chuẩn trên cả ba tuyến này.
            </p>
          </section>

          {/* Tips */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Mẹo cho khách có hành lý lớn</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Dùng Grab</strong> nếu bạn có 2+ vali lớn. Grab có giá 100.000đ–350.000đ nhưng có cốp xe phù hợp. Công cụ tính của Frylane so sánh xe buýt vs Grab để bạn quyết định trước khi hạ cánh.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Đặt dịch vụ gửi hành lý tại sân bay</strong> ở Nội Bài (50.000đ–100.000đ/ngày) hoặc Tân Sơn Nhất (tủ khóa có sẵn) nếu bạn muốn đón xe buýt và mua sắm trước khi lấy hành lý.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Tuyến 86 thân thiện nhất với hành lý</strong> trong ba tuyến — xe lớn hơn và có nhiều không gian lối đi hơn. Tuyến 152 đông đúc và có ít chỗ nhất cho hành lý.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">→</span>
                <p className="text-ink">
                  <strong>Giờ cao điểm (7–9 sáng, 5–7 tối)</strong> nghĩa là xe buýt đông hơn và không gian hành lý chật hẹp hơn. Nếu có thể, hãy sắp xếp giờ hạ cánh ngoài giờ cao điểm.
                </p>
              </li>
            </ul>
          </section>

          {/* Related articles */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-lg font-semibold text-ink mb-3">Bài viết liên quan</h2>
            <ul className="space-y-2">
              <li>
                <a href="/vi/tuyen-86-noi-bai" className="text-primary underline hover:text-primary/80">
                  Tuyến xe buýt 86 sân bay Nội Bài — Lịch trình, Giá vé 2026
                </a>
              </li>
              <li>
                <a href="/vi/tuyen-109-tan-son-nhat" className="text-primary underline hover:text-primary/80">
                  Tuyến xe buýt 109 sân bay Tân Sơn Nhất — Giá 20.000đ
                </a>
              </li>
              <li>
                <a href="/vi/tuyen-152-tan-son-nhat" className="text-primary underline hover:text-primary/80">
                  Tuyến xe buýt 152 sân bay Tân Sơn Nhất — Giá 5.000đ
                </a>
              </li>
              <li>
                <a href="/vi/xe-lo-gio-sanh-bay-viet-nam" className="text-primary underline hover:text-primary/80">
                  Xe lừa đảo tại sân bay Việt Nam — Cách phòng tránh
                </a>
              </li>
            </ul>
          </section>

          <FAQSection items={FAQ_ITEMS} />
        </div>

        <FAQSchema items={FAQ_ITEMS} />
      </ArticleLayout>
    </>
  );
}
