import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS_VI = [
  {
    q: 'Xe buýt rẻ nhất từ sân bay Nội Bài về trung tâm là tuyến nào?',
    a: 'Xe buýt rẻ nhất từ sân bay Nội Bài (HAN) về trung tâm Hà Nội là tuyến 17 với giá 7.000đ. Thời gian di chuyển 45–60 phút, khởi hành từ sảnh các nhà ga. Tuyến 90 (9.000đ) là lựa chọn rẻ thứ hai, mất 40–55 phút hướng về khu vực Tây Hồ. <a href="/vi/cach-re-nhat-san-bay-noi-bai" class="text-primary underline">Xem các cách rẻ nhất →</a>',
  },
  {
    q: 'Xe buýt từ sân bay Tân Sơn Nhất về Quận 1 giá bao nhiêu?',
    a: 'Xe buýt rẻ nhất từ sân bay Tân Sơn Nhất (SGN) về Quận 1 là tuyến 152 với giá 5.000đ — rẻ nhất Việt Nam. Tuyến 109 giá 15.000đ và nhanh hơn (30–45 phút) bằng xe buýt điện từ T3. <a href="/vi/tuyen-152-tan-son-nhat" class="text-primary underline">Xem chi tiết tuyến 152 →</a> <a href="/vi/tuyen-109-tan-son-nhat" class="text-primary underline">Xem lịch tuyến 109 →</a>',
  },
  {
    q: 'Xe buýt sân bay Việt Nam có máy lạnh không?',
    a: 'Hầu hết xe buýt sân bay tại Việt Nam đều có máy lạnh. Tuyến 86 (Hà Nội) là dịch vụ cao cấp giá cố định có máy lạnh. Tuyến 109 (Sài Gòn) là xe buýt điện có máy lạnh. Tuyến 17 và 90 (Hà Nội) có thể có máy lạnh hạn chế. Tuyến 152 (Sài Gòn) là xe buýt thường — một số chuyến có máy lạnh, một số không.',
  },
  {
    q: 'Có mang được vali lên xe buýt sân bay không?',
    a: 'Có — tất cả xe buýt sân bay Việt Nam (tuyến 17, 86, 90 ở Hà Nội; tuyến 109, 152 ở Sài Gòn) đều miễn phí cho hành lý xách tay tiêu chuẩn. Vali cồng kềnh có thể bị tính phụ phí nhỏ tùy theo nhà vận hành. <a href="/vi/phi-hanh-ly-xe-buyt-san-bay" class="text-primary underline">Xem chính sách hành lý đầy đủ →</a>',
  },
  {
    q: 'Chuyến xe buýt cuối từ sân bay Nội Bài là mấy giờ?',
    a: 'Chuyến xe buýt 86 cuối từ sân bay Nội Bài khởi hành lúc 22:15 từ sảnh nhà ga. Tuyến 17 và 90 có chuyến cuối sớm hơn — thường khoảng 20:00–21:00 tùy ngày. Sau khi tuyến 86 dừng, Grab là lựa chọn chính (300.000đ–450.000đ với phụ phí ban đêm). <a href="/vi/di-chuyen-dem-khuya-san-bay-noi-bai" class="text-primary underline">Hướng dẫn đi lại ban đêm →</a>',
  },
  {
    q: 'Có xe buýt từ sân bay Đà Nẵng về trung tâm không?',
    a: 'Có, sân bay Đà Nẵng (DAD) có xe buýt công cộng kết nối với trung tâm thành phố, tuy nhiên tần suất ít hơn so với Hà Nội hay Sài Gòn. Thông tin lịch trình hạn chế và có thể thay đổi. Hầu hết du khách đến Đà Nẵng chọn Grab (80.000đ–150.000đ vào trung tâm, 15–25 phút) hoặc dịch vụ đưa đón khách sạn.',
  },
  {
    q: 'Nên chọn xe buýt sân bay hay Grab?',
    a: 'Tùy vào ưu tiên của bạn. Xe buýt giá 5.000đ–50.000đ, mất 30–80 phút. Grab giá 80.000đ–300.000đ, mất 20–50 phút. Xe buýt phù hợp với du khách tiết kiệm, đến ban ngày và điểm đến nằm trên lộ trình xe buýt. Grab phù hợp khi cần nhanh, thoải mái, đến ban đêm hoặc mang nhiều hành lý. <a href="/vi/grab-vs-xe-buyt-noi-bai" class="text-primary underline">So sánh Grab và xe buýt →</a>',
  },
  {
    q: 'Xe buýt sân bay Việt Nam có an toàn cho du khách không?',
    a: 'Có, xe buýt sân bay tại Việt Nam nói chung là an toàn. Đây là phương tiện được vận hành bởi các cơ quan giao thông công cộng thành phố và được người dân địa phương sử dụng rộng rãi. Rủi ro chính là móc túi trên xe đông đúc và những người tự xưng là nhân viên xe buýt gần nhà ga — luôn tìm biển chỉ dẫn trạm xe buýt chính thức. <a href="/vi/xe-lo-gio-sanh-bay-viet-nam" class="text-primary underline">Xem cách tránh lừa đảo taxi và phương tiện →</a>',
  },
];

export function AirportBusPillarPageVI() {
  return (
    <>
      <SEOHelmet path="/vi/xe-buyt-san-bay-ve-trung-tam" />
      <ArticleLayout languageSwitchPath="/bus-from-airport-to-city">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Xe buýt sân bay Việt Nam · HAN · SGN · Đà Nẵng
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Xe buýt sân bay về trung tâm: Hà Nội + Sài Gòn + Đà Nẵng (2026)
            </h1>
            <p className="text-lg opacity-90">
              Hướng dẫn đầy đủ xe buýt sân bay từ cả 3 sân bay lớn của Việt Nam về trung tâm. So sánh lộ trình, giá vé và thời gian di chuyển cho Hà Nội, Sài Gòn và Đà Nẵng.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick comparison table — above the fold */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Tất cả sân bay trong nháy mắt</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-4 py-2 font-semibold text-ink">Sân bay</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Xe buýt rẻ nhất</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Xe buýt nhanh nhất</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Giá trị tốt nhất</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-emerald-50">
                    <td className="px-4 py-2 font-medium text-ink">Hà Nội (Nội Bài) — HAN</td>
                    <td className="px-4 py-2 text-ink">Tuyến 17 · 7.000đ</td>
                    <td className="px-4 py-2 text-ink">Tuyến 86 · 50.000đ · 50–75 phút</td>
                    <td className="px-4 py-2 text-ink">Tuyến 86</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Sài Gòn (Tân Sơn Nhất) — SGN</td>
                    <td className="px-4 py-2 text-ink">Tuyến 152 · 5.000đ</td>
                    <td className="px-4 py-2 text-ink">Tuyến 109 · 15.000đ · 30–45 phút</td>
                    <td className="px-4 py-2 text-ink">Tuyến 109</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Đà Nẵng — DAD</td>
                    <td className="px-4 py-2 text-ink">Xe buýt · ~10.000đ (ước tính)</td>
                    <td className="px-4 py-2 text-ink">Xe buýt · ước tính 20–30 phút</td>
                    <td className="px-4 py-2 text-ink">Nên dùng Grab</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              Thời gian ước tính; cộng thêm 20–45 phút làm thủ tục hộ chiếu và nhận hành lý tại các nhà ga quốc tế.
              <a href="/vi/thoi-gian-ra-cuong-t2-noi-bai" className="text-primary underline ml-2">
                Dùng công cụ tính giờ ra cổng →
              </a>
            </p>
          </section>

          {/* Hub: child article links grid */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-xl font-bold text-ink mb-4">Hướng dẫn chi tiết cho từng tuyến</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/vi/tuyen-86-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Tuyến 86: Sân bay Nội Bài — Lịch trình đầy đủ</p>
                <p className="text-sm text-ink-soft">50.000đ · 50–75 phút · Phố cổ · 05:00–22:15</p>
              </a>
              <a
                href="/vi/tuyen-109-tan-son-nhat"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Tuyến 109: Sân bay Sài Gòn (T3) — Lịch trình</p>
                <p className="text-sm text-ink-soft">15.000đ · 30–45 phút · Xe buýt điện · 05:30–22:00</p>
              </a>
              <a
                href="/vi/tuyen-152-tan-son-nhat"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Tuyến 152: Sân bay Sài Gòn — Giá 5.000đ</p>
                <p className="text-sm text-ink-soft">5.000đ · Rẻ nhất Việt Nam · T1/T2</p>
              </a>
              <a
                href="/vi/grab-vs-xe-buyt-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚗 Grab vs xe buýt 86: So sánh đầy đủ</p>
                <p className="text-sm text-ink-soft">Chi phí, thời gian, tiện nghi và an toàn — dữ liệu thực 2026.</p>
              </a>
              <a
                href="/vi/cach-re-nhat-san-bay-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">💰 Cách rẻ nhất từ sân bay Nội Bài</p>
                <p className="text-sm text-ink-soft">5 lựa chọn xếp theo giá: 7.000đ đến 500.000đ.</p>
              </a>
              <a
                href="/vi/cach-re-nhat-san-bay-sai-gon"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">💰 Cách rẻ nhất từ sân bay Sài Gòn về Quận 1</p>
                <p className="text-sm text-ink-soft">5 lựa chọn xếp theo giá: 5.000đ đến 350.000đ.</p>
              </a>
              <a
                href="/vi/noi-bai-lan-dau-di"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">✈️ Lần đầu đến sân bay Nội Bài</p>
                <p className="text-sm text-ink-soft">Từng bước: kiểm tra hộ chiếu, SIM, ATM và di chuyển ra khỏi nhà ga.</p>
              </a>
              <a
                href="/vi/cach-di-tu-sanh-bay-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🗺️ Cách đi từ sân bay Nội Bài về trung tâm</p>
                <p className="text-sm text-ink-soft">6 lựa chọn so sánh: xe buýt, Grab, taxi và xe đưa đón.</p>
              </a>
              <a
                href="/vi/phi-hanh-ly-xe-buyt-san-bay"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🧳 Phí hành lý xe buýt sân bay Việt Nam</p>
                <p className="text-sm text-ink-soft">Bạn được mang gì lên xe buýt — hành lý xách tay và vali lớn.</p>
              </a>
              <a
                href="/vi/xe-lo-gio-sanh-bay-viet-nam"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚨 Xe lừa đảo tại sân bay Việt Nam</p>
                <p className="text-sm text-ink-soft">Cách tránh lừa đảo và di chuyển an toàn tại cả 3 sân bay.</p>
              </a>
            </div>
          </section>

          {/* Section 2: Hanoi (Noi Bai) */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Hà Nội (Sân bay Nội Bài — HAN)</h2>
            <p className="text-ink-soft mb-4">
              Sân bay Nội Bài có 3 tuyến xe buýt công cộng kết nối với trung tâm Hà Nội. Tất cả xe buýt khởi hành từ sảnh T1 (Nội địa) và T2 (Quốc tế).
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Tuyến 86</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Phổ biến nhất</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Máy lạnh</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>50.000đ</strong> · 50–75 phút · Phố cổ</p>
                <p className="text-sm text-ink-soft">Chạy 20–30 phút/chuyến, 05:00–22:15. Đi thẳng đến Phố cổ và ga Long Biên.</p>
                <a href="/vi/tuyen-86-noi-bai" className="text-primary underline text-sm mt-1 inline-block">Xem lịch tuyến 86 đầy đủ →</a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Tuyến 17</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Rẻ nhất</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>7.000đ</strong> · 45–60 phút</p>
                <p className="text-sm text-ink-soft">Lựa chọn tiết kiệm hướng về khu vực Long Biên. Ít chuyến hơn tuyến 86.</p>
                <a href="/vi/cach-re-nhat-san-bay-noi-bai" className="text-primary underline text-sm mt-1 inline-block">Xem các cách rẻ nhất →</a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Tuyến 90</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Tiết kiệm + Tây Hồ</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>9.000đ</strong> · 40–55 phút</p>
                <p className="text-sm text-ink-soft">Lộ trình hướng về khu vực Tây Hồ. Ít chuyến hơn.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Saigon (Tan Son Nhat) */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Sài Gòn (Sân bay Tân Sơn Nhất — SGN)</h2>
            <p className="text-ink-soft mb-4">
              Sân bay Tân Sơn Nhất có 2 tuyến xe buýt chính. Tuyến 152 phục vụ T1 (Nội địa) và T2 (Quốc tế); tuyến 109 khởi hành từ nhà ga mới T3 (mở 2025).
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Tuyến 152</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Rẻ nhất Việt Nam · 5.000đ</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>5.000đ</strong> · 45–60 phút · T1 và T2</p>
                <p className="text-sm text-ink-soft">Xe buýt sân bay rẻ nhất Việt Nam. Xe buýt thường — có thể đông trong giờ cao điểm.</p>
                <a href="/vi/tuyen-152-tan-son-nhat" className="text-primary underline text-sm mt-1 inline-block">Xem chi tiết tuyến 152 →</a>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-ink">Tuyến 109</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Nhanh nhất · Xe điện · Máy lạnh</span>
                </div>
                <p className="text-sm text-ink-soft"><strong>15.000đ</strong> · 30–45 phút · Chỉ T3</p>
                <p className="text-sm text-ink-soft">Xe buýt điện máy lạnh, lựa chọn mới nhất và thoải mái nhất. Khởi hành từ tầng đến T3.</p>
                <a href="/vi/tuyen-109-tan-son-nhat" className="text-primary underline text-sm mt-1 inline-block">Xem lịch tuyến 109 →</a>
              </div>
            </div>
          </section>

          {/* Section 4: Da Nang */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Sân bay Đà Nẵng (DAD)</h2>
            <p className="text-ink-soft mb-4">
              Sân bay quốc tế Đà Nẵng (DAD) là sân bay lớn thứ 3 Việt Nam. Nhỏ hơn và dễ điều hướng hơn Nội Bài hay Tân Sơn Nhất. Xe buýt công cộng có phạm vi hạn chế hơn.
            </p>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-ink">Xe buýt công cộng</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Tần suất hạn chế</span>
              </div>
              <p className="text-sm text-ink-soft"><strong>~10.000đ</strong> · ước tính 20–30 phút vào trung tâm</p>
              <p className="text-sm text-ink-soft">Sân bay Đà Nẵng có dịch vụ xe buýt cơ bản vào trung tâm thành phố. Lịch trình ít đáng tin hơn và thông tin khó tìm hơn. Hầu hết du khách dùng Grab (80.000đ–150.000đ) hoặc đưa đón khách sạn.</p>
            </div>
          </section>

          {/* Section 5: Bus vs Grab */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Khi nào nên đi xe buýt vs Grab</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-4 py-2 font-semibold text-ink">Yếu tố</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">🚌 Xe buýt sân bay</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">🚗 Grab</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Chi phí</td>
                    <td className="px-4 py-2 text-ink">5.000đ–50.000đ</td>
                    <td className="px-4 py-2 text-ink">80.000đ–300.000đ</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Thời gian di chuyển</td>
                    <td className="px-4 py-2 text-ink">30–80 phút</td>
                    <td className="px-4 py-2 text-ink">20–50 phút</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Giờ hoạt động</td>
                    <td className="px-4 py-2 text-ink">05:00–22:15 (thay đổi)</td>
                    <td className="px-4 py-2 text-ink">24/7</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">Phù hợp nhất cho</td>
                    <td className="px-4 py-2 text-ink">Tiết kiệm, ban ngày, linh hoạt</td>
                    <td className="px-4 py-2 text-ink">Nhanh, thoải mái, ban đêm, nhiều hành lý</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a href="/vi/grab-vs-xe-buyt-noi-bai" className="text-primary underline text-sm mt-3 inline-block">
              So sánh Grab và xe buýt đầy đủ →
            </a>
          </section>

          {/* Section 6: Practical tips */}
          <section>
            <h2 className="text-xl font-bold text-ink mb-4">Mẹo thực tế khi đi xe buýt sân bay</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">💴 Mang đúng tiền</h3>
                <p className="text-sm text-ink-soft">Chỉ trả tiền mặt. Tài xế có thể không có tiền trả lại. Tiền xu và tiền giấy mệnh nhỏ là tốt nhất.</p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">🚌 Tìm trạm chính thức</h3>
                <p className="text-sm text-ink-soft">Trạm xe buýt chính thức có biển chỉ dẫn màu xanh. Bỏ qua những "nhân viên xe buýt" không được yêu cầu gần lối ra nhà ga.</p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">⏰ Giờ cao điểm</h3>
                <p className="text-sm text-ink-soft">Tuyến 86 và các tuyến khác chạy dài hơn 20–45 phút trong giờ cao điểm (07:00–09:00 và 17:00–19:00). Lên kế hoạch phù hợp.</p>
              </div>
              <div className="bg-white border border-surface-border rounded-xl p-4">
                <h3 className="font-semibold text-ink mb-2">🧳 Hành lý</h3>
                <p className="text-sm text-ink-soft">Hành lý xách tay tiêu chuẩn miễn phí. Vali lớn có thể bị tính phí. <a href="/vi/phi-hanh-ly-xe-buyt-san-bay" className="text-primary underline">Xem chính sách hành lý →</a></p>
              </div>
            </div>
          </section>

          {/* Calculator CTA */}
          <section className="bg-white border-2 border-primary rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-ink mb-2">Tính giờ ra cổng chính xác từ sân bay</h2>
            <p className="text-ink-soft mb-4">
              Biết khi nào rời nhà ga để không bao giờ bỏ lỡ xe buýt. Nhập giờ chuyến bay, nhà ga và hành lý của bạn.
            </p>
            <a
              href="/"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Mở SanBayGo — Công cụ tính giờ ra cổng
            </a>
          </section>

          {/* Author note */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-2">Về hướng dẫn này</h2>
            <p className="text-ink-soft text-sm">
              Trang tổng hợp này được biên soạn từ lịch trình xe buýt chính thức, dữ liệu du khách thực tế và điều kiện thực địa tại sân bay Nội Bài (HAN), sân bay Tân Sơn Nhất (SGN) và sân bay Đà Nẵng (DAD). Giá vé xe buýt do Sở Giao thông Vận tải Hà Nội và TP.HCM quy định, không thay đổi theo giao thông. Giá Grab là ước tính — luôn xác nhận giá trong ứng dụng trước khi đặt. Cập nhật lần cuối: 2026.
            </p>
          </section>

          <FAQSection items={FAQ_ITEMS_VI} />
        </div>

        <FAQSchema items={FAQ_ITEMS_VI} />
      </ArticleLayout>
    </>
  );
}
