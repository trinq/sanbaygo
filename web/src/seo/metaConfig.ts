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
};

export const DEFAULT_META: MetaConfig = {
  title: 'Frylane — Airport Bus & Grab Comparison',
  description: 'Compare airport buses and Grab from Hanoi & Saigon airports to city center.',
  canonical: 'https://frylane.com/',
};
