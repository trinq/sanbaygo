import { SEOHelmet } from '../../components/SEO/SEOHelmet';
import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { FAQSection, FAQSchema } from '../../components/Layout/shared/FAQ';

const FAQ_ITEMS = [
  {
    q: 'Chuyến bay của tôi hạ cánh ở nhà ga nào tại sân bay Nội Bài?',
    a: 'Sân bay Nội Bài (HAN) có hai nhà ga: T1 dành cho chuyến bay nội địa và T2 dành cho chuyến bay quốc tế. Hầu hết các chuyến bay quốc tế (bao gồm từ Đông Nam Á, Trung Quốc, châu Âu và Hoa Kỳ) hạ cánh tại T2. Nếu bạn đi Vietnam Airlines, VietJet Air hoặc Bamboo Airways chuyến nội địa, bạn sẽ đến T1. Sau khi hạ cánh, làm theo biển chỉ dẫn — kiểm tra hộ chiếu được đánh dấu rõ ràng ở cả hai nhà ga.',
  },
  {
    q: 'Mua SIM ở đâu tại sân bay Nội Bài?',
    a: 'Quầy SIM nằm ở sảnh đến của cả T1 và T2, thường ở bên phải sau khi qua nhận hành lý và trước khi ra cổng. Tìm quầy Viettel, Vinaphone hoặc Mobifone. SIM du lịch 10 GB giá khoảng 50.000đ–100.000đ. Viettel có phủ sóng tốt nhất vùng nông thôn. Quầy mở đến chuyến bay cuối cùng trong ngày.',
  },
  {
    q: 'Sân bay Nội Bài có ATM miễn phí không?',
    a: 'Có các ATM của các ngân hàng lớn (VietinBank, Vietcombank, BIDV, ACB) ở sảnh đến cả T1 và T2. Phí rút ATM là 1.000đ–5.000đ mỗi giao dịch cộng phí rút tiền quốc tế của ngân hàng bạn. Quầy đổi tiền cũng có nhưng tỷ giá kém — chỉ đổi một ít tiền mặt tại sân bay và đổi ở cửa hàng vàng hoặc ngân hàng trong thành phố để có tỷ giá tốt hơn.',
  },
  {
    q: 'Đón xe buýt 86 từ T1 hay T2 như thế nào?',
    a: 'Xe buýt 86 dừng ở cả T1 và T2. Từ T1: sau khi ra sảnh đến, đi thẳng ra Column A1 — điểm đón xe buýt nằm ngoài cổng, có biển chỉ dẫn rõ ràng. Từ T2: sau khi ra, qua bên phải của lối ra đến Column A1. Xe buýt 86 chạy 05:00–22:15, giá 50.000đ. <a href="/vi/tuyen-86-noi-bai" className="text-primary underline">Xem lịch xe buýt 86 đầy đủ →</a>',
  },
  {
    q: 'Gọi Grab trong sân bay Nội Bài được không?',
    a: 'Được. Grab hoạt động bình thường trong sân bay Nội Bài — mở ứng dụng, nhập điểm đến và đặt xe. Điểm đón Grab nằm ở lối ra sảnh đến ngoài T1 hoặc T2, có biển chỉ dẫn rõ ràng. Bạn không cần SIM Việt Nam để dùng Grab — ứng dụng hoạt động trên mọi SIM quốc tế hoặc Wi-Fi sân bay. Thời gian chờ thường 5–15 phút. <a href="/vi/grab-vs-xe-buyt-noi-bai" className="text-primary underline">So sánh Grab vs xe buýt 86 →</a>',
  },
  {
    q: 'Sân bay Nội Bài có an toàn vào ban đêm không?',
    a: 'Có, sân bay Nội Bài nói chung an toàn vào ban đêm. Nhân viên an ninh có mặt 24/7 và nhà ga được chiếu sáng tốt. Vấn đề chính sau giờ là các tài xế taxi và tài xế không chính thức có thể tiếp cận bạn ở khu vực đến. Bỏ qua tất cả lời mời và đi thẳng đến điểm đón Grab chính thức hoặc phương tiện đã đặt trước. Phụ nữ đi một mình nên dùng Grab thay vì nhận lời mời bên đường.',
  },
  {
    q: 'Nên dành bao lâu sau khi hạ cánh ở Nội Bài?',
    a: 'Dự kiến 30–60 phút từ lúc hạ cánh đến khi ra khỏi nhà ga có phương tiện. Chi tiết: rời máy bay (5 phút), đi bộ đến kiểm tra hộ chiếu (5 phút), xếp hàng kiểm tra hộ chiếu (10–30 phút tùy chuyến bay và thời điểm), nhận hành lý (10–15 phút), đi bộ đến phương tiện (5 phút). Vào giờ cao điểm (7–9 sáng, 5–7 tối), hàng đợi kiểm tra hộ chiếu có thể kéo dài 45 phút. <a href="/vi/thoi-gian-ra-cuong-t2-noi-bai" className="text-primary underline">Dùng công cụ tính giờ ra cổng →</a>',
  },
  {
    q: 'Cách rời sân bay Nội Bài tốt nhất là gì?',
    a: 'Khách đi tiết kiệm đến trước 22:15, xe buýt 86 (50.000đ) là lựa chọn tốt nhất — xe đi Old Quarter và chạy đều đặn. Muốn nhanh hoặc đến sau 22:15, Grab (200.000đ–300.000đ) an toàn và đáng tin cậy nhất. Tránh đồng hồ tính tiền taxi sân bay trừ khi bạn biết giá cố định — có nguy cơ bị lừa. Nếu có hành lý nặng hoặc nhóm 4+, GrabSUV hoặc dịch vụ đưa đón khách sạn là lựa chọn tốt nhất.',
  },
];

export function NoibaiFirstTimePageVI() {
  return (
    <>
      <SEOHelmet path="/vi/noi-bai-lan-dau-di" />
      <ArticleLayout languageSwitchPath="/noibai-airport-first-time-guide">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Sân bay Nội Bài · Hà Nội
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Lần đầu đến sân bay Nội Bài: Hướng dẫn sân bay (2026)
            </h1>
            <p className="text-lg opacity-90">
              Từng bước: kiểm tra hộ chiếu, mua SIM, ATM, và cách rời sân bay.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {/* Quick checklist */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Checklist khi đến sân bay</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Kiểm tra hộ chiếu → làm theo biển chỉ dẫn đến sảnh đến</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Nhận hành lý → kiểm tra màn hình số belt</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Hải quan (không có gì khai → làn xanh)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <p className="text-ink text-sm">Ra sảnh đến → tìm phương tiện di chuyển</p>
              </div>
            </div>
          </section>

          {/* Arrival sequence */}
          <section>
            <h2 className="text-2xl font-bold text-ink mb-6">Từng bước: chuyện gì xảy ra sau khi hạ cánh</h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Rời máy bay và đi bộ đến kiểm tra hộ chiếu',
                  desc: 'Làm theo biển chỉ dẫn đến "Immigration" hoặc "Passport Control". Thời gian đi bộ từ cổng ra đến sảnh kiểm tra hộ chiếu thường 3–5 phút.',
                },
                {
                  step: '2',
                  title: 'Kiểm tra hộ chiếu',
                  desc: 'Xếp hàng ở quầy quốc tế (dành cho người mang hộ chiếu nước ngoài). Chuẩn bị hộ chiếu và thẻ cần trả lời câu hỏi nhập cảnh. Thời gian xử lý 30 giây đến 5 phút mỗi người. Vào giờ cao điểm, có thể xếp hàng 10–30 phút.',
                },
                {
                  step: '3',
                  title: 'Nhận hành lý',
                  desc: 'Kiểm tra màn hình LCD cho chuyến bay của bạn — sẽ hiển thị số belt hành lý. Đi đến belt đó ở sảnh đến. Cho phép 10–15 phút để hành lý xuất hiện.',
                },
                {
                  step: '4',
                  title: 'Hải quan',
                  desc: 'Nếu không có gì khai báo, đi qua làn xanh. Nếu có hàng vượt quá miễn thuế, dùng làn đỏ.',
                },
                {
                  step: '5',
                  title: 'Ra sảnh đến',
                  desc: 'Sau hải quan, bạn ra sảnh đến chính. Đây là nơi có quầy SIM, ATM, đổi tiền và các phương tiện di chuyển bên dưới.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">{title}</h3>
                    <p className="text-ink-soft text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SIM card */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Mua SIM tại sân bay</h2>
            <p className="text-ink-soft mb-4">
              Quầy SIM nằm ở bên phải sảnh đến ở cả T1 và T2, trước khi ra cổng. Tìm quầy Viettel hoặc Vinaphone.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink font-medium">SIM eSIM du lịch Viettel</span>
                <span className="text-ink-soft">~50.000đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink font-medium">SIM du lịch Vinaphone</span>
                <span className="text-ink-soft">~100.000đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink font-medium">SIM du lịch Mobifone</span>
                <span className="text-ink-soft">~100.000đ</span>
              </div>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              <strong>Mẹo Viettel:</strong> Viettel có phủ sóng tốt nhất vùng nông thôn phía bắc. Nếu bạn đi Sapa,
              Hạ Long hoặc vùng xa, Viettel là lựa chọn an toàn nhất.
            </p>
          </section>

          {/* ATM / Exchange */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">ATM và đổi tiền</h2>
            <p className="text-ink-soft mb-4">
              ATM của VietinBank, Vietcombank, BIDV và ACB ở sảnh đến. Phí rút tiền 1.000đ–5.000đ mỗi giao dịch.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>Đổi tiền:</strong> Quầy đổi tiền sân bay có tỷ giá kém (thường thấp hơn 2–5% so với thị trường).
                Chỉ đổi 100.000đ–200.000đ ở đây cho chi phí nhỏ. Đổi phần còn lại ở cửa hàng vàng phố Trần Phú
                hoặc ngân hàng trong thành phố — tỷ giá tốt hơn nhiều.
              </p>
            </div>
          </section>

          {/* Bus stop location */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Điểm đón xe buýt 86</h2>
            <p className="text-ink-soft mb-3">
              Xe buýt 86 dừng ở cả hai nhà ga. Điểm đón xe buýt có biển chỉ dẫn rõ ràng với số tuyến và điểm đến.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-ink mb-1">T1 — Nhà ga nội địa</p>
                <p className="text-ink-soft text-sm">Column A1, sảnh đến, ngoài cổng ra chính</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-ink mb-1">T2 — Nhà ga quốc tế</p>
                <p className="text-ink-soft text-sm">Column A1, sảnh đến, bên phải lối ra</p>
              </div>
            </div>
            <p className="text-ink-soft text-sm mt-3">
              <a href="/vi/tuyen-86-noi-bai" className="text-primary underline">
                Xe buýt 86 chạy 05:00–22:15 · 50.000đ · Xem lịch trình đầy đủ →
              </a>
            </p>
          </section>

          {/* Grab pickup */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">Điểm đón Grab</h2>
            <p className="text-ink-soft mb-3">
              Khu vực đón Grab nằm ngoài sảnh đến ở cả T1 và T2, có biển chỉ dẫn rõ ràng. Mở ứng dụng Grab,
              nhập điểm đến, xe sẽ đến trong 5–15 phút. Không cần SIM Việt Nam — Wi-Fi sân bay đủ để đặt xe.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Mẹo Grab:</strong> GrabCar (sedan) rẻ nhất; GrabSUV phù hợp hơn cho nhóm có hành lý lớn.
                Cả hai đều hiển thị giá trước khi xác nhận — không đồng hồ, không mặc cả.
                <br />
                <a href="/vi/grab-vs-xe-buyt-noi-bai" className="underline mt-1 inline-block">
                  So sánh Grab vs xe buýt 86 →
                </a>
              </p>
            </div>
          </section>

          {/* Taxi safety */}
          <section className="bg-white border border-surface-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-ink mb-3">An toàn khi đi taxi</h2>
            <p className="text-ink-soft mb-4">
              Taxi đồng hồ chính thức có sẵn nhưng có rủi ro cho người đến lần đầu.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-red-500 mt-0.5">✕</span>
                <p className="text-ink">
                  <strong>Tránh:</strong> Tài xế tiếp cận bạn trong nhà ga hoặc gọi bạn bên ngoài. Đây là tài xế
                  không phép có thể tính giá cao.
                </p>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <p className="text-ink">
                  <strong>Lựa chọn an toàn:</strong> Mai Linh (hotline 024 38 61 61 61) và Vinasun — công ty uy tín
                  với đồng hồ tính tiền. Chi phí 300.000đ–500.000đ vào trung tâm Hà Nội.
                </p>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <p className="text-ink">
                  <strong>Lựa chọn tốt nhất:</strong> Dùng Grab — giá cố định, theo dõi qua app, không rào cản
                  ngôn ngữ khi thanh toán.
                </p>
              </li>
            </ul>
            <p className="mt-3 text-sm text-ink-soft">
              <a href="/vi/xe-lo-gio-sanh-bay-viet-nam" className="text-primary underline">
                Xem hướng dẫn đầy đủ tránh lừa đảo taxi →
              </a>
            </p>
          </section>

          {/* Author note */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-ink mb-2">Về hướng dẫn này</h2>
            <p className="text-ink-soft text-sm">
              Hướng dẫn đến sân bay này được tổng hợp từ báo cáo thực tế của du khách, thông tin sân bay
              chính thức và điều kiện thực tế tại sân bay Nội Bài (HAN). Chúng tôi xác minh vị trí điểm đón
              xe buýt, tình trạng SIM và phương tiện trước khi xuất bản. Cập nhật: 2026.
            </p>
          </section>

          {/* Related articles */}
          <section className="border-t border-surface-border pt-8">
            <h2 className="text-lg font-semibold text-ink mb-3">Bài viết liên quan</h2>
            <ul className="space-y-2">
              <li>
                <a href="/vi/tuyen-86-noi-bai" className="text-primary underline hover:text-primary/80">
                  Tuyến xe buýt 86 sân bay Nội Bài — Lịch trình, giá vé 50.000đ (2026)
                </a>
              </li>
              <li>
                <a href="/vi/grab-vs-xe-buyt-noi-bai" className="text-primary underline hover:text-primary/80">
                  Grab vs xe buýt 86 Nội Bài: So sánh Chi phí &amp; Thời gian (2026)
                </a>
              </li>
              <li>
                <a href="/vi/thoi-gian-ra-cuong-t2-noi-bai" className="text-primary underline hover:text-primary/80">
                  Thời gian ra khỏi nhà ga T2 quốc tế Nội Bài (2026)
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
