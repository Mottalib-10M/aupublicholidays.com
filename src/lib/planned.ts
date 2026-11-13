/** Every planned page (id = file name in src/content/guides). Tests accept links to these ids while writing. */
export const PLANNED_GUIDES = [
  'nsw-public-holidays-2027', 'vic-public-holidays-2027', 'qld-public-holidays-2027', 'wa-public-holidays-2027',
  'sa-public-holidays-2027', 'tas-public-holidays-2027', 'act-public-holidays-2027', 'nt-public-holidays-2027',
  'easter-2027', 'anzac-day-2027', 'kings-birthday-2027', 'labour-day-2027', 'melbourne-cup-2027', 'australia-day-2027', 'christmas-2027',
  'long-weekends-2027', 'annual-leave-planner-2027', 'next-public-holiday', 'public-holidays-2028', 'public-holidays-2026', 'school-terms-2027',
  'qld-show-holidays-2027', 'nsw-local-public-holidays-2027', 'tas-regional-holidays-2027',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
