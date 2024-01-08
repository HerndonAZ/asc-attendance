// import { Card, Title, Text } from '@tremor/react';
// import Search from './search';
// import { UsersTable } from './table';
import { fetchTess } from '../lib/db';
import AttendanceChart from '../ui/AttendanceChart';
//import { records } from '../lib/test-data/testRecord';
import { auth } from './auth';
import AuthComponent from '../ui/Auth/AuthComponent';
export const dynamic = 'force-dynamic';
export default async function IndexPage() {
  const users = null;
  //console.log(res)
  const session = await auth();
  const data: any = session && (await fetchTess(null, 'today'));

  const records = data?.data?.Attendance_Update?.AttendanceUpdate;


  if (records) {
    return <AttendanceChart records={records} />;
  } else {
    return (
      <div className="min-h-[500px] flex items-center">
        <AuthComponent />
      </div>
    );
  }
}
