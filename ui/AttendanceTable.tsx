import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
  } from '@tremor/react';
  import { formatDateForUI } from '../lib/hooks/convertDate';
  import { AttendanceRecord } from '../lib/types';
  
  
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
          {records.map((record) =>  {
              const formattedDate = formatDateForUI(record?.perf_dt);
  
            return (
            <TableRow key={record.id}>
              <TableCell>{record.production_season}</TableCell>
              <TableCell>
                <Text>{formattedDate}</Text>
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
          )
            }
            )}
        </TableBody>
      </Table>
    );
  }
  
  