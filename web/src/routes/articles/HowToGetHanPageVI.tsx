import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS_VI = [
  {
    q: 'Xe buýt từ sân bay Nội Bài về trung tâm giá bao nhiêu?',
    a: 'Có ba tuyến xe buýt từ sân bay Nội Bài về trung tâm Hà Nội. Xe buýt 17 giá 7.000đ (rẻ nhất, 45–60 phút), xe buýt 90 giá 9.000đ (40–55 phút, hướng Tây Hồ), và xe buýt 86 giá 50.000đ (50–75 phút, thẳng về phố cổ). Tất cả đều đón khách ngay bên ngoài nhà ga T1 và T2. <a href="/vi/tuyen-86-noi-bai" className="text-primary underline">Xem lịch trình xe buýt 86 đầy đủ →</a>',
  },
  {
    q: 'Cách nhanh nhất từ sân bay Nội Bài về trung tâm Hà Nội là gì?',
    a: 'Grab là cách nhanh nhất, 35–50 phút, giá 200.000–300.000đ. Taxi truyền thống mất 35–45 phút với giá 300.000–500.000đ. Xe đưa đón riêng nhanh nhất (30–40 phút, 400.000–800.000đ). Trong các tuyến xe buýt, xe buýt 90 nhanh nhất với 40–55 phút cho giá 9.000đ.',
  },
  {
    q: 'Có xe buýt chạy thẳng từ sân bay Nội Bài không?',
    a: 'Có. Xe buýt 86 là xe buýt thẳng phổ biến nhất từ sân bay Nội Bài về phố cổ. Chạy mỗi 20–30 phút từ 05:00 đến 22:15, giá 50.000đ. Xe buýt 17 (7.000đ) và xe buýt 90 (9.000đ) cũng khởi hành từ bên ngoài nhà ga nhưng chạy tuyến khác. <a href="/vi/tuyen-86-noi-bai" className="text-primary underline">Lịch trình xe buýt 86 đầy đủ →</a>',
  },
  {
    q: 'Từ sân bay Nội Bài về phố cổ mất bao lâu?',
    a: 'Bằng Grab: 30–45 phút (200.000–300.000đ). Bằng xe buýt 86: 50–75 phút (50.000đ) — 50 phút giờ thấp điểm, đến 75 phút giờ cao điểm. Bằng taxi: 35–45 phút (300.000–500.000đ). Cộng thêm 20–45 phút làm thủ tục nhập cảnh và nhận hành lý trước khi ra khỏi nhà ga. <a href="/vi/thoi-gian-ra-cuong-t2-noi-bai" className="text-primary underline">Dùng công cụ tính thời gian ra cổng →</a>',
  },
  {
    q: 'Nên đi Grab hay taxi từ sân bay Nội Bài?',
    a: 'Luôn chọn Grab thay vì taxi truyền thống tại sân bay Nội Bài. Grab (200.000–300.000đ) an toàn hơn, rẻ hơn và có thể theo dõi — giá hiển thị trước, không có đồng hồ bị gian lận. Taxi truyền thống (300.000–500.000đ) có nguy cơ bị lừa đảo thực sự đối với du khách lần đầu. <a href="/vi/grab-vs-xe-buyt-noi-bai" className="text-primary underline">So sánh Grab vs xe buýt 86 đầy đủ →</a>',
  },
  {
    q: 'Có tàu hỏa từ sân bay Nội Bài không?',
    a: 'Không. Không có nhà ga xe lửa tại hoặc kết nối trực tiếp với sân bay Nội Bài. Nhà ga xe lửa gần nhất là Ga Hà Nội trên phố Lê Đại Hành, có thể đến bằng xe buýt 86, Grab hoặc taxi. Nếu cần kết nối với tàu hỏa từ sân bay, đi xe buýt 86 hoặc Grab vào phố cổ rồi chuyển tiếp.',
  },
  {
    q: 'Nên đến sân bay lúc nào để kịp xe buýt?',
    a: 'Xe buýt 86 chạy từ 05:00 đến 22:15 hàng ngày. Nếu hạ cánh trước 21:30, bạn có thể yên tâm đón xe buýt 86. Nếu hạ cánh từ 21:30 đến 22:15, hãy đi nhanh — chuyến cuối khởi hành lúc 22:15 và không chờ. Đối với chuyến bay đến sau 22:15, Grab là lựa chọn duy nhất (300.000–450.000đ với phụ phí ban đêm). <a href="/vi/di-chuyen-dem-khuya-san-bay-noi-bai" className="text-primary underline">Hướng dẫn đi lại đêm khuya →</a>',
  },
];

const TRANSPORT_OPTIONS_VI = [
  {
    name: 'Xe buýt 17',
    price: '7.000đ',
    time: '45–60 phút',
    highlight: 'Siêu tiết kiệm',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
    icon: '🚌',
    description: 'Xe buýt sân bay rẻ nhất Hà Nội. Chạy từ Nội Bài đến khu vực Long Biên. Tần suất ít hơn xe buýt 86.',
    bestFor: 'Hành khách siêu tiết kiệm, điểm đến nằm trên tuyến xe buýt 17',
    link: '/vi/cach-re-nhat-san-bay-noi-bai',
  },
  {
    name: 'Xe buýt 90',
    price: '9.000đ',
    time: '40–55 phút',
    highlight: 'Tiết kiệm + Tây Hồ',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
    icon: '🚌',
    description: 'Lựa chọn rẻ thứ hai. Tuyến đi hướng khu vực Tây Hồ. Tần suất ít hơn xe buýt 86.',
    bestFor: 'Hành khách đi khu vực Tây Hồ, hoặc tiết kiệm và biết kiểm tra lịch trình',
    link: '/vi/cach-re-nhat-san-bay-noi-bai',
  },
  {
    name: 'Xe buýt 86',
    price: '50.000đ',
    time: '50–75 phút',
    highlight: 'Giá trị tốt nhất',
    color: 'bg-emerald-50 border-emerald-200',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    icon: '🚌',
    description: 'Xe buýt sân bay phổ biến nhất. Thẳng về phố cổ, mỗi 20–30 phút, 05:00–22:15. Giá cố định, có điều hòa.',
    bestFor: 'Hầu hết hành khách — cân bằng tốt nhất giữa chi phí, độ tin cậy và lộ trình',
    link: '/vi/tuyen-86-noi-bai',
  },
  {
    name: 'Grab',
    price: '200.000–300.000đ',
    time: '35–50 phút',
    highlight: 'Nhanh + an toàn',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800',
    icon: '🚗',
    description: 'Đặt xe qua ứng dụng. Giá cố định hiển thị trước, theo dõi GPS, không gian lận đồng hồ. Hoạt động 24/7.',
    bestFor: 'Ưu tiên tốc độ, đến sau 22:15, hoặc hành khách có hành lý lớn',
    link: '/vi/grab-vs-xe-buyt-noi-bai',
  },
  {
    name: 'Taxi',
    price: '300.000–500.000đ',
    time: '35–45 phút',
    highlight: 'Nhóm + hành lý',
    color: 'bg-amber-50 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-800',
    icon: '🚕',
    description: 'Taxi công tơ mét truyền thống. Dùng Mai Linh (024 38 61 61 61) hoặc Vinasun. Tránh tài xế vẫy trong nhà ga.',
    bestFor: 'Nhóm 4+ có nhiều hành lý, không thích dùng ứng dụng',
    link: '/vi/xe-lo-gio-sanh-bay-viet-nam',
  },
  {
    name: 'Xe đưa đón riêng',
    price: '400.000–800.000đ',
    time: '30–40 phút',
    highlight: 'Đặt trước + VIP',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-800',
    icon: '🚙',
    description: 'Đặt trước qua khách sạn hoặc dịch vụ như Klook. Tài xế đón tại cửa arrivals với biển tên. Không mặc cả, không chờ.',
    bestFor: 'Hành khách muốn không rắc rối, dịch vụ VIP, hoặc nhóm có nhiều hành lý',
    link: '/vi/cach-re-nhat-san-bay-noi-bai',
  },
];

export function HowToGetHanPageVI() {
  return (
    <>
      <SEOHelmet path="/vi/cach-di-tu-sanh-bay-noi-bai" />
      <ArticleLayout languageSwitchPath="/how-to-get-from-hanoi-airport-to-city">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Sân bay Nội Bài · Hà Nội · HAN
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Cách đi từ Sân bay Nội Bài về Trung tâm (2026)
            </h1>
            <p className="text-lg opacity-90">
              So sánh 6 phương tiện: xe buýt, Grab, taxi, xe đưa đón. Chi phí từ 7.000đ đến 800.000đ.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick options table — above the fold */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Tất cả các lựa chọn</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left px-4 py-2 font-semibold text-ink">Phương tiện</th>
                    <th className="text-right px-4 py-2 font-semibold text-ink">Chi phí</th>
                    <th className="text-right px-4 py-2 font-semibold text-ink">Thời gian</th>
                    <th className="text-left px-4 py-2 font-semibold text-ink">Phù hợp nhất cho</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-emerald-50">
                    <td className="px-4 py-2 font-medium text-ink">🚌 Xe buýt 86</td>
                    <td className="text-right px-4 py-2 text-ink">50.000đ</td>
                    <td className="text-right px-4 py-2 text-ink">50–75 phút</td>
                    <td className="px-4 py-2 text-ink-soft">Giá trị tốt nhất — Phố cổ</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚌 Xe buýt 17</td>
                    <td className="text-right px-4 py-2 text-ink">7.000đ</td>
                    <td className="text-right px-4 py-2 text-ink">45–60 phút</td>
                    <td className="px-4 py-2 text-ink-soft">Siêu tiết kiệm</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚌 Xe buýt 90</td>
                    <td className="text-right px-4 py-2 text-ink">9.000đ</td>
                    <td className="text-right px-4 py-2 text-ink">40–55 phút</td>
                    <td className="px-4 py-2 text-ink-soft">Tiết kiệm — Khu vực Tây Hồ</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚗 Grab</td>
                    <td className="text-right px-4 py-2 text-ink">200.000–300.000đ</td>
                    <td className="text-right px-4 py-2 text-ink">35–50 phút</td>
                    <td className="px-4 py-2 text-ink-soft">Tốc độ + tiện nghi</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚕 Taxi</td>
                    <td className="text-right px-4 py-2 text-ink">300.000–500.000đ</td>
                    <td className="text-right px-4 py-2 text-ink">35–45 phút</td>
                    <td className="px-4 py-2 text-ink-soft">Nhóm + hành lý</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-2 font-medium text-ink">🚙 Xe đưa đón riêng</td>
                    <td className="text-right px-4 py-2 text-ink">400.000–800.000đ</td>
                    <td className="text-right px-4 py-2 text-ink">30–40 phút</td>
                    <td className="px-4 py-2 text-ink-soft">Đặt trước + VIP</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              Thời gian bao gồm di chuyển trên đường; cộng thêm 20–45 phút làm thủ tục nhập cảnh và nhận hành lý.
              <a href="/vi/thoi-gian-ra-cuong-t2-noi-bai" className="text-primary underline ml-2">
                Dùng công cụ tính thời gian ra cổng →
              </a>
            </p>
          </section>

          {/* Verdict callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-2">Chúng tôi khuyên dùng</h2>
            <p className="text-ink">
              <strong>Xe buýt 86 (50.000đ)</strong> là lựa chọn tốt nhất cho hầu hết hành khách — giá hợp lý, đáng tin cậy,
              và đi thẳng về phố cổ. <strong>Grab (200.000–300.000đ)</strong> là lựa chọn tốt nếu bạn ưu tiên tốc độ hoặc
              đến sau 22:15. Để tiết kiệm nhất, dùng <strong>Xe buýt 17 (7.000đ)</strong> nếu điểm đến nằm trên tuyến của nó.
            </p>
          </div>

          {/* Transport options detail cards */}
          {TRANSPORT_OPTIONS_VI.map((opt) => (
            <section
              key={opt.name}
              className={`${opt.color} border rounded-xl p-6`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-ink">{opt.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${opt.badgeColor}`}>
                      {opt.highlight}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-ink">{opt.price}</p>
                  <p className="text-sm text-ink-soft">{opt.time}</p>
                </div>
              </div>
              <p className="text-ink-soft mb-3">{opt.description}</p>
              <p className="text-sm text-ink">
                <strong>Phù hợp nhất cho:</strong> {opt.bestFor}
              </p>
              <a
                href={opt.link}
                className="text-primary underline text-sm mt-2 inline-block"
              >
                Đọc hướng dẫn đầy đủ →
              </a>
            </section>
          ))}

          {/* Hub: child article links */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-xl font-bold text-ink mb-4">Hướng dẫn chi tiết cho từng phương tiện</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/vi/tuyen-86-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚌 Xe buýt 86: Lịch trình &amp; Cách đón</p>
                <p className="text-sm text-ink-soft">Lịch trình đầy đủ, giá 50.000đ, điểm dừng tại nhà ga, mẹo tính giờ.</p>
              </a>
              <a
                href="/vi/grab-vs-xe-buyt-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🚗 Grab vs Xe buýt 86: So sánh đầy đủ</p>
                <p className="text-sm text-ink-soft">Chi phí, thời gian, tiện nghi và an toàn với dữ liệu thực.</p>
              </a>
              <a
                href="/vi/cach-re-nhat-san-bay-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">💰 Cách rẻ nhất từ sân bay Nội Bài</p>
                <p className="text-sm text-ink-soft">5 lựa chọn xếp theo giá: từ 7.000đ đến 500.000đ.</p>
              </a>
              <a
                href="/vi/san-bay-noi-bai-den-ho-hoan-kiem"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🏛️ Sân bay Nội Bài đến Hồ Hoàn Kiếm</p>
                <p className="text-sm text-ink-soft">4 tuyến đến phố cổ, thời gian và chi phí cụ thể.</p>
              </a>
              <a
                href="/vi/noi-bai-lan-dau-di"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">✈️ Lần đầu đến sân bay Nội Bài</p>
                <p className="text-sm text-ink-soft">Từng bước: nhập cảnh, mua SIM, ATM, và phương tiện ra cổng.</p>
              </a>
              <a
                href="/vi/di-chuyen-dem-khuya-san-bay-noi-bai"
                className="block bg-white border border-surface-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-ink mb-1">🌙 Đến sân bay Nội Bài đêm khuya</p>
                <p className="text-sm text-ink-soft">Lựa chọn sau khi xe buýt 86 dừng (22:15), phụ phí Grab đêm, mẹo taxi.</p>
              </a>
            </div>
          </section>

          {/* Additional resources */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-3">Tài nguyên hữu ích khác</h2>
            <ul className="space-y-2">
              <li>
                <a href="/vi/thoi-gian-ra-cuong-t2-noi-bai" className="text-primary underline">
                  Thời gian ra khỏi nhà ga T2 Nội Bài — Mất bao lâu để ra khỏi nhà ga
                </a>
              </li>
              <li>
                <a href="/vi/xe-lo-gio-sanh-bay-viet-nam" className="text-primary underline">
                  Xe lừa đảo tại sân bay Việt Nam — Cách phòng tránh
                </a>
              </li>
              <li>
                <a href="/vi/phi-hanh-ly-xe-buyt-san-bay" className="text-primary underline">
                  Phí hành lý xe buýt sân bay Việt Nam — Bạn có thể mang gì lên xe buýt
                </a>
              </li>
            </ul>
          </section>

          {/* Calculator CTA */}
          <section className="bg-white border-2 border-primary rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-ink mb-2">Tính thời gian ra cổng chính xác từ Nội Bài</h2>
            <p className="text-ink-soft mb-4">
              Biết chính xác khi nào nên rời nhà ga để không bao giờ bỏ lỡ xe buýt. Nhập giờ bay, nhà ga và hành lý của bạn.
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
              Trang hub này được biên soạn từ dữ liệu hành khách thực tế, lịch trình xe buýt chính thức và điều kiện thực tế
              tại sân bay Nội Bài (HAN). Giá xe buýt được Sở Giao thông vận tải Hà Nội cố định và không thay đổi theo giao thông.
              Giá Grab là ước tính — xác nhận giá trong ứng dụng trước khi đặt. Cập nhật lần cuối: 2026.
            </p>
          </section>

          <FAQSection items={FAQ_ITEMS_VI} />
        </div>

        <FAQSchema items={FAQ_ITEMS_VI} />
      </ArticleLayout>
    </>
  );
}
