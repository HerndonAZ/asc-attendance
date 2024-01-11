import { fetchToday, fetchYesterday, getToday, getYesterday } from '../lib/db';
import AttendanceChart from '../ui/AttendanceChart';
import { auth } from './auth';
import AuthComponent from '../ui/Auth/AuthComponent';
export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await auth();
  const initialData: any = session && (await fetchToday());

  const [
    { data:today , time},
    { data:yesterday }]: any =
    session && 
    (await Promise.all([
      fetchToday(),
      fetchYesterday()
    ]));

  // console.log(initialData?.data)

  const dataProps = {
    initialData:today, 
    timeUpdated: time,
    previousDayData:yesterday
  }
  if (session && {...dataProps}!!) {
    return <AttendanceChart {...dataProps} />;
  } else {
    return (
      <div className="min-h-[500px] flex items-center">
        <AuthComponent />
      </div>
    );
  }
}
