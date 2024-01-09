
import { fetchToday } from '../lib/db';
import AttendanceChart from '../ui/AttendanceChart';
import { auth } from './auth';
import AuthComponent from '../ui/Auth/AuthComponent';
import { cache } from 'react';

export const dynamic = 'force-dynamic';

const getInitialData = cache(async()  => {
const data = await fetchToday()
return data?.data
})
export default async function IndexPage() {
  const session = await auth();
  const initialData: any = session && (await getInitialData());


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
