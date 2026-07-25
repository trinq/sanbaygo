import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface Translations {
  header: {
    title: string;
    languageToggle: string;
  };
  form: {
    title: string;
    arrivalTime: string;
    terminal: string;
    baggage: string;
    destination: string;
    calculate: string;
    t1: string;
    t2: string;
    carryOn: string;
    checked: string;
    stepEyebrow: string;
    lede: string;
    fromLabel: string;
    toLabel: string;
    selectDestination: string;
    destinationOldQuarter: string;
    destinationBaDinh: string;
    destinationTayHo: string;
    peopleLabel: string;
    baggageLabel: string;
    baggageCarryOn: string;
    baggageChecked: string;
    t1Label: string;
    t1Sub: string;
    t2Label: string;
    t2Sub: string;
  };
  results: {
    title: string;
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
    noBus: string;
    lastBusAt: string;
    needToArriveBy: string;
    recalculate: string;
  };
  destinations: {
    [key: string]: string;
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
      arrivalTime: 'Giờ đáp cánh',
      terminal: 'Chọn nhà ga',
      baggage: 'Hành lý',
      destination: 'Điểm đến',
      calculate: 'Tìm phương tiện phù hợp →',
      t1: 'Nhà ga T1 (Nội địa)',
      t2: 'Nhà ga T2 (Quốc tế)',
      carryOn: 'Xách tay',
      checked: 'Ký gửi',
      stepEyebrow: 'Bước 1 — Lên kế hoạch',
      lede: 'Chúng tôi so sánh Xe buýt 86, Taxi và Grab theo giá, thời gian và hành lý — rồi gợi ý lựa chọn phù hợp nhất.',
      fromLabel: 'Sân bay khởi hành',
      toLabel: 'Điểm đến',
      selectDestination: 'Chọn điểm đến',
      destinationOldQuarter: 'Hoàn Kiếm · Phố Cổ',
      destinationBaDinh: 'Ba Đình',
      destinationTayHo: 'Tây Hồ',
      peopleLabel: 'Số người',
      baggageLabel: 'Hành lý',
      baggageCarryOn: 'Xách tay',
      baggageChecked: 'Ký gửi',
      t1Label: 'Nội Bài · T1',
      t1Sub: 'Quốc tế',
      t2Label: 'Nội Bài · T2',
      t2Sub: 'Quốc nội',
    },
    results: {
      title: 'Kết quả',
      basedOn: 'Dựa trên giờ đáp',
      peakHour: 'giờ cao điểm',
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
      noBus: 'Không có chuyến xe phù hợp',
      lastBusAt: 'Chuyến cuối khởi hành lúc',
      needToArriveBy: 'Bạn cần đến điểm đón trước',
      recalculate: 'Tính lại',
    },
    destinations: {
      'old-quarter': 'Khu phố cổ',
      'hoan-kiem': 'Quận Hoàn Kiếm',
      'dong-da': 'Quận Đống Đa',
      'ba-dinh': 'Quận Ba Đình',
      'cau-giay': 'Quận Cầu Giấy',
      'other': 'Khu vực khác',
    },
  },
  en: {
    header: {
      title: 'SanBayGo',
      languageToggle: 'Tiếng Việt',
    },
    form: {
      title: 'Where are you flying from, and where to?',
      arrivalTime: 'Arrival Time',
      terminal: 'Select Terminal',
      baggage: 'Luggage',
      destination: 'Destination',
      calculate: 'Find a ride →',
      t1: 'Terminal T1 (Domestic)',
      t2: 'Terminal T2 (International)',
      carryOn: 'Carry-on',
      checked: 'Checked',
      stepEyebrow: 'Step 1 — Plan your trip',
      lede: 'We compare Bus 86, Taxi, and Grab by price, time, and luggage — then suggest the best fit.',
      fromLabel: 'Departure airport',
      toLabel: 'Destination',
      selectDestination: 'Select destination',
      destinationOldQuarter: 'Hoan Kiem · Old Quarter',
      destinationBaDinh: 'Ba Dinh',
      destinationTayHo: 'Tay Ho',
      peopleLabel: 'People',
      baggageLabel: 'Luggage',
      baggageCarryOn: 'Carry-on',
      baggageChecked: 'Checked',
      t1Label: 'Noi Bai · T1',
      t1Sub: 'International',
      t2Label: 'Noi Bai · T2',
      t2Sub: 'Domestic',
    },
    results: {
      title: 'Results',
      basedOn: 'Based on arrival at',
      peakHour: 'peak hours',
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
      noBus: 'No suitable bus available',
      lastBusAt: 'Last bus departs at',
      needToArriveBy: 'You need to arrive by',
      recalculate: 'Recalculate',
    },
    destinations: {
      'old-quarter': 'Old Quarter',
      'hoan-kiem': 'Hoan Kiem District',
      'dong-da': 'Dong Da District',
      'ba-dinh': 'Ba Dinh District',
      'cau-giay': 'Cau Giay District',
      'other': 'Other areas',
    },
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

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
