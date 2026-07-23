/**
 * Vietnamese strings for the result screen.
 *
 * Rule (AGENTS.md): all user-facing text must be Vietnamese.
 * Web keeps using its existing vi/en LanguageContext; this table is the
 * canonical Vietnamese source for both surfaces.
 */
export const resultCopyVi = {
  header: {
    title: 'Kết quả',
    basedOn: 'Dựa trên giờ đáp',
    peakSuffix: '(giờ cao điểm)',
  },
  bus: {
    title: 'Xe buýt 86',
    recommendedBadge: '✓ ĐỀ XUẤT',
    departure: 'Giờ xe khởi hành:',
    wait: 'Thời gian chờ:',
    arrival: 'Thời gian đến nơi:',
    price: 'Giá vé:',
    waitMinutesUnit: '~{n} phút',
    unavailable: {
      no_service: 'Xe buýt chưa bắt đầu hoạt động.\nGiờ hoạt động: 06:40 - 22:15',
      too_late: 'Xe buýt đã kết thúc chuyến cuối.\nGiờ hoạt động: 06:40 - 22:15',
      missed_last: 'Bạn không kịp chuyến cuối của ngày.\nVui lòng cân nhắc Grab.',
    },
  },
  direction: {
    title: 'Hướng dẫn',
  },
  grab: {
    title: 'Grab (tham khảo)',
    price: 'Giá ước tính:',
    travelTime: 'Thời gian di chuyển:',
    peakSuffix: '(giờ cao điểm)',
    peakWarning: '⚠️ Giờ cao điểm, thời gian có thể lâu hơn bình thường',
    disclaimer: '* Giá và thời gian chỉ mang tính tham khảo',
  },
  comparison: {
    title: 'So sánh phương tiện',
    peakBadge: 'Giờ cao điểm',
    sort: {
      recommended: 'Đề xuất',
      cheapest: 'Giá rẻ nhất',
      fastest: 'Nhanh nhất',
    },
    card: {
      recommendedBadge: 'Đề xuất',
      estimateTag: 'ước tính',
      waitLabel: 'Chờ xe:',
      waitMinutesUnit: '{n} phút',
      arrivalLabel: 'Đến nơi:',
      luggageLabel: 'Hành lý',
      comfortLabel: 'Thoải mái',
      eco: '🌿 Thân thiện môi trường',
    },
  },
  actions: {
    back: '← Sửa lại',
    recalculate: 'Tính lại',
  },
} as const;

export type ResultCopyVi = typeof resultCopyVi;
