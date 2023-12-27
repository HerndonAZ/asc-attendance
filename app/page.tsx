// import { Card, Title, Text } from '@tremor/react';
// import Search from './search';
// import { UsersTable } from './table';
import { fetchTessitura } from '../lib/db';
import AttendanceChart from '../ui/AttendanceChart';
import { records } from '../lib/test-data/testRecord';

export default async function IndexPage() {
  const users = null;
  const res = await fetchTessitura();
  

  if (res) {
    return <main className="p-4 md:p-10 mx-auto max-w-7xl h-screen">{JSON.stringify(res)}</main>;
  }

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
``
  return <AttendanceChart records={records} />;
}
