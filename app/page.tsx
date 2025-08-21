import AuthComponent from '@/ui/Auth/AuthComponent';
import AttendanceWrapper from '@/ui/Components/RealTime/AttendanceWrapper';
import { fetchToday, fetchYesterday } from 'lib/db';
import Loading from './loading';
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
    try {
      const [{ data: today, time }, { data: yesterday }]: any =
        await Promise.all([fetchToday(), fetchYesterday()]);

      const dataProps = {
        initialData: today || [],
        timeUpdated: time,
        previousDayData: yesterday || []
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
