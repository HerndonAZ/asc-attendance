export interface AttendanceRecord {
  id: string | number;
  production: string;
  production_season: string;
  perf_name: string;
  perf_dt: string; // performance date
  perf_time: string; // performance time
  theater?: string | null;
  attendance: number | null;
  revenue: number;
  time?: string;
  price_type_id?: string | number | null;
  price_type_desc?: string | null;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
