# SanBayGo MVP - Specification

## Problem Statement

Hành khách đáp máy bay xuống sân bay Nội Bài gặp khó khăn khi:
- Không biết chuyến xe buýt 86 tiếp theo là lúc mấy giờ
- Không biết mình có kịp bắt được xe buýt không
- Không biết nên đi Grab hay đợi xe buýt
- Không biết thời gian di chuyển là bao lâu (kẹt xe hay không)

Mục tiêu: Giúp hành khách nắm rõ lịch trình và đưa ra quyết định nhanh chóng, ưu tiên xe buýt sân bay.

---

## Solution

App đơn giản với 4 bước nhập liệu:
1. Nhập giờ máy bay đáp
2. Chọn nhà ga (T1/T2)
3. Chọn loại hành lý
4. Chọn điểm đến

→ System tự động tính toán và hiển thị:
- Chuyến xe buýt 86 gần nhất có thể bắt được
- Thời gian di chuyển ước tính (range)
- Hướng dẫn ngắn gọn đến điểm đón
- Grab như fallback (giá tham khảo)

---

## User Stories

### Core Features

1. As a arriving passenger, I want to input my actual arrival time, so that the system can calculate which bus trips I can catch

2. As a arriving passenger, I want to select my terminal (T1/T2), so that the system can estimate my exit time accurately

3. As a arriving passenger, I want to indicate if I have checked baggage, so that the exit time estimate reflects my real situation

4. As a arriving passenger, I want to select my destination point, so that I get relevant travel time estimates

5. As a arriving passenger, I want to see the nearest catchable bus trip, so that I know exactly when to head to the pickup point

6. As a arriving passenger, I want to see a time range for arrival, so that I can plan my onward journey

7. As a arriving passenger, I want to see Grab as a fallback option, so that I can compare with bus

8. As a arriving passenger, I want to see short directions to the bus pickup point, so that I don't get lost

### Peak Hour Handling

9. As a arriving passenger landing during rush hour (7-9 AM, 5-7 PM), I want the system to show longer travel time estimates, so that I'm not surprised by delays

10. As a arriving passenger, I want the system to automatically detect peak hours, so that I don't have to manually adjust

### Edge Cases

11. As a arriving passenger landing too late (after last bus), I want to be clearly told that bus is not available, so that I can immediately consider alternatives

12. As a arriving passenger landing outside bus operating hours (before 6:40 or after 22:15), I want to be clearly told the bus is not running, so that I can consider alternatives

13. As a arriving passenger who just missed a bus, I want to see the next available trip, so that I can decide whether to wait or take Grab

14. As a arriving passenger with international flight, I want the system to account for immigration time, so that my catchable trip estimate is realistic

### UX/UI

15. As a arriving passenger, I want to see the current time as default input, so that I can quickly adjust if needed

16. As a arriving passenger, I want to see validation errors inline, so that I know what to fix before submitting

17. As a arriving passenger, I want a clear visual distinction between bus recommendation and Grab reference, so that I understand which is the recommended option

18. As a arriving passenger, I want to go back and change my inputs, so that I can recalculate if I made a mistake

### Future Expansion (Not MVP)

19. As a arriving passenger at other airports, I want to select my airport, so that I can get relevant bus information for that airport

20. As a arriving passenger, I want to see real-time bus tracking, so that I know exactly when the bus will arrive

21. As a arriving passenger, I want to book a Grab directly from the app, so that I don't have to switch apps

---

## Implementation Decisions

### Technology Stack

- **Framework**: React Native (iOS/Android) hoặc Flutter
- **Language**: TypeScript
- **State Management**: React hooks (useState, useReducer) cho form state
- **No backend required**: All calculations done client-side

### Data Model

```
Airport {
  id: string
  name: string
  terminals: Terminal[]
  busRoutes: BusRoute[]
  grabEstimates: GrabEstimate[]
}

Terminal {
  id: string
  name: string
  type: 'domestic' | 'international'
  pickupPoint: PickupPoint
  exitTimeEstimates: ExitTimeEstimate[]
}

BusRoute {
  id: string
  routeNumber: string
  stops: BusStop[]
  schedule: DepartureTime[]
  ticketPrice: number
  operatingHours: { start: string, end: string }
  travelTime: { normal: number, peak: number }
}

DestinationPoint {
  id: string
  name: string
  nearestBusStop: string
  walkingMinutes: number
  hasBusCoverage: boolean
}

ExitTimeEstimate {
  terminalType: 'domestic' | 'international'
  baggageType: 'carry_on' | 'checked'
  minMinutes: number
  maxMinutes: number
}
```

### Core Modules

1. **ArrivalForm**: 4-step form component
   - TimeInput
   - TerminalSelector (T1/T2)
   - BaggageSelector
   - DestinationPicker

2. **CalculationEngine**: Pure functions for all business logic
   - `calculateExitTime(terminal, baggage): TimeRange`
   - `isPeakHour(time): boolean`
   - `findNextCatchableTrip(arrivalTime, exitTime, schedule): Trip | null`
   - `calculateArrivalEstimate(trip, destination, isPeak): TimeRange`

3. **ResultDisplay**: Output component
   - BusRecommendation (if available)
   - GrabFallback (static reference)
   - DirectionGuide

### Key Algorithms

#### Peak Detection
```
Peak hours: 07:00-09:00 AND 17:00-19:00 (local time)
If arrival falls in peak → use peak travel time
```

#### Catchable Trip Finding
```
readyTime = arrivalTime + exitTime + 5min_walking
firstTrip = first departure WHERE departure >= readyTime
```

#### Arrival Estimation
```
earlyArrival = firstTrip.departure + travelTime.min
lateArrival = firstTrip.departure + travelTime.max
```

### Form Validation

| Field | Rules |
|-------|-------|
| Arrival Time | Required, HH:MM, 00:00-23:59 |
| Terminal | Required, must select T1 or T2 |
| Baggage | Required, must select one option |
| Destination | Required, must select from list |

### Static Data (MVP)

Bus 86 schedule (26 departures):
```
06:40, 07:20, 08:00, 08:40, 09:15, 09:40, 10:25, 11:00,
11:40, 12:20, 12:45, 13:15, 13:50, 14:30, 15:10, 15:40,
16:00, 16:45, 17:20, 17:55, 18:40, 19:20, 20:00, 20:45,
21:30, 22:15
```

Grab estimates (static):
- Price: 250,000 - 350,000 VND
- Travel time: 40-60 min (normal), 60-90 min (peak)

---

## Testing Decisions

### Test Philosophy
- Test external behavior only, not implementation details
- Focus on calculation accuracy and edge case handling
- All tests should be unit tests for pure functions

### Modules to Test

1. **CalculationEngine** (highest priority)
   - `calculateExitTime`: 4 scenarios (2 terminals × 2 baggage types)
   - `isPeakHour`: peak hours, off-peak hours, boundary times
   - `findNextCatchableTrip`: normal case, missed bus, no bus available
   - `calculateArrivalEstimate`: normal/peak, different destinations

2. **Form Validation**
   - Valid inputs → no errors
   - Invalid inputs → appropriate error messages
   - Missing required fields → specific field errors

3. **Edge Cases**
   - Arrival exactly at peak boundary
   - Arrival exactly at last bus departure
   - Multiple consecutive missed buses

### Test Structure
```
tests/
├── calculation-engine.test.ts
│   ├── calculateExitTime.test.ts
│   ├── isPeakHour.test.ts
│   ├── findNextCatchableTrip.test.ts
│   └── calculateArrivalEstimate.test.ts
└── validation.test.ts
```

---

## Out of Scope

### MVP Exclusions
- Real-time flight tracking or delay integration
- Real-time Grab pricing (use static estimates only)
- Multiple airport support (Noi Bai only)
- Multiple bus routes (Bus 86 only)
- Booking or ticketing functionality
- Offline mode / data caching
- User preferences persistence
- Push notifications
- Map integration

### Post-MVP
- Other airports (Tan Son Nhat, Da Nang, etc.)
- Other bus routes from Noi Bai
- Real-time bus GPS tracking
- Grab API integration
- Apple Maps / Google Maps deep linking

---

## Further Notes

### Scalability Consideration
The data model is designed to support multiple airports in the future:
- `Airport` is the top-level entity
- Each airport has its own `busRoutes`, `terminals`, `grabEstimates`
- Adding new airport = adding new data object, no code changes needed

### No Backend Required
MVP uses static data only. All calculations are pure client-side functions. No API calls needed for core functionality.

### Accessibility
- Vietnamese language UI (target audience)
- Large touch targets for tired travelers
- High contrast for outdoor visibility
- Simple, scannable layout
