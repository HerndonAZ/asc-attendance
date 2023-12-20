export interface AttendanceRecord {
    id: string| number, 
    production_season: string
    perf_name: string
    perf_dt: string // performance date
    perf_time: string // performance time
    theater?: string | null
    attendance: number | null
    revenue: number | string | null
  
  }