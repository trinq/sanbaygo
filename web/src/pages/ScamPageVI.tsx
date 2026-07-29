import { ArticleLayout } from '../components/Layout/ArticleLayout';
import { SEOHelmet } from '../components/SEO';

const SCAM_TIPS = [
  {
    title: 'Dùng app Grab hoặc BeBike',
    description: 'Giá cố định trước khi xác nhận, không mặc cả.',
    icon: '📱',
  },
  {
    title: 'Từ chối "Giá đặc biệt"',
    description: 'Tài xế taxi tiếp cận du khách ngay khi ra cổng thường报价 gấp 3–5 lần giá thật. Hãy đi qua.',
    icon: '🚫',
  },
  {
    title: 'Đi xe buýt công cộng',
    description: 'Tuyến 86 chỉ VND 50,000. Giá vé do nhà nước quy định — không có nguy cơ lừa đảo.',
    icon: '🚌',
  },
  {
    title: 'Nếu bắt taxi — Yêu cầu bật đồng hồ',
    description: 'Nói rõ "bật đồng hồ" (meter). Nếu tài xế từ chối, hãy bắt taxi khác.',
    icon: '🚕',
  },
  {
    title: 'Cẩn thận dịch vụ "Gọi xe" của khách sạn',
    description: 'Một số nhân viên khách sạn gọi "xe riêng" với giá gấp 5–10 lần Grab. Luôn đặt xe qua app.',
    icon: '🏨',
  },
  {
    title: 'Nhân viên sân bay không giới thiệu taxi',
    description: 'Người mặc đồng phục chỉ bạn vào hàng taxi có thể nhận hoa hồng. Hãy tự kiểm tra giá.',
    icon: '👮',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Lừa đảo taxi có phổ biến tại sân bay Việt Nam không?',
    a: 'Có. Việc taxi tính giá cao hơn thực tế là một trong những phàn nàn phổ biến nhất của du khách tại Việt Nam. Giá có thể gấp 3–10 lần nếu bạn không biết giá vé địa phương hoặc đồng ý giá cố định trước khi khởi hành.',
  },
  {
    q: 'Grab có an toàn tại sân bay Việt Nam không?',
    a: 'Có. Grab sử dụng định giá cố định — bạn thấy giá trước khi xác nhận. Không có đồng hồ để thao túng. Grab có sẵn tại cả sân bay Nội Bài (HAN) và Tân Sơn Nhất (SGN).',
  },
  {
    q: 'Taxi thực tế từ sân bay Nội Bài về trung tâm Hà Nội bao nhiêu?',
    a: 'Taxi có đồng hồ từ Nội Bài về trung tâm Hà Nội thường có giá VND 250,000–400,000 tùy theo giao thông. Nếu không có đồng hồ, tài xế có thể yêu cầu VND 500,000–1,000,000.',
  },
  {
    q: 'Xe buýt sân bay có bị lừa đảo không?',
    a: 'Không. Tuyến 86 (Hà Nội) giá đúng VND 50,000 — giá được in trên vé. Tuyến 109 (Sài Gòn, T3) giá VND 15,000. Tuyến 152 (Sài Gòn, T1/T2) giá VND 5,000. Không cần mặc cả.',
  },
  {
    q: 'Tôi nên làm gì nếu bị lừa đảo?',
    a: 'Nếu bạn đồng ý giá cố định và cảm thấy bị tính giá quá cao, hãy từ tốn từ chối trả thêm và đi ra. Trong trường hợp nghiêm trọng, bạn có thể báo cho ban quản lý sân bay.',
  },
];

export function ScamPageVI() {
  return (
    <>
      <SEOHelmet path="/vi/xe-lo-gio-sanh-bay-viet-nam" />
      <ArticleLayout languageSwitchPath="/airport-scam-vietnam-taxi">
        {/* Hero */}
        <header className="bg-red-600 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              An toàn sân bay
            </span>
            <h1 className="text-4xl font-bold mt-2 mb-4">
              Xe lừa đảo tại sân bay Việt Nam — Cách phòng tránh
            </h1>
            <p className="text-lg opacity-90">
              Taxi tính giá cao là phàn nàn số 1 của du khách tại sân bay Việt Nam.
              Đây là tất cả những gì bạn cần biết trước khi hạ cánh.
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Warning Banner */}
          <section className="bg-red-50 border border-red-300 rounded-xl p-6 mb-8">
            <p className="text-red-800 font-semibold text-lg">
              ⚠️ Taxi lừa đảo phổ biến tại sân bay Nội Bài (HAN) và Tân Sơn Nhất (SGN).
              Hãy đọc hướng dẫn này trước khi đến.
            </p>
          </section>

          {/* How Scams Work */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Cách thức lừa đảo</h2>
            <p className="text-ink-soft mb-4 leading-relaxed">
              Khi bạn ra khỏi sảnh đến, tài xế taxi (hoặc người môi giới của họ) tiếp cận
              du khách và đề nghị "giá đặc biệt" vào thành phố. Những mức giá này thường
              gấp 3–10 lần giá thật. Kể cả taxi có đồng hồ cũng không an toàn — một số
              tài xế đi đường vòng hoặc bật đồng hồ muộn.
            </p>
            <p className="text-ink-soft leading-relaxed">
              Trò lừa đảo này hoạt động vì:
            </p>
            <ul className="list-disc list-inside space-y-2 text-ink-soft mt-3">
              <li>Du khách không biết giá vé địa phương</li>
              <li>Rào cản ngôn ngữ khiến việc kiểm tra giá khó khăn</li>
              <li>Khách mệt sau chuyến bay muốn nhanh nhất có thể</li>
              <li>Tài xế có thể kiên trì hoặc thậm chí hung hăng</li>
            </ul>
          </section>

          {/* Safety Tips Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">Cách bảo vệ bản thân</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCAM_TIPS.map((tip, i) => (
                <div key={i} className="bg-white border border-surface-border rounded-xl p-5">
                  <div className="text-3xl mb-2">{tip.icon}</div>
                  <h3 className="font-semibold text-ink mb-1">{tip.title}</h3>
                  <p className="text-sm text-ink-soft">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real Fares */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-4">Giá thật — Biết trước khi đi</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left py-2 text-ink-soft">Tuyến đường</th>
                  <th className="text-right py-2 text-ink-soft">Giá thật</th>
                  <th className="text-right py-2 text-ink-soft">Giá lừa đảo</th>
                </tr>
              </thead>
              <tbody className="text-ink">
                <tr className="border-b border-blue-100">
                  <td className="py-2">HAN → Phố cổ Hà Nội (taxi)</td>
                  <td className="py-2 text-right font-medium">VND 250k–400k</td>
                  <td className="py-2 text-right text-red-600">VND 500k–1M</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2">HAN → Phố cổ Hà Nội (Bus 86)</td>
                  <td className="py-2 text-right font-medium">VND 50,000</td>
                  <td className="py-2 text-right text-emerald-600">Không lừa đảo</td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-2">SGN T3 → Trung tâm Sài Gòn (taxi)</td>
                  <td className="py-2 text-right font-medium">VND 100k–180k</td>
                  <td className="py-2 text-right text-red-600">VND 300k–500k</td>
                </tr>
                <tr>
                  <td className="py-2">SGN T3 → Trung tâm Sài Gòn (Bus 109)</td>
                  <td className="py-2 text-right font-medium">VND 15,000</td>
                  <td className="py-2 text-right text-emerald-600">Không lừa đảo</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Grab Callout */}
          <section className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-ink mb-3">Dùng Grab — Rẻ hơn và An toàn hơn</h2>
            <p className="text-ink-soft mb-4">
              Grab (có sẵn tại cả HAN và SGN) cho bạn thấy giá chính xác trước khi xác nhận.
              Không đồng hồ, không đi đường vòng, không mặc cả.
            </p>
            <a
              href="https://grab.com/vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Mở Grab →
            </a>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Câu hỏi thường gặp</h2>
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

          {/* Compare CTA */}
          <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-ink mb-2">
              So sánh Bus vs Grab trước khi hạ cánh
            </h2>
            <p className="text-ink-soft mb-4">
              Dùng công cụ tính của chúng tôi để tìm phương án nhanh nhất hoặc rẻ nhất cho chuyến bay của bạn.
            </p>
            <a
              href="/vi/"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Dùng công cụ tính →
            </a>
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
