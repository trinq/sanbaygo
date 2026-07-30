import { ArticleLayout } from '../../components/Layout/ArticleLayout';
import { SEOHelmet } from '../../components/SEO';
import { ExitTimeCalculator } from '../../components/ExitTimeCalculator';

const FAQ_ITEMS = [
  {
    q: 'Thời gian ra khỏi nhà ga T2 quốc tế Nội Bài là bao lâu?',
    a: 'Thời gian ra khỏi nhà ga phụ thuộc vào loại hành lý và chuyến bay. Với hành lý xách tay: 45–75 phút (chuyến bay quốc tế). Với hành lý ký gửi: 60–90 phút. Các ước tính này bao gồm kiểm tra hộ chiếu, nhận hành lý và đi bộ đến điểm đón xe buýt.',
  },
  {
    q: 'T2 là nhà ga nào tại sân bay Nội Bài?',
    a: 'T2 (Nhà ga 2) là nhà ga quốc tế tại sân bay Nội Bài (HAN). Tất cả chuyến bay quốc tế đều sử dụng T2, cả đến và đi. Các chuyến bay nội địa sử dụng T1 (Nhà ga 1).',
  },
  {
    q: 'Tôi có cần qua kiểm tra hộ chiếu tại T2 không?',
    a: 'Có. Tất cả hành khách đến bằng chuyến bay quốc tế tại T2 phải qua kiểm tra hộ chiếu (immigration). Thông thường mất 20–40 phút vào giờ cao điểm. Hành khách nối chuyến nội địa từ T2 không cần qua immigration.',
  },
  {
    q: 'Kiểm tra hộ chiếu quốc tế tại Nội Bài mất bao lâu?',
    a: 'Kiểm tra hộ chiếu tại T2 Nội Bài thường mất 20–40 phút vào giờ cao điểm (7–9 sáng và 5–7 tối). Ngoài giờ cao điểm, có thể chỉ mất 15–25 phút. Cổng hộ chiếu điện tử (dành cho công dân nhiều nước) thường nhanh hơn.',
  },
  {
    q: 'Điểm đón xe buýt ở đâu sau khi ra khỏi T2?',
    a: 'Xe buýt 86 dừng tại T2 Cổng A1, tầng 1 sảnh đến, đối diện cột 14. Điểm đón có biển chỉ dẫn bằng tiếng Anh và tiếng Việt. Tìm biển xe buýt công cộng màu xanh dương.',
  },
  {
    q: 'Tôi có thể đón xe buýt ngay sau khi hạ cánh tại T2 không?',
    a: 'Có, nếu bạn chỉ có hành lý xách tay và di chuyển nhanh. Hầu hết hành khách có thể đến điểm đón xe buýt 86 trong vòng 45–60 phút sau khi hạ cánh. Sử dụng công cụ tính thời gian ở trên để ước tính cụ thể.',
  },
  {
    q: 'Có quầy SIM ngay trước cổng ra tại T2 không?',
    a: 'Có. Một số nhà mạng (Viettel, Vinaphone, Mobifone) có quầy trong sảnh đến tại T2, sau khi qua kiểm tra hộ chiếu nhưng trước khi ra đến điểm đón xe buýt. Giá được niêm yết. SIM cũng được bán tại các cửa hàng tiện lợi gần điểm đón xe buýt.',
  },
  {
    q: 'Tôi nên đến T2 quốc tế sớm bao lâu để nối chuyến nội địa?',
    a: 'Nếu bạn nối chuyến nội địa tại T1 sau khi đến T2 quốc tế, hãy cộng thêm ít nhất 2,5–3 giờ vào thời gian ra khỏi nhà ga. Bạn cần: ra khỏi T2 (45–90 phút), đi bộ hoặc shuttle miễn phí giữa hai nhà ga (15 phút), qua an ninh tại T1 (30 phút), và đến cổng (15 phút).',
  },
];

export function ExitTimePageVI() {
  return (
    <>
      <SEOHelmet path="/vi/thoi-gian-ra-cuong-t2-noi-bai" />
      <ArticleLayout languageSwitchPath="/noibai-t2-exit-time">
        {/* Hero */}
        <header className="bg-primary text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Hướng dẫn sân bay Nội Bài
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Thời gian ra khỏi nhà ga T2 quốc tế Nội Bài (2026)
            </h1>
            <p className="text-lg opacity-90">
              Ước tính thời gian ra khỏi nhà ga dựa trên nhà ga, hành lý và loại chuyến bay.
              Sử dụng công cụ tính toán để lên kế hoạch cho chuyến đi tiếp theo.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Calculator above the fold */}
          <section className="-mt-8 relative z-10 mb-10">
            <ExitTimeCalculator language="vi" />
          </section>

          {/* Why this matters */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink mb-4">
              Tại sao thời gian ra nhà ga quan trọng
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              Sân bay Nội Bài (HAN) cách trung tâm Hà Nội 35 km. Nếu bạn ước tính sai thời gian
              ra khỏi T2, bạn có thể lỡ chuyến xe buýt cuối hoặc đến nơi muộn hơn dự kiến.
            </p>
            <p className="text-ink-soft leading-relaxed">
              Xe buýt 86 khởi hành mỗi 15–20 phút từ T2 Cổng A1 (đối diện cột 14).
              Chuyến cuối cùng: <strong>22:15</strong>. Nếu bạn hạ cánh lúc 21:00 với hành lý ký gửi
              và hàng đợi immigration dài, bạn có thể không kịp.
            </p>
          </section>

          {/* Time breakdown */}
          <section className="bg-slate-50 border border-surface-border rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-ink mb-4">
              Những bước cộng dồn vào thời gian ra nhà ga
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <p className="font-medium text-ink">Kiểm tra hộ chiếu (chuyến bay quốc tế)</p>
                  <p className="text-sm text-ink-soft">
                    20–40 phút giờ cao điểm / 15–25 phút ngoài giờ cao điểm.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <p className="font-medium text-ink">Nhận hành lý</p>
                  <p className="text-sm text-ink-soft">
                    0–5 phút (xách tay) · 10–25 phút (ký gửi)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <p className="font-medium text-ink">Đi bộ đến điểm đón xe buýt 86 (T2 Cổng A1)</p>
                  <p className="text-sm text-ink-soft">8–12 phút từ cổng ra</p>
                </div>
              </div>
            </div>
          </section>

          {/* T1 vs T2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink mb-4">
              T1 nội địa vs T2 quốc tế
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-surface-border">
                    <th className="text-left py-3 px-3 text-ink-soft font-medium">Bước</th>
                    <th className="text-right py-3 px-3 text-ink-soft font-medium">T1 nội địa</th>
                    <th className="text-right py-3 px-3 text-ink-soft font-medium">T2 quốc tế</th>
                  </tr>
                </thead>
                <tbody className="text-ink">
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Ra khỏi cổng</td>
                    <td className="py-3 px-3 text-right">5–10 phút</td>
                    <td className="py-3 px-3 text-right">20–40 phút (kiểm tra hộ chiếu)</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Hành lý xách tay</td>
                    <td className="py-3 px-3 text-right">0–5 phút</td>
                    <td className="py-3 px-3 text-right">0–5 phút</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Hành lý ký gửi</td>
                    <td className="py-3 px-3 text-right">10–20 phút</td>
                    <td className="py-3 px-3 text-right">10–25 phút</td>
                  </tr>
                  <tr className="border-b border-surface-border">
                    <td className="py-3 px-3">Đi bộ đến điểm đón</td>
                    <td className="py-3 px-3 text-right">8–12 phút</td>
                    <td className="py-3 px-3 text-right">8–12 phút</td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="py-3 px-3">Tổng (xách tay)</td>
                    <td className="py-3 px-3 text-right text-emerald-700">15–25 phút</td>
                    <td className="py-3 px-3 text-right text-emerald-700">45–75 phút</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Bus 86 CTA */}
          <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-ink mb-3">
              Sau khi ra — Đón xe buýt 86
            </h2>
            <p className="text-ink-soft mb-3">
              Xe buýt 86 kết nối T2 trực tiếp với khu phố cổ Hà Nội, khởi hành mỗi 15–20 phút.
              Giá vé: <strong>50.000đ</strong>. Chuyến cuối: <strong>22:15</strong>.
            </p>
            <a
              href="/vi/tuyen-86-noi-bai"
              className="inline-block text-emerald-700 font-medium hover:underline"
            >
              Xem lịch trình đầy đủ xe buýt 86 →
            </a>
          </section>

          {/* Grab CTA */}
          <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-ink mb-3">
              Grab — Phương án dự phòng
            </h2>
            <p className="text-ink-soft mb-3">
              Grab hoạt động 24/7 tại T2. Ước tính giá đến trung tâm Hà Nội:{' '}
              <strong>250.000–350.000đ</strong>. Giá cố định hiển thị trước khi xác nhận.
            </p>
            <a
              href="https://grab.com/vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-orange-700 font-medium hover:underline"
            >
              Mở ứng dụng Grab →
            </a>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-ink mb-4">
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="rounded-xl border border-surface-border bg-white">
                  <summary className="cursor-pointer p-5 font-medium text-ink list-none flex items-center justify-between">
                    {item.q}
                    <svg className="h-5 w-5 text-ink-soft shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-surface-border px-5 pb-5 pt-4 text-ink-soft">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="border-t border-surface-border pt-8 mt-8">
            <h2 className="text-lg font-semibold text-ink mb-3">Bài viết liên quan</h2>
            <ul className="space-y-2">
              <li>
                <a href="/vi/tuyen-86-noi-bai" className="text-primary underline hover:text-primary/80">
                  Tuyến xe buýt 86 sân bay Nội Bài — Lịch trình, Giá vé 2026
                </a>
              </li>
              <li>
                <a href="/vi/xe-lo-gio-sanh-bay-viet-nam" className="text-primary underline hover:text-primary/80">
                  Xe lừa đảo tại sân bay Việt Nam — Cách phòng tránh
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_ITEMS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />
      </ArticleLayout>
    </>
  );
}
