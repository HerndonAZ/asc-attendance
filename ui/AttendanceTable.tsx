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
      <Table className='text-black dark:text'>
        <TableHead>
          <TableRow>
            <TableHeaderCell className='text-black dark:text-white'>Season</TableHeaderCell>
            <TableHeaderCell className='text-black dark:text-white'>Date</TableHeaderCell>
            <TableHeaderCell className='text-black dark:text-white'>Time</TableHeaderCell>
            <TableHeaderCell className='text-black dark:text-white'>Attendance</TableHeaderCell>
            <TableHeaderCell className='text-black dark:text-white'>Revenue</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) =>  {
              const formattedDate = formatDateForUI(record?.perf_dt);
  
            return (
            <TableRow key={record.id}>
              <TableCell  className='text-gray-900 dark:text-gray-100'>{record.production_season}</TableCell>
              <TableCell>
                <Text  className='text-gray-900 dark:text-gray-100'>{formattedDate}</Text>
              </TableCell>
              <TableCell>
                <Text  className='text-gray-900 dark:text-gray-100'>{record.perf_time}</Text>
              </TableCell>
              <TableCell>
                <Text  className='text-gray-900 dark:text-gray-100'>{record.attendance}</Text>
              </TableCell>
              <TableCell>
                <Text  className='text-gray-900 dark:text-gray-100'>{record.revenue}</Text>
              </TableCell>
            </TableRow>
          )
            }
            )}
        </TableBody>
      </Table>
    );
  }
  
  