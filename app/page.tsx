
import { fetchToday } from '../lib/db';
import AttendanceChart from '../ui/AttendanceChart';
import { auth } from './auth';
import AuthComponent from '../ui/Auth/AuthComponent';
export const dynamic = 'force-dynamic';


export default async function IndexPage() {
  const session = await auth();
  const {data:initialData}: any | null = session && (await fetchToday());


  console.log(initialData)
  if (initialData!! && initialData.length > 1) {
    return <AttendanceChart initialData={initialData} />;
  } else {
    return (
      <div className="min-h-[500px] flex items-center">
        <AuthComponent />
      </div>
    );
  }
}
