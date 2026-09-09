import AuthComponent from '@/ui/Auth/AuthComponent';
import AttendanceWrapper from '@/ui/Components/RealTime/AttendanceWrapper';
import { fetchToday, fetchYesterday } from 'lib/db';
import { auth } from './auth';
import Loading from './loading';
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
    try {
      const [{ data: today, time }, { data: yesterday }]: any =
        await Promise.all([fetchToday(), fetchYesterday()]);

      // const [{ data: seven_days }]: any =
      //   await Promise.all([fetchLast7Days()]);

        // console.log("This is the last 7 days data from page.tsx", seven_days);

      const dataProps = {
        initialData: today.Items || [],
        timeUpdated: time,
        previousDayData: yesterday.Items || []
      };


      if (yesterday) {
        return <AttendanceWrapper {...dataProps} />;
      }

      return <Loading />;
    } catch (error) {
      console.error('Failed to fetch attendance data', error);
      throw error;
    }
  }

  return <Loading />;
}
