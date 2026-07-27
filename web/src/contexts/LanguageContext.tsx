import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface Translations {
  header: {
    title: string;
    languageToggle: string;
  };
  form: {
    title: string;
    lede: string;
    eyebrow: string;
    arrivalTimeLabel: string;
    arrivalTimeHint: string;
    terminalLabel: string;
    destinationLabel: string;
    baggageLabel: string;
    calculate: string;
    t1Label: string;
    t1Sub: string;
    t2Label: string;
    t2Sub: string;
    carryOn: string;
    checked: string;
    selectDestination: string;
    destinationOldQuarter: string;
    destinationBaDinh: string;
    destinationTayHo: string;
  };
  results: {
    title: string;
    tripIssue: string;
    nextBus: string;
    missedLastBus: string;
    callRide: string;
    rideHailProviders: string;
    rideHailPrice: string;
    rideHailPickupLocation: string;
    basedOn: string;
    peakHour: string;
    busRecommendation: string;
    catchable: string;
    departAt: string;
    waitMinutes: string;
    ticketPrice: string;
    journey: string;
    exitTerminal: string;
    walkToStop: string;
    busDeparts: string;
    arrive: string;
    grabFallback: string;
    priceEstimate: string;
    travelTime: string;
    openGrab: string;
    edit: string;
    from: string;
    to: string;
    peopleCount: string;
    baggageCarryOn: string;
    baggageChecked: string;
    timelineTitle: string;
    timelineExit: string;
    timelineExitSub: string;
    timelineWalk: string;
    timelineWalkSub: string;
    timelineBoard: string;
    timelineBoardSub: string;
    timelineArrive: string;
    timelineArriveSub: string;
    comparisonTitle: string;
    recommended: string;
    min: string;
    time: string;
    convenience: string;
    luggage: string;
    actionBus: string;
    actionTaxi: string;
    actionGrab: string;
    tableHeaders: string[];
    noBus: string;
    lastBusAt: string;
    needToArriveBy: string;
    busTooLate: string;
    busNoService: string;
    busMissedLast: string;
    disclaimer: string;
    recalculate: string;
    sortLabel: string;
    sortRecommended: string;
    sortCheapest: string;
    sortFastest: string;
    // Spine (signature element)
    spineEyebrow: string;
    spineTitle: string;
    spineCatchable: string;
    spineMissed: string;
    spineNext: string;
    spineLast: string;
    railTitle: string;
    railSubtitle: string;
    railFootnote: string;
    rideHailTitle: string;
    rideHailSubtitle: string;
    routeMap: string;
    outbound: string;
    return: string;
    tapToExpandRoute: string;
  };
  destinations: {
    [key: string]: string;
  };
  layout: {
    brand: string;
    sidebar: {
      search: string;
      sectionPlan: string;
      sectionReference: string;
      navCompare: string;
      navFavorites: string;
      navHistory: string;
      navBusPricing: string;
      navPeakHours: string;
    };
    topBar: {
      title: string;
      menuLabel: string;
    };
    tabletTopBar: {
      tabCompare: string;
      tabHistory: string;
      tabReference: string;
    };
    languageToggle: string;
  };
  landing: {
    pill: string;
    headline: string;
    subtitle: string;
    benefitFast: string;
    benefitFastDesc: string;
    benefitSafe: string;
    benefitSafeDesc: string;
    benefitCheap: string;
    benefitCheapDesc: string;
    fieldDeparture: string;
    departurePlaceholder: string;
    fieldAirport: string;
    airportPlaceholder: string;
    fieldTerminal: string;
    terminalPlaceholder: string;
    fieldDestination: string;
    fieldPeople: string;
    fieldLuggage: string;
    fieldCarryOn: string;
    fieldChecked: string;
    cta: string;
    ctaShort: string;
    socialProof: string;
    tagline: string;
    footer: string;
    assumption: string;
    legalTerms: string;
    legalPrivacy: string;
    legalSupport: string;
    navBrand: string;
    navBrandAccent: string;
  };
}

const translations: Record<Language, Translations> = {
  vi: {
    header: {
      title: 'SanBayGo',
      languageToggle: 'English',
    },
    form: {
      title: 'Bạn bay từ đâu, đi đâu?',
      lede: 'Chúng tôi so sánh Xe buýt 86, Taxi và Grab theo giá, thời gian và hành lý — rồi gợi ý lựa chọn phù hợp nhất.',
      eyebrow: 'Bước 1 — Lên kế hoạch',
      arrivalTimeLabel: 'Giờ đáp cánh',
      arrivalTimeHint: 'Thời gian máy bay chạm bánh',
      terminalLabel: 'Sân bay khởi hành',
      destinationLabel: 'Điểm đến',
      baggageLabel: 'Hành lý',
      calculate: 'Tìm phương tiện phù hợp →',
      t1Label: 'Nội Bài · T1',
      t1Sub: 'Quốc tế',
      t2Label: 'Nội Bài · T2',
      t2Sub: 'Quốc nội',
      carryOn: 'Xách tay',
      checked: 'Ký gửi',
      selectDestination: 'Chọn điểm đến',
      destinationOldQuarter: 'Hoàn Kiếm · Phố Cổ',
      destinationBaDinh: 'Ba Đình',
      destinationTayHo: 'Tây Hồ',
    },
    results: {
      title: 'Kết quả',
      tripIssue: 'Số 02 — Chuyến đi',
      nextBus: 'Chuyến buýt kế tiếp:',
      missedLastBus: 'Đã lỡ chuyến cuối.',
      callRide: 'Gọi xe thôi.',
      rideHailProviders: 'Grab · Taxi',
      rideHailPrice: '~250–350k VND',
      rideHailPickupLocation: 'Cột số 4 · Tầng 1 nhà ga đến',
      basedOn: 'Dựa trên giờ đáp',
      busRecommendation: 'Xe buýt phù hợp',
      catchable: 'Có thể bắt được',
      departAt: 'Khởi hành lúc',
      waitMinutes: 'Chờ',
      ticketPrice: 'Giá vé',
      journey: 'Lộ trình của bạn',
      exitTerminal: 'Ra terminal',
      walkToStop: 'Đi bộ đến điểm đón',
      busDeparts: 'Xe 86 khởi hành',
      arrive: 'Đến nơi',
      grabFallback: 'Thay thế Grab',
      priceEstimate: 'Ước tính giá',
      travelTime: 'Thời gian di chuyển',
      openGrab: 'Mở Grab',
      edit: '← Sửa lại',
      from: 'Nội Bài',
      to: 'Hoàn Kiếm',
      peopleCount: '{n} người',
      baggageCarryOn: 'Hành lý xách tay',
      baggageChecked: 'Hành lý ký gửi',
      peakHour: 'Giờ cao điểm',
      timelineTitle: 'Hành trình của bạn',
      timelineExit: 'Ra cửa nhà ga',
      timelineExitSub: 'Đi bộ 5 phút',
      timelineWalk: 'Đến điểm đón xe buýt',
      timelineWalkSub: 'Nhà ga',
      timelineBoard: 'Xe buýt khởi hành',
      timelineBoardSub: 'Tuyến 86',
      timelineArrive: 'Đến điểm dừng',
      timelineArriveSub: 'Phố Cổ',
      comparisonTitle: 'So sánh phương tiện',
      recommended: 'Khuyến nghị',
      min: 'phút',
      time: 'Thời gian',
      convenience: 'Tiện lợi',
      luggage: 'Hành lý',
      actionBus: 'Chọn xe buýt →',
      actionTaxi: 'Gọi Taxi →',
      actionGrab: 'Mở Grab →',
      tableHeaders: ['Phương tiện', 'Giá ước tính', 'Thời gian', 'Tiện lợi', 'Hành lý', ''],
      noBus: 'Không có chuyến xe buýt',
      lastBusAt: 'Chuyến cuối lúc',
      needToArriveBy: 'Cần đến sân bay trước',
      busTooLate: 'Đã hết giờ hoạt động',
      busNoService: 'Chưa đến giờ xe buýt chạy',
      busMissedLast: 'Đã lỡ chuyến cuối',
      disclaimer: 'Giá và thời gian mang tính tham khảo.',
      recalculate: 'Tính lại chuyến khác',
      sortLabel: 'Sắp xếp theo',
      sortRecommended: 'Khuyến nghị',
      sortCheapest: 'Rẻ nhất',
      sortFastest: 'Nhanh nhất',
      spineEyebrow: 'Tuyến 86 — hôm nay',
      spineTitle: 'Bạn kịp chuyến nào?',
      spineCatchable: 'Còn kịp',
      spineMissed: 'Đã lỡ',
      spineNext: 'Chuyến kế tiếp',
      spineLast: 'Chuyến cuối',
      railTitle: 'So sánh phương tiện',
      railSubtitle: 'Giá và thời gian ước tính',
      railFootnote: 'Hoặc gọi xe — nếu hành lý nhiều hoặc trễ chuyến.',
      rideHailTitle: 'Hoặc gọi xe',
      rideHailSubtitle: 'Khi hành lý nhiều, trễ chuyến, hoặc đi từ 3 người.',
      routeMap: 'Bản đồ tuyến xe buýt',
      outbound: 'Hướng đi',
      return: 'Hướng về',
      tapToExpandRoute: 'Nhấn để xem lộ trình',
    },
    destinations: {
      'old-quarter': 'Khu phố cổ',
      'hoan-kiem': 'Quận Hoàn Kiếm',
      'dong-da': 'Quận Đống Đa',
      'ba-dinh': 'Quận Ba Đình',
      'cau-giay': 'Quận Cầu Giấy',
      'other': 'Khu vực khác',
    },
    layout: {
      brand: 'SanBayGo',
      sidebar: {
        search: 'Tìm chuyến gần đây',
        sectionPlan: 'PLAN',
        sectionReference: 'REFERENCE',
        navCompare: 'So sánh',
        navFavorites: 'Tuyến thường dùng',
        navHistory: 'Lịch sử',
        navBusPricing: 'Bảng giá Bus 86',
        navPeakHours: 'Giờ cao điểm',
      },
      topBar: {
        title: 'SanBayGo',
        menuLabel: 'menu',
      },
      tabletTopBar: {
        tabCompare: 'So sánh',
        tabHistory: 'Lịch sử',
        tabReference: 'Tham khảo',
      },
      languageToggle: 'English',
    },
    landing: {
      pill: 'Dịch vụ xe đưa đón sân bay',
      headline: 'Cách nhanh nhất từ sân bay về trung tâm.',
      subtitle:
        'So sánh xe buýt, Grab, taxi trong 5 giây. Không cần tải app, không cần đăng ký.',
      benefitFast: 'Nhanh nhất',
      benefitFastDesc: 'Lịch trình 26 chuyến/ngày',
      benefitSafe: 'An toàn',
      benefitSafeDesc: 'Tài xế xác minh, giá công khai',
      benefitCheap: 'Tiết kiệm',
      benefitCheapDesc: 'Chỉ 50.000đ cho xe buýt',
      fieldDeparture: 'Sân bay khởi hành',
      departurePlaceholder: 'Chọn sân bay',
      fieldAirport: 'Sân bay',
      airportPlaceholder: 'Chọn',
      fieldTerminal: 'Nhà ga',
      terminalPlaceholder: 'Chọn nhà ga',
      fieldDestination: 'Bạn muốn đi đâu?',
      fieldPeople: 'Số người',
      fieldLuggage: 'Hành lý',
      fieldCarryOn: 'Hành lý xách tay',
      fieldChecked: 'Hành lý ký gửi',
      cta: 'Tìm phương tiện',
      ctaShort: 'Đặt nhanh',
      socialProof: '4.9 điểm từ 12.000+ hành khách',
      tagline: 'Cách đơn giản nhất để di chuyển từ sân bay về trung tâm.',
      footer: '© 2026 SanBayGo · Sản phẩm của Trinq',
      assumption: 'Đang giả định nhà ga T1 + hành lý xách tay — chi tiết hơn sau.',
      legalTerms: 'Điều khoản',
      legalPrivacy: 'Bảo mật',
      legalSupport: 'Hỗ trợ',
      navBrand: 'SanBayGo',
      navBrandAccent: 'Go',
    },
  },
  en: {
    header: {
      title: 'SanBayGo',
      languageToggle: 'Tiếng Việt',
    },
    form: {
      title: 'Where are you flying from, and where to?',
      lede: 'We compare Bus 86, Taxi, and Grab by price, time, and luggage — then suggest the best fit.',
      eyebrow: 'Step 1 — Plan your trip',
      arrivalTimeLabel: 'Arrival time',
      arrivalTimeHint: 'When the plane touches down',
      terminalLabel: 'Departure airport',
      destinationLabel: 'Destination',
      baggageLabel: 'Luggage',
      calculate: 'Find a ride →',
      t1Label: 'Noi Bai · T1',
      t1Sub: 'International',
      t2Label: 'Noi Bai · T2',
      t2Sub: 'Domestic',
      carryOn: 'Carry-on',
      checked: 'Checked',
      selectDestination: 'Select destination',
      destinationOldQuarter: 'Hoan Kiem · Old Quarter',
      destinationBaDinh: 'Ba Dinh',
      destinationTayHo: 'Tay Ho',
    },
    results: {
      title: 'Results',
      tripIssue: 'Issue 02 — Trip',
      nextBus: 'Next bus:',
      missedLastBus: 'You missed the last bus.',
      callRide: 'Call a ride.',
      rideHailProviders: 'Grab · Taxi',
      rideHailPrice: '~VND 250–350k',
      rideHailPickupLocation: 'Pillar 4 · Arrivals level 1',
      basedOn: 'Based on arrival at',
      busRecommendation: 'Recommended Bus',
      catchable: 'Catchable',
      departAt: 'Departs at',
      waitMinutes: 'Wait',
      ticketPrice: 'Ticket',
      journey: 'Your Journey',
      exitTerminal: 'Exit terminal',
      walkToStop: 'Walk to bus stop',
      busDeparts: 'Bus 86 departs',
      arrive: 'Arrive',
      grabFallback: 'Grab Alternative',
      priceEstimate: 'Price estimate',
      travelTime: 'Travel time',
      openGrab: 'Open Grab',
      edit: '← Edit',
      from: 'Noi Bai',
      to: 'Hoan Kiem',
      peopleCount: '{n} people',
      baggageCarryOn: 'Carry-on luggage',
      baggageChecked: 'Checked luggage',
      peakHour: 'Peak hours',
      timelineTitle: 'Your journey',
      timelineExit: 'Exit terminal',
      timelineExitSub: '5 min walk',
      timelineWalk: 'Walk to bus stop',
      timelineWalkSub: 'Terminal',
      timelineBoard: 'Bus departs',
      timelineBoardSub: 'Route 86',
      timelineArrive: 'Arrive at stop',
      timelineArriveSub: 'Old Quarter',
      comparisonTitle: 'Compare transport',
      recommended: 'Recommended',
      min: 'min',
      time: 'Time',
      convenience: 'Convenience',
      luggage: 'Luggage',
      actionBus: 'Choose bus →',
      actionTaxi: 'Call taxi →',
      actionGrab: 'Open Grab →',
      tableHeaders: ['Transport', 'Est. price', 'Time', 'Convenience', 'Luggage', ''],
      noBus: 'No bus available',
      lastBusAt: 'Last bus at',
      needToArriveBy: 'You need to arrive by',
      busTooLate: 'Bus service has ended for the day',
      busNoService: 'Bus service has not started yet',
      busMissedLast: 'You missed the last bus',
      disclaimer: 'Prices and times are estimates only.',
      recalculate: 'Recalculate',
      sortLabel: 'Sort by',
      sortRecommended: 'Recommended',
      sortCheapest: 'Cheapest',
      sortFastest: 'Fastest',
      spineEyebrow: 'Route 86 — today',
      spineTitle: 'Which bus can you catch?',
      spineCatchable: 'Catchable',
      spineMissed: 'Missed',
      spineNext: 'Next departure',
      spineLast: 'Last bus',
      railTitle: 'Compare transport',
      railSubtitle: 'Estimated prices and travel time',
      railFootnote: 'Or ride-hail — for extra luggage, missed buses, or 3+ people.',
      rideHailTitle: 'Or ride-hail',
      rideHailSubtitle: 'For extra luggage, a missed bus, or 3+ people.',
      routeMap: 'Bus Route Map',
      outbound: 'Outbound',
      return: 'Return',
      tapToExpandRoute: 'Tap to view route',
    },
    destinations: {
      'old-quarter': 'Old Quarter',
      'hoan-kiem': 'Hoan Kiem District',
      'dong-da': 'Dong Da District',
      'ba-dinh': 'Ba Dinh District',
      'cau-giay': 'Cau Giay District',
      'other': 'Other areas',
    },
    layout: {
      brand: 'SanBayGo',
      sidebar: {
        search: 'Find recent trip',
        sectionPlan: 'PLAN',
        sectionReference: 'REFERENCE',
        navCompare: 'Compare',
        navFavorites: 'Favorite routes',
        navHistory: 'History',
        navBusPricing: 'Bus 86 pricing',
        navPeakHours: 'Peak hours',
      },
      topBar: {
        title: 'SanBayGo',
        menuLabel: 'menu',
      },
      tabletTopBar: {
        tabCompare: 'Compare',
        tabHistory: 'History',
        tabReference: 'Reference',
      },
      languageToggle: 'Tiếng Việt',
    },
    landing: {
      pill: 'Airport transfer service',
      headline: 'The fastest way from the airport to the city.',
      subtitle:
        'Compare bus, Grab, and taxi in 5 seconds. No app to install, no account to create.',
      benefitFast: 'Fastest',
      benefitFastDesc: '26 daily departures',
      benefitSafe: 'Safe',
      benefitSafeDesc: 'Verified drivers, transparent pricing',
      benefitCheap: 'Affordable',
      benefitCheapDesc: 'Only 50,000 VND by bus',
      fieldDeparture: 'Departure airport',
      departurePlaceholder: 'Choose airport',
      fieldAirport: 'Airport',
      airportPlaceholder: 'Choose',
      fieldTerminal: 'Terminal',
      terminalPlaceholder: 'Choose terminal',
      fieldDestination: 'Where are you going?',
      fieldPeople: 'People',
      fieldLuggage: 'Luggage',
      fieldCarryOn: 'Carry-on',
      fieldChecked: 'Checked',
      cta: 'Find a ride',
      ctaShort: 'Book now',
      socialProof: '4.9 rating from 12,000+ travelers',
      tagline: 'The simplest way from the airport to the city center.',
      footer: '© 2026 SanBayGo · Built by Trinq',
      assumption: 'Assuming Terminal T1 + carry-on luggage — more details later.',
      legalTerms: 'Terms',
      legalPrivacy: 'Privacy',
      legalSupport: 'Support',
      navBrand: 'SanBay',
      navBrandAccent: 'Go',
    },
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
export { LanguageContext };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const value: LanguageContextValue = {
    language,
    setLanguage: (lang: Language) => setLanguage(lang),
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
