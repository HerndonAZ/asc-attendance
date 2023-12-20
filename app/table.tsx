import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface AttendanceRecord {
  id: string | number, 
  production_season: string
  perf_dt: string // performance date
  perf_time: string // performance time
  theater?: string | null
  attendance: number | null
  revenue: number | string | null

}

export function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{user.username}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


export function AttendanceTable({ records }: { records: AttendanceRecord[]}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Season</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Time</TableHeaderCell>
          <TableHeaderCell>Attendance</TableHeaderCell>
          <TableHeaderCell>Revenue</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{record.production_season}</TableCell>
            <TableCell>
              <Text>{record.perf_dt}</Text>
            </TableCell>
            <TableCell>
              <Text>{record.perf_time}</Text>
            </TableCell>
            <TableCell>
              <Text>{record.attendance}</Text>
            </TableCell>
            <TableCell>
              <Text>{record.revenue}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

