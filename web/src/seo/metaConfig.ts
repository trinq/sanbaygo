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
  '/airport-scam-vietnam-taxi': {
    title: 'Airport Taxi Scams in Vietnam (2026) — How to Avoid Them',
    description: 'Complete guide to avoiding taxi and ride-hail scams at Vietnam airports. Learn about common schemes, Grab safety tips, and how locals travel cheap.',
    keywords: 'airport scam vietnam, taxi scam saigon, airport taxi safety vietnam, grab safe airport hanoi',
    canonical: 'https://frylane.com/airport-scam-vietnam-taxi',
    alternateVI: 'https://frylane.com/vi/xe-lo-gio-sanh-bay-viet-nam',
  },
  '/vi/xe-lo-gio-sanh-bay-viet-nam': {
    title: 'Xe lừa đảo tại sân bay Việt Nam — Cách phòng tránh',
    description: 'Hướng dẫn đầy đủ cách tránh lừa đảo taxi tại sân bay Nội Bài và Tân Sơn Nhất. Mẹo sử dụng Grab an toàn và so sánh giá thật.',
    keywords: 'xe lừa đảo sân bay việt nam, taxi sân bay, an toàn sân bay hà nội, an toàn sân bay sài gòn',
    canonical: 'https://frylane.com/vi/xe-lo-gio-sanh-bay-viet-nam',
    alternateEN: 'https://frylane.com/airport-scam-vietnam-taxi',
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
