// import { Card, Title, Text } from '@tremor/react';
// import Search from './search';
// import { UsersTable } from './table';
import { fetchTess } from '../lib/db';
import AttendanceChart from '../ui/AttendanceChart';
//import { records } from '../lib/test-data/testRecord';
import { auth } from './auth';
import AuthComponent from '../ui/Auth/AuthComponent';
export const dynamic = 'force-dynamic'

export default async function IndexPage() {
  const users = null;
  //console.log(res)
  const session = await auth();
  const res: any = session && await fetchTess();

  console.log(res?.Attendance_Update?.AttendanceUpdate)

  const records = res?.Attendance_Update?.AttendanceUpdate

  // if (res && session) {
  //   return <div className="p-4 md:p-10 mx-auto max-w-7xl h-screen">{JSON.stringify(res)}</div>;
  // }

  // if (users) {
  //   return (
  //     <main className="p-4 md:p-10 mx-auto max-w-7xl">
  //       <Title>Realtime Attendance</Title>
  //       <Text>Arizona Science Center realtime attendance reporting</Text>
  //       <Search />
  //       <Card className="mt-6">
  //         <UsersTable users={users} />
  //       </Card>
  //     </main>
  //   );
  // }
 if (session){
  return <AttendanceChart records={records} />
} else {
  return <AuthComponent/>
}

;

}
