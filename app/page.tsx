import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import {UsersTable, AttendanceTable } from './table';
import { fetchTessitura } from '../lib/db';
import { AttendanceRecord } from '../lib/types';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}


export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // const result = await sql`
  //   SELECT id, name, username, email 
  //   FROM users 
  //   WHERE name ILIKE ${'%' + search + '%'};
  // `;
  // const users = result.rows as User[];

  const users = null
  const records: AttendanceRecord[] = [
    { 
      id: 2785,
      production_season: 'Jane Goodalls Reson for Hope',       
      perf_name: 'Jane Goodalls Reson for Hope', 
      perf_dt: '2023-09-30T00:00:00', 
      perf_time: '12:00:00 PM', 
      theater: 'Giant Screen Theater', 
      attendance: 9, 
      revenue: 72.0000 
    }, 

  ]

  const res = await fetchTessitura()
  if (res) { 
    return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl h-screen">
      Home
    </main> 
    ) }
  if (users) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
  }

    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <AttendanceTable records={records} />
      </Card>
    </main>
    )
  
}
