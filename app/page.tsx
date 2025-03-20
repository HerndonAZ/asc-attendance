import AuthComponent from '@/ui/Auth/AuthComponent';
import AttendanceWrapper from '@/ui/Components/RealTime/AttendanceWrapper';
import { fetchLast7Days, fetchToday, fetchYesterday } from 'lib/db';
import { auth } from './auth';
export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="min-h-[500px] flex items-center">
        <AuthComponent />
      </div>
    );
  }

  if (session) {
    const [
      { data: today, time },
      { data: yesterday }
      //  {data: last7days}
    ]: any = await Promise.all([
      fetchToday(),
      fetchYesterday()
      //   fetchLast7Days()
    ]);
    // console.log(yesterday);
    // Kick off the last7days promise without awaiting it
    const last7daysPromise = fetchLast7Days();

    const dataProps = {
      initialData: today || [],
      timeUpdated: time,
      previousDayData: yesterday || [],

      // Pass the promise (or you can resolve it with suspense inside AttendanceWrapper)
      last7days: []
    };
    //console.log("LAST 7 DAYS PROMISE", dataProps?.last7days);
    if (yesterday) {
      return <AttendanceWrapper {...dataProps} />;
    }
  }
}
