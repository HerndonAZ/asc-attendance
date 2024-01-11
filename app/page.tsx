import { fetchToday, fetchYesterday } from 'lib/db';
import AttendanceChart from 'ui/AttendanceChart';
import { auth } from './auth';
import AuthComponent from 'ui/Auth/AuthComponent';
export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await auth();

  // console.log(initialData?.data)

  if (!session) {
    return (
      <div className="min-h-[500px] flex items-center">
        <AuthComponent />
      </div>
    );
  }

  if (session) {
    const [{ data: today, time }, { data: yesterday }]: any = await Promise.all(
      [fetchToday(), fetchYesterday()]
    );
    const dataProps = {
      initialData: today || [],
      timeUpdated: time,
      previousDayData: yesterday || []
    };

    if (yesterday) {
      return <AttendanceChart {...dataProps} />;
    }
  }
}
