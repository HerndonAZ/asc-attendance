// import AuthComponent from '@/ui/Auth/AuthComponent';
// import AttendanceWrapper from '@/ui/Components/RealTime/AttendanceWrapper';
// import { fetchToday, fetchYesterday } from 'lib/db';
// import { auth } from './auth';
// import Loading from './loading';
// export const dynamic = 'force-dynamic';

// export default async function IndexPage() {
//   const session = await auth();

//   if (!session) {
//     return (
//       <div className="min-h-[500px] flex items-center">
//         <AuthComponent />
//       </div>
//     );
//   }

//   if (session) {
//     try {
//       const [{ data: today, time }, { data: yesterday }]: any =
//         await Promise.all([fetchToday(), fetchYesterday()]);

//       const dataProps = {
//         initialData: today || [],
//         timeUpdated: time,
//         previousDayData: yesterday || []
//       };

//       if (yesterday) {
//         console.log("This is for attendance (Hit data drops under yesterday)", {...dataProps})
//         return <AttendanceWrapper {...dataProps} />;
//       }

//       return <Loading />;
//     } catch (error) {
//       console.error('Failed to fetch attendance data', error);
//       throw error;
//     }
//   }

//   return <Loading />;
// }

import AuthComponent from '@/ui/Auth/AuthComponent';
import AttendanceWrapper from '@/ui/Components/RealTime/AttendanceWrapper';
import { fetchToday, fetchYesterday } from 'lib/db';
import { AttendanceRecord } from 'lib/types';
import { auth } from './auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IndexPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <AuthComponent />
      </div>
    );
  }

  try {
    const [todayRes, yesterdayRes] = await Promise.all([
      fetchToday(),
      fetchYesterday()
    ]);

    // 1. Cast arrays explicitly to AttendanceRecord[]
    const todayData: AttendanceRecord[] = Array.isArray(todayRes?.data) 
      ? (todayRes.data as AttendanceRecord[]) 
      : [];
      
    const yesterdayData: AttendanceRecord[] = Array.isArray(yesterdayRes?.data) 
      ? (yesterdayRes.data as AttendanceRecord[]) 
      : [];
      
    // 2. Ensure timeUpdated is ALWAYS a string (converts Date objects if present)
    const rawTime = todayRes?.time || new Date();
    const timeUpdated: string = rawTime instanceof Date ? rawTime.toISOString() : String(rawTime);

    const dataProps = {
      initialData: todayData,
      previousDayData: yesterdayData,
      timeUpdated: timeUpdated
    };

    return <AttendanceWrapper {...dataProps} />;

  } catch (error) {
    console.error('[Attendance] Error:', error);

    return (
      <div className="max-w-4xl mx-auto my-12 p-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-red-700 dark:text-red-300">
        <h2 className="text-lg font-semibold">Unable to load attendance data</h2>
        <p className="mt-1 text-sm">
          There was an error retrieving attendance records. Please refresh or try again later.
        </p>
      </div>
    );
  }
}