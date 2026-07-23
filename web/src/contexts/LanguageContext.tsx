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
    recommended: string;
    peakWarning: string;
    grabEstimate: string;
    comparisonTitle: string;
    sortRecommended: string;
    sortCheapest: string;
    sortFastest: string;
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
      title: 'Nhập thông tin chuyến bay',
      arrivalTime: 'Giờ đáp cánh',
      terminal: 'Chọn nhà ga',
      baggage: 'Hành lý',
      destination: 'Điểm đến',
      calculate: 'Tính toán',
      t1: 'Nhà ga T1 (Nội địa)',
      t2: 'Nhà ga T2 (Quốc tế)',
      carryOn: 'Xách tay',
      checked: 'Ký gửi',
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
      recommended: 'ĐỀ XUẤT',
      peakWarning: '⚠️ Giờ cao điểm, thời gian có thể lâu hơn bình thường',
      grabEstimate: 'ước tính',
      comparisonTitle: 'So sánh phương tiện',
      sortRecommended: 'Đề xuất',
      sortCheapest: 'Giá rẻ nhất',
      sortFastest: 'Nhanh nhất',
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
      title: 'Enter flight information',
      arrivalTime: 'Arrival Time',
      terminal: 'Select Terminal',
      baggage: 'Luggage',
      destination: 'Destination',
      calculate: 'Calculate',
      t1: 'Terminal T1 (Domestic)',
      t2: 'Terminal T2 (International)',
      carryOn: 'Carry-on',
      checked: 'Checked',
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
      recommended: 'RECOMMENDED',
      peakWarning: '⚠️ Peak hours, travel time may be longer than usual',
      grabEstimate: 'estimate',
      comparisonTitle: 'Transport Comparison',
      sortRecommended: 'Recommended',
      sortCheapest: 'Cheapest',
      sortFastest: 'Fastest',
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
