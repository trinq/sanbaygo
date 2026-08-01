export type MetaConfig = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  /**
   * Optional subtitle rendered directly under the H1. Not part of SEO meta —
   * purely on-page introductory copy. Lives here (vs. in guidesRegistry.ts)
   * because it parallels `title` and `description` and is keyed by route.
   */
  subtitle?: string;
  alternateVI?: string;
  alternateEN?: string;
};

export const PAGE_META: Record<string, MetaConfig> = {
  '/': {
    title: 'Frylane — Airport Bus & Grab Comparison | Hanoi & Saigon',
    description: 'Find the fastest airport bus or Grab from Hanoi (Noi Bai) and Saigon (Tan Son Nhat) to city center. Real-time schedule, fare comparison, and exit time calculator.',
    keywords: 'airport bus hanoi, airport bus saigon, bus 86, bus 109, bus 152, noibai bus, tansonnhat bus, grab airport vietnam',
    canonical: 'https://frylane.com/',
    ogTitle: 'Frylane — Airport Bus & Grab Comparison',
    ogDescription: 'Fastest way from Hanoi & Saigon airport to city. Compare bus schedules, fares, and Grab.',
    ogUrl: 'https://frylane.com/',
  },
  '/vi/': {
    title: 'Frylane — Xe buýt sân bay & So sánh Grab | Hà Nội & Sài Gòn',
    description: 'Tìm chuyến xe buýt hoặc Grab nhanh nhất từ sân bay Nội Bài và Tân Sơn Nhất về trung tâm. Lịch trình thực, so sánh giá, tính giờ ra cổng.',
    keywords: 'xe buýt sân bay nội bài, xe buýt sân bay tân sơn nhất, tuyến 86, tuyến 109, tuyến 152',
    canonical: 'https://frylane.com/vi/',
    alternateEN: 'https://frylane.com/',
  },
  '/bus-86-hanoi-airport': {
    title: 'Bus 86 Hanoi Airport — Schedule, VND 50,000 Fare & How to Catch It (2026)',
    description: 'Complete guide to Bus 86 from Noi Bai Airport to Hanoi Old Quarter. Updated schedule, VND 50,000 fare, 50–55 min journey (65–75 min peak), and how to time your exit from T1/T2.',
    keywords: 'bus 86 hanoi airport, noibai bus 86, bus 86 schedule, hanoi airport bus fare',
    canonical: 'https://frylane.com/bus-86-hanoi-airport',
    alternateVI: 'https://frylane.com/vi/tuyen-86-noi-bai',
  },
  '/vi/tuyen-86-noi-bai': {
    title: 'Tuyến xe buýt 86 sân bay Nội Bài — Lịch trình, Giá vé 2026',
    description: 'Hướng dẫn đầy đủ tuyến xe buýt 86 từ sân bay Nội Bài về trung tâm Hà Nội. Lịch trình cập nhật, giá vé 50.000đ, thời gian 50-55 phút (giờ cao điểm 65-75 phút).',
    keywords: 'tuyến 86 nội bài, xe buýt 86, xe buýt sân bay nội bài hà nội',
    canonical: 'https://frylane.com/vi/tuyen-86-noi-bai',
    alternateEN: 'https://frylane.com/bus-86-hanoi-airport',
  },
  '/vi/tuyen-86-noi-bai-gio': {
    title: 'Lịch xe buýt 86 Nội Bài — Giờ khởi hành (2026)',
    subtitle: 'Tất cả 26 chuyến trong ngày của tuyến 86 Nội Bài — Hà Nội.',
    keywords: 'tuyến 86 nội bài giờ, lịch xe buýt 86, giờ khởi hành bus 86',
    description:
      'Lịch xe buýt 86 Nội Bài 2026: 26 chuyến/ngày từ 06:40 đến 22:15, mỗi 15–20 phút. Bao gồm giờ chuyến cuối và giờ cao điểm.',
    canonical: 'https://frylane.com/vi/tuyen-86-noi-bai-gio',
    alternateEN: 'https://frylane.com/bus-86-hanoi-airport',
  },
  '/bus-109-saigon-airport': {
    title: 'Bus 109 Saigon Airport — Schedule, VND 15,000 Fare (2026)',
    description: 'Take Bus 109 from Tan Son Nhat Airport (T3) to Saigon Downtown. VND 15,000 fare, 30-45 min, runs 05:30–22:00. Electric bus. Includes exit time calculator.',
    keywords: 'bus 109 saigon airport, tansonnhat bus 109, bus 109 schedule, saigon airport bus',
    canonical: 'https://frylane.com/bus-109-saigon-airport',
    alternateVI: 'https://frylane.com/vi/tuyen-109-tan-son-nhat',
  },
  '/vi/tuyen-109-tan-son-nhat': {
    title: 'Tuyến xe buýt 109 sân bay Tân Sơn Nhất — Giá 20.000đ',
    description: 'Xe buýt 109 từ sân bay Tân Sơn Nhất (T1/T3) vào trung tâm Sài Gòn. Giá 20.000đ, 30-50 phút, hoạt động 05:00–23:00.',
    keywords: 'tuyến 109, xe buýt 109 sân bay tân sơn nhất, xe buýt sài gòn',
    canonical: 'https://frylane.com/vi/tuyen-109-tan-son-nhat',
    alternateEN: 'https://frylane.com/bus-109-saigon-airport',
  },
  '/bus-152-saigon-fare': {
    title: 'Bus 152 Saigon Airport — VND 5,000 Fare (Cheapest Option)',
    description: 'Bus 152 from Tan Son Nhat Airport (T1/T2) to Saigon city center for only VND 5,000. The cheapest airport bus in Vietnam. Schedule, stops, and travel tips.',
    keywords: 'bus 152 saigon, bus 152 fare, saigon airport bus 152, cheapest airport bus vietnam',
    canonical: 'https://frylane.com/bus-152-saigon-fare',
    alternateVI: 'https://frylane.com/vi/tuyen-152-tan-son-nhat',
  },
  '/vi/tuyen-152-tan-son-nhat': {
    title: 'Tuyến xe buýt 152 sân bay Tân Sơn Nhất — Giá 5.000đ',
    description: 'Xe buýt 152 từ sân bay Tân Sơn Nhất (T1/T2) vào trung tâm Sài Gòn chỉ với 5.000đ. Tuyến xe buýt sân bay rẻ nhất Việt Nam.',
    keywords: 'tuyến 152, xe buýt 152 sân bay tân sơn nhất, xe buýt rẻ nhất việt nam',
    canonical: 'https://frylane.com/vi/tuyen-152-tan-son-nhat',
    alternateEN: 'https://frylane.com/bus-152-saigon-fare',
  },
  '/sgn-bus-109-t3-routing': {
    title: 'Bus 109 at Tan Son Nhat: T3 Only — What About T1 & T2? (2026)',
    description: "Bus 109 no longer stops at Tan Son Nhat T1/T2. If you arrive at T1 or T2, here's how to get to Bus 109's T3 stop — including a free inter-terminal shuttle.",
    keywords: 'bus 109 terminal 3 tan son nhat, bus 109 t2, tan son nhat t3 shuttle',
    canonical: 'https://frylane.com/sgn-bus-109-t3-routing',
  },

  '/bus-109-vs-152-tan-son-nhat': {
    title: 'Bus 109 vs 152: Tan Son Nhat — Which to Take? (2026)',
    description: 'Compare Bus 109 vs Bus 152 from Tan Son Nhat Airport. Bus 152 is VND 5,000 (cheapest in Vietnam), Bus 109 is VND 15,000 electric. Full fare, schedule, comfort, and luggage comparison for 2026.',
    keywords: 'bus 109 vs 152 saigon, tansonnhat bus 109 vs 152, bus 109 vs 152 fare, saigon airport bus comparison',
    canonical: 'https://frylane.com/bus-109-vs-152-tan-son-nhat',
    alternateVI: 'https://frylane.com/vi/xe-buyt-109-vs-152-tan-son-nhat',
  },
  '/vi/xe-buyt-109-vs-152-tan-son-nhat': {
    title: 'So sánh xe buýt 109 và 152: Tân Sơn Nhất — Nên chọn tuyến nào? (2026)',
    description: 'So sánh xe buýt 109 và 152 từ sân bay Tân Sơn Nhất. Xe buýt 152 giá 5.000đ (rẻ nhất Việt Nam), xe buýt 109 giá 15.000đ (xe buýt điện). So sánh đầy đủ về giá, lịch trình, tiện nghi, hành lý năm 2026.',
    keywords: 'xe buýt 109 vs 152, so sánh xe buýt sân bay tân sơn nhất, xe buýt 109 152 giá nào rẻ hơn',
    canonical: 'https://frylane.com/vi/xe-buyt-109-vs-152-tan-son-nhat',
    alternateEN: 'https://frylane.com/bus-109-vs-152-tan-son-nhat',
  },
  '/grab-vs-bus-hanoi-airport': {
    title: 'Grab vs Bus 86: Hanoi Airport Cost & Time (2026)',
    description: 'Compare Grab vs Bus 86 from Noi Bai Airport. Bus 86 costs VND 50,000 (50–75 min); Grab costs VND 200,000–300,000 (35–50 min). Full comparison: price, time, comfort, and safety for 2026.',
    keywords: 'grab vs bus hanoi airport, noibai grab vs bus, grab bus airport hanoi, bus 86 vs grab noibai',
    canonical: 'https://frylane.com/grab-vs-bus-hanoi-airport',
    alternateVI: 'https://frylane.com/vi/grab-vs-xe-buyt-noi-bai',
  },
  '/vi/grab-vs-xe-buyt-noi-bai': {
    title: 'Grab vs Bus 86 Nội Bài: So sánh Chi phí & Thời gian (2026)',
    description: 'So sánh Grab vs xe buýt 86 từ sân bay Nội Bài. Xe buýt 86 giá 50.000đ (50–75 phút); Grab giá 200.000–300.000đ (35–50 phút). So sánh đầy đủ: giá, thời gian, tiện nghi, an toàn năm 2026.',
    keywords: 'grab vs xe buýt nội bài, so sánh grab xe buýt sân bay nội bài, grab xe buýt 86',
    canonical: 'https://frylane.com/vi/grab-vs-xe-buyt-noi-bai',
    alternateEN: 'https://frylane.com/grab-vs-bus-hanoi-airport',
  },
  '/airport-scam-vietnam-taxi': {
    title: 'Airport Taxi Scams in Vietnam (2026) — How to Avoid Them',
    description: 'Complete guide to avoiding taxi and ride-hail scams at Vietnam airports. Learn about common schemes, Grab safety tips, and how locals travel cheap.',
    keywords: 'airport scam vietnam, taxi scam saigon, airport taxi safety vietnam, grab safe airport hanoi',
    canonical: 'https://frylane.com/airport-scam-vietnam-taxi',
    alternateVI: 'https://frylane.com/vi/xe-lo-gio-sanh-bay-viet-nam',
  },
  '/noibai-t2-exit-time': {
    title: 'Noi Bai T2 International Exit Time: How Long to Get Out (2026)',
    description: 'Estimate your exit time from Noi Bai T2 International Airport (HAN). Calculator covers immigration, baggage claim, and walk to bus stop. Real data from Frylane.',
    keywords: 'noibai t2 exit time, how long to exit noibai airport, noibai t2 immigration time, exit noibai airport',
    canonical: 'https://frylane.com/noibai-t2-exit-time',
    alternateVI: 'https://frylane.com/vi/thoi-gian-ra-cuong-t2-noi-bai',
  },
  '/is-grab-safe-hanoi-airport': {
    title: 'Is Grab Safe at Hanoi Airport? Reddit Verdict (2026)',
    description:
      'Is Grab safe at Noi Bai Airport (HAN)? Yes. Real Reddit travelers confirm it is safe, cheaper than taxis, and trackable. Full guide with pickup tips, safety steps, and fares.',
    keywords: 'grab safe hanoi airport, noibai grab, grab airport hanoi, hanoi airport grab safe, grab vs taxi hanoi airport',
    canonical: 'https://frylane.com/is-grab-safe-hanoi-airport',
  },
  '/hanoi-airport-late-night-bus': {
    title: '8 PM at Hanoi Airport: Is the Bus Still Running? (2026)',
    description:
      'Is the bus still running at Hanoi Airport at 8 PM? Yes — Bus 86 runs until 22:15. Complete guide: last bus time, Grab options after midnight, night travel safety tips.',
    keywords: '8pm hanoi airport bus, noibai airport late night bus, last bus from noibai, hanoi airport transport after dark',
    canonical: 'https://frylane.com/hanoi-airport-late-night-bus',
  },
  '/airport-bus-luggage-fee-vietnam': {
    title: 'Vietnam Airport Bus Luggage Fees: Bus 86 / 109 / 152 (2026)',
    description:
      'All Vietnam airport buses (Bus 86, 109, 152) are free for standard carry-on luggage. Oversized bags may incur a small fee. Full comparison of luggage allowance, oversized rules, and fees for 2026.',
    keywords: 'airport bus luggage fee vietnam, bus 86 luggage, bus 109 luggage, bus 152 luggage, noibai airport bus luggage, tansonnhat airport bus luggage',
    canonical: 'https://frylane.com/airport-bus-luggage-fee-vietnam',
    alternateVI: 'https://frylane.com/vi/phi-hanh-ly-xe-buyt-san-bay',
  },
  '/cheapest-way-hanoi-airport': {
    title: 'Hanoi Airport: Bus vs Grab — Cheapest Route (2026)',
    description:
      'Compare 5 transport options from Noi Bai Airport to Hanoi city center: Bus 17 (VND 7,000), Bus 90 (VND 9,000), Bus 86 (VND 50,000), Grab (VND 200,000–300,000), and Taxi (VND 300,000–500,000). Full cost and time comparison for 2026.',
    keywords: 'cheapest way from hanoi airport, noibai cheapest transport, hanoi airport bus 17, bus 90 hanoi airport, hanoi airport grab vs bus, hanoi airport taxi cost',
    canonical: 'https://frylane.com/cheapest-way-hanoi-airport',
    alternateVI: 'https://frylane.com/vi/cach-re-nhat-san-bay-noi-bai',
  },
  '/vi/cach-re-nhat-san-bay-noi-bai': {
    title: 'Sân bay Nội Bài: Cách rẻ nhất về thành phố (2026)',
    description:
      'So sánh 5 phương tiện từ sân bay Nội Bài về trung tâm Hà Nội: xe buýt 17 (7.000đ), xe buýt 90 (9.000đ), xe buýt 86 (50.000đ), Grab (200.000–300.000đ) và taxi (300.000–500.000đ). So sánh chi phí và thời gian đầy đủ năm 2026.',
    keywords: 'cách rẻ nhất từ sân bay nội bài, xe buýt 17 nội bài, xe buýt 90 nội bài, so sánh grab xe buýt sân bay nội bài',
    canonical: 'https://frylane.com/vi/cach-re-nhat-san-bay-noi-bai',
    alternateEN: 'https://frylane.com/cheapest-way-hanoi-airport',
  },
  '/cheapest-way-saigon-airport-district-1': {
    title: 'Saigon Airport to District 1: 5 Options Ranked (2026)',
    description:
      'Compare 5 transport options from Tan Son Nhat Airport to Saigon District 1: Bus 152 (VND 5,000), Bus 109 (VND 15,000), Grab (VND 200,000–300,000), Taxi (VND 200,000–350,000), and Hotel Transfer (VND 300,000–500,000). Full cost and time comparison for 2026.',
    keywords: 'cheapest way from saigon airport district 1, tansonnhat airport bus 152, bus 109 saigon airport, saigon airport grab cost, saigon airport taxi fare',
    canonical: 'https://frylane.com/cheapest-way-saigon-airport-district-1',
    alternateVI: 'https://frylane.com/vi/cach-re-nhat-san-bay-sai-gon',
  },
  '/vi/cach-re-nhat-san-bay-sai-gon': {
    title: 'Sân bay Sài Gòn: Cách rẻ nhất về Quận 1 (2026)',
    description:
      'So sánh 5 phương tiện từ sân bay Tân Sơn Nhất về Quận 1 Sài Gòn: xe buýt 152 (5.000đ), xe buýt 109 (15.000đ), Grab (200.000–300.000đ), taxi (200.000–350.000đ) và dịch vụ đưa đón khách sạn (300.000–500.000đ). So sánh chi phí và thời gian đầy đủ năm 2026.',
    keywords: 'cách rẻ nhất từ sân bay sài gòn quận 1, xe buýt 152 tân sơn nhất, xe buýt 109 sân bay sài gòn, grab sân bay tân sơn nhất',
    canonical: 'https://frylane.com/vi/cach-re-nhat-san-bay-sai-gon',
    alternateEN: 'https://frylane.com/cheapest-way-saigon-airport-district-1',
  },
  '/hanoi-airport-to-hoan-kiem-lake': {
    title: 'Hanoi Airport to Hoan Kiem: 4 Routes (2026)',
    description:
      'Compare 4 transport options from Noi Bai Airport to Hoan Kiem Lake: Bus 86 (VND 50,000, 60–80 min), Bus 17 (VND 7,000, 55–70 min), Grab (VND 150,000–250,000, 30–45 min), and Taxi (VND 250,000–400,000, 30–40 min). Full cost and time comparison for 2026.',
    keywords: 'hanoi airport to hoan kiem lake, noibai airport transport, bus 86 hoan kiem, grab hoan kiem, hoan kiem lake transport',
    canonical: 'https://frylane.com/hanoi-airport-to-hoan-kiem-lake',
    alternateVI: 'https://frylane.com/vi/san-bay-noi-bai-den-ho-hoan-kiem',
  },
  '/vi/san-bay-noi-bai-den-ho-hoan-kiem': {
    title: 'Sân bay Nội Bài đến Hồ Hoàn Kiếm: 4 Cách đi (2026)',
    description:
      'So sánh 4 phương tiện từ sân bay Nội Bài đến Hồ Hoàn Kiếm: xe buýt 86 (50.000đ, 60–80 phút), xe buýt 17 (7.000đ, 55–70 phút), Grab (150.000–250.000đ, 30–45 phút) và taxi (250.000–400.000đ, 30–40 phút). So sánh chi phí và thời gian năm 2026.',
    keywords: 'sân bay nội bài đến hồ hoàn kiếm, xe buýt 86 hồ hoàn kiếm, grab hồ hoàn kiếm, đi lại sân bay nội bài hồ hoàn kiếm',
    canonical: 'https://frylane.com/vi/san-bay-noi-bai-den-ho-hoan-kiem',
    alternateEN: 'https://frylane.com/hanoi-airport-to-hoan-kiem-lake',
  },
  '/vi/xe-lo-gio-sanh-bay-viet-nam': {
    title: 'Xe lừa đảo tại sân bay Việt Nam — Cách phòng tránh',
    description: 'Hướng dẫn đầy đủ cách tránh lừa đảo taxi tại sân bay Nội Bài và Tân Sơn Nhất. Mẹo sử dụng Grab an toàn và so sánh giá thật.',
    keywords: 'xe lừa đảo sân bay việt nam, taxi sân bay, an toàn sân bay hà nội, an toàn sân bay sài gòn',
    canonical: 'https://frylane.com/vi/xe-lo-gio-sanh-bay-viet-nam',
    alternateEN: 'https://frylane.com/airport-scam-vietnam-taxi',
  },
  '/vi/thoi-gian-ra-cuong-t2-noi-bai': {
    title: 'Thời gian ra khỏi nhà ga T2 quốc tế Nội Bài (2026)',
    description: 'Ước tính thời gian ra khỏi nhà ga T2 sân bay Nội Bài (HAN). Công cụ tính bao gồm kiểm tra hộ chiếu, nhận hành lý và đi bộ đến điểm đón xe buýt. Dữ liệu thực từ Frylane.',
    keywords: 'thời gian ra t2 nội bài, ra khỏi sân bay nội bài bao lâu, t2 nội bài kiểm tra hộ chiếu',
    canonical: 'https://frylane.com/vi/thoi-gian-ra-cuong-t2-noi-bai',
    alternateEN: 'https://frylane.com/noibai-t2-exit-time',
  },
  '/vi/phi-hanh-ly-xe-buyt-san-bay': {
    title: 'Phí hành lý xe buýt sân bay Việt Nam: Tuyến 86 / 109 / 152 (2026)',
    description:
      'Tất cả xe buýt sân bay Việt Nam (Tuyến 86, 109, 152) đều miễn phí cho hành lý xách tay tiêu chuẩn. Vali cồng kềnh có thể bị tính phụ phí nhỏ. So sánh đầy đủ hạn mức hành lý, quy định vali lớn cho năm 2026.',
    keywords: 'phí hành lý xe buýt sân bay việt nam, hành lý xe buýt 86, xe buýt 109 hành lý, xe buýt 152 hành lý',
    canonical: 'https://frylane.com/vi/phi-hanh-ly-xe-buyt-san-bay',
    alternateEN: 'https://frylane.com/airport-bus-luggage-fee-vietnam',
  },
  '/hanoi-airport-late-night-transfer': {
    title: 'Hanoi Airport Late Night: Grab, Taxi, Hotel Transfer (2026)',
    description:
      'Arriving at Noi Bai Airport (HAN) between 22:00 and 05:00? Bus 86 has stopped. Complete guide to Grab (VND 300,000–450,000, 1.5x–2x night surcharge), Mai Linh Taxi (hotline 024 38 61 61 61), hotel pickup, and sleeping at the airport.',
    keywords: 'hanoi airport late night transfer, noibai airport midnight, night transfer noibai, grab noibai night, taxi noibai airport',
    canonical: 'https://frylane.com/hanoi-airport-late-night-transfer',
    alternateVI: 'https://frylane.com/vi/di-chuyen-dem-khuya-san-bay-noi-bai',
  },
  '/noibai-airport-first-time-guide': {
    title: 'First Time at Noi Bai Airport: Arrival Guide (2026)',
    description:
      'First time at Noi Bai Airport (HAN)? Step-by-step arrival guide: immigration, baggage claim, SIM card desk, ATM, Bus 86 stop location, Grab pickup, and taxi safety. Everything you need from wheels-down to leaving the terminal.',
    keywords: 'first time noibai airport, noibai airport arrival guide, hanoi airport first visitor, what to do at noibai airport, noibai airport immigration, noibai airport bus 86',
    canonical: 'https://frylane.com/noibai-airport-first-time-guide',
    alternateVI: 'https://frylane.com/vi/noi-bai-lan-dau-di',
  },
  '/vi/di-chuyen-dem-khuya-san-bay-noi-bai': {
    title: 'Đi lại đêm khuya từ sân bay Nội Bài: Grab, Taxi, Đưa đón khách sạn (2026)',
    description:
      'Đến sân bay Nội Bài (HAN) từ 22:00 đến 05:00? Xe buýt 86 đã dừng. Hướng dẫn đầy đủ về Grab (300.000đ–450.000đ, phụ phí ban đêm 1,5×–2×), Taxi Mai Linh (hotline 024 38 61 61 61), đưa đón khách sạn và ở lại sân bay.',
    keywords: 'đi lại đêm khuya sân bay nội bài, grab đêm nội bài, taxi đêm sân bay nội bài, di chuyển nửa đêm nội bài',
    canonical: 'https://frylane.com/vi/di-chuyen-dem-khuya-san-bay-noi-bai',
    alternateEN: 'https://frylane.com/hanoi-airport-late-night-transfer',
  },
  '/vi/noi-bai-lan-dau-di': {
    title: 'Lần đầu đến sân bay Nội Bài: Hướng dẫn sân bay (2026)',
    description:
      'Lần đầu đến sân bay Nội Bài (HAN)? Hướng dẫn đến từng bước: kiểm tra hộ chiếu, nhận hành lý, quầy SIM, ATM, điểm đón xe buýt 86, điểm đón Grab và an toàn taxi. Mọi thứ bạn cần từ lúc hạ cánh đến khi rời nhà ga.',
    keywords: 'lần đầu sân bay nội bài, hướng dẫn đến sân bay nội bài, sân bay nội bài lần đầu, làm gì ở sân bay nội bài, kiểm tra hộ chiếu nội bài, xe buýt 86 sân bay nội bài',
    canonical: 'https://frylane.com/vi/noi-bai-lan-dau-di',
    alternateEN: 'https://frylane.com/noibai-airport-first-time-guide',
  },
  '/how-to-get-from-hanoi-airport-to-city': {
    title: 'How to Get from Hanoi Airport to City Center (2026)',
    description:
      '6 transport options from Noi Bai Airport to central Hanoi compared: Bus 17 (VND 7,000), Bus 90 (VND 9,000), Bus 86 (VND 50,000), Grab (VND 200,000–300,000), Taxi (VND 300,000–500,000), and Private Transfer (VND 400,000–800,000). Full cost and time comparison with hub links to all child articles.',
    keywords: 'how to get from hanoi airport to city center, noibai airport transport, hanoi airport bus, hanoi airport grab, hanoi airport taxi, cheapest way hanoi airport',
    canonical: 'https://frylane.com/how-to-get-from-hanoi-airport-to-city',
    alternateVI: 'https://frylane.com/vi/cach-di-tu-sanh-bay-noi-bai',
  },
  '/vi/cach-di-tu-sanh-bay-noi-bai': {
    title: 'Cách đi từ Sân bay Nội Bài về Trung tâm (2026)',
    description:
      'So sánh 6 phương tiện từ sân bay Nội Bài về trung tâm Hà Nội: xe buýt 17 (7.000đ), xe buýt 90 (9.000đ), xe buýt 86 (50.000đ), Grab (200.000–300.000đ), taxi (300.000–500.000đ), xe đưa đón riêng (400.000–800.000đ). So sánh chi phí và thời gian đầy đủ.',
    keywords: 'cách đi từ sân bay nội bài về trung tâm, di chuyển sân bay nội bài, xe buýt sân bay nội bài, grab sân bay nội bài, taxi sân bay nội bài, cách rẻ nhất sân bay nội bài',
    canonical: 'https://frylane.com/vi/cach-di-tu-sanh-bay-noi-bai',
    alternateEN: 'https://frylane.com/how-to-get-from-hanoi-airport-to-city',
  },
  '/vi/grab-noi-bai-gia-bao-nhieu': {
    title: 'Grab Nội Bài giá bao nhiêu 2026? Cập nhật theo quận',
    description: 'Bảng giá Grab từ sân bay Nội Bài (HAN) về các quận trung tâm Hà Nội 2026. Giá 130.000đ–300.000đ (xe 4 chỗ), 230.000đ–400.000đ (xe 7 chỗ). Không surge, không bất ngờ.',
    keywords: 'grab nội bài giá, grab nội bài bao nhiêu, giá grab sân bay nội bài, grab từ nội bài về trung tâm, grab noi bai gia 2026',
    canonical: 'https://frylane.com/vi/grab-noi-bai-gia-bao-nhieu',
  },
  '/bus-from-airport-to-city': {
    title: 'Airport Bus to City: HAN + SGN + Da Nang Guide (2026)',
    description:
      'Complete guide to airport buses from all 3 major Vietnam airports to city center. Compare routes, fares, and travel times: Hanoi (Noi Bai / HAN), Saigon (Tan Son Nhat / SGN), and Da Nang. Buses from VND 5,000 to VND 50,000.',
    keywords: 'airport bus to city center, bus from airport to city, vietnam airport bus, noibai airport bus, tansonnhat airport bus, danang airport bus, bus 86 hanoi, bus 109 saigon, bus 152 saigon',
    canonical: 'https://frylane.com/bus-from-airport-to-city',
    alternateVI: 'https://frylane.com/vi/xe-buyt-san-bay-ve-trung-tam',
  },
  '/vi/xe-buyt-san-bay-ve-trung-tam': {
    title: 'Xe buýt sân bay về trung tâm: Hà Nội + Sài Gòn + Đà Nẵng (2026)',
    description:
      'Hướng dẫn đầy đủ xe buýt sân bay từ cả 3 sân bay lớn của Việt Nam về trung tâm. So sánh lộ trình, giá vé và thời gian: Hà Nội (Nội Bài / HAN), Sài Gòn (Tân Sơn Nhất / SGN) và Đà Nẵng. Xe buýt từ 5.000đ đến 50.000đ.',
    keywords: 'xe buýt sân bay về trung tâm, xe buýt sân bay việt nam, xe buýt nội bài, xe buýt tân sơn nhất, xe buýt đà nẵng, tuyến 86, tuyến 109, tuyến 152',
    canonical: 'https://frylane.com/vi/xe-buyt-san-bay-ve-trung-tam',
    alternateEN: 'https://frylane.com/bus-from-airport-to-city',
  },
  '/privacy': {
    title: 'Privacy Policy — Frylane',
    description: 'Frylane privacy policy. We do not collect personal data. No cookies, no tracking.',
    canonical: 'https://frylane.com/privacy',
  },
  '/terms': {
    title: 'Terms of Service — Frylane',
    description: 'Frylane terms of service. Free to use. No warranty.',
    canonical: 'https://frylane.com/terms',
  },
  '/guides': {
    title: 'Vietnam Airport Bus Guides — All Routes Compared (2026)',
    description: 'Browse every Frylane airport bus guide: Hanoi (Noi Bai), Saigon (Tan Son Nhat), and cross-cutting tips. Compare fares, schedules, and routes.',
    subtitle: 'All Frylane guides on airport buses and Grab — grouped by city.',
    keywords: 'vietnam airport bus guides, frylane guides, airport bus articles',
    canonical: 'https://frylane.com/guides',
    alternateVI: 'https://frylane.com/vi/guides',
  },
  '/vi/guides': {
    title: 'Hướng dẫn xe buýt sân bay Việt Nam — So sánh mọi tuyến (2026)',
    description: 'Tổng hợp mọi hướng dẫn xe buýt sân bay từ Frylane: Hà Nội (Nội Bài), TP.HCM (Tân Sơn Nhất) và mẹo chung. So sánh giá, lịch trình và lộ trình.',
    subtitle: 'Tất cả hướng dẫn Frylane về xe buýt và Grab từ sân bay — sắp xếp theo thành phố.',
    keywords: 'hướng dẫn xe buýt sân bay, bài viết frylane, hướng dẫn sân bay việt nam',
    canonical: 'https://frylane.com/vi/guides',
    alternateEN: 'https://frylane.com/guides',
  },
};

export const DEFAULT_META: MetaConfig = {
  title: 'Frylane — Airport Bus & Grab Comparison',
  description: 'Compare airport buses and Grab from Hanoi & Saigon airports to city center.',
  canonical: 'https://frylane.com/',
};
