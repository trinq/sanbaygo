// CSS module mock for Jest tests. Maps class names to string identifiers
// so JSX className={styles.xxx} renders correctly.
//
// CJS-with-ESM-default pattern: ts-jest with `useESM: true` compiles
// `import styles from './foo.module.css'` to an ESM default import.
// When jest resolves the import to this CJS file, Node's CJS->ESM
// interop wraps the CJS module as `{ default: <module.exports> }`.
// Re-exporting `module.exports` as `default` makes both work:
const mocks = {
  container: 'container', header: 'header', title: 'title', subtitle: 'subtitle',
  noBus: 'noBus', noBusIcon: 'noBusIcon', noBusTitle: 'noBusTitle', noBusText: 'noBusText',
  actions: 'actions', recalculateButton: 'recalculateButton',
  // JourneyTimeline
  journey: 'journey', timeline: 'timeline', point: 'point', pointIcon: 'pointIcon',
  pointTime: 'pointTime', pointLabel: 'pointLabel', line: 'line',
  primary: 'primary', neutral: 'neutral', success: 'success', highlight: 'highlight',
  // BusRecommendation
  busIcon: 'busIcon', details: 'details', route: 'route', info: 'info',
  depart: 'depart', wait: 'wait', price: 'price', tier3: 'tier3',
  // GrabFallback
  priceLabel: 'priceLabel', priceValue: 'priceValue', timeLabel: 'timeLabel',
  timeValue: 'timeValue', button: 'button',
  // VehicleComparison
  peakBadge: 'peakBadge', grid: 'grid', loading: 'loading',
  // SortToggle
  active: 'active',
  // VehicleCard
  card: 'card', recommended: 'recommended', name: 'name', nameText: 'nameText',
  nameEn: 'nameEn', price: 'price', estimateTag: 'estimateTag', time: 'time',
  waitLabel: 'waitLabel', waitValue: 'waitValue', arrival: 'arrival',
  arrivalLabel: 'arrivalLabel', arrivalValue: 'arrivalValue',
  ratings: 'ratings', rating: 'rating', ratingLabel: 'ratingLabel',
  ratingBadge: 'ratingBadge', eco: 'eco', notes: 'notes',
  score1: 'score1', score2: 'score2', score3: 'score3', score4: 'score4', score5: 'score5',
};
module.exports = mocks;
module.exports.default = mocks;