import { fetchToday } from '../lib/db';
import AttendanceChart from '../ui/AttendanceChart';
import { auth } from './auth';
import AuthComponent from '../ui/Auth/AuthComponent';
export const dynamic = 'force-dynamic';


export default async function IndexPage() {
  const session = await auth();
  const initialData: any = session && (await fetchToday());


 // console.log(initialData?.data)
  if (session) {
    return <AttendanceChart initialData={initialData?.data} />;
  } else {
    return (
      <div className="min-h-[500px] flex items-center">
        <AuthComponent />
      </div>
    );
  }
}
