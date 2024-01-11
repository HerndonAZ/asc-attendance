import { fetchToday, fetchYesterday} from 'lib/db';
import AttendanceChart from 'ui/AttendanceChart';
import { auth } from './auth';
import AuthComponent from 'ui/Auth/AuthComponent';
export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await auth();
  const [
    { data:today,time},
    { data:yesterday }]: any =
    (await Promise.all([
      fetchToday(),
      fetchYesterday()
    ]));

  // console.log(initialData?.data)

  const dataProps = {
    initialData:today, 
    timeUpdated: time,
    previousDayData:yesterday || []
  }

  if(!session) {
    return (
      <div className="min-h-[500px] flex items-center">
        <AuthComponent />
      </div>
    );  }

  
  if (session && yesterday) {
    return <AttendanceChart {...dataProps} />;
  }
}
