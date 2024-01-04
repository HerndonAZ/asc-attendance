'use client'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { formatDateForStatus, formatDateForUI } from '../lib/hooks/convertDate';
import { AttendanceRecord } from '../lib/types';
import { records } from '../lib/test-data/testRecord';
import React from 'react';

const recordsByTheater: Record<string, AttendanceRecord[]> = {};
records.map((record) => {
  if (!recordsByTheater[record.theater!]) {
    recordsByTheater[record.theater!] = [];
  }
  recordsByTheater[record.theater!].push(record);
});


//console.log(recordsByTheater, 'RBT')
export function AttendanceTable({ records }: { records: AttendanceRecord[] }) {
  return (
    <Table className="">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-black dark:text-white">
            Status
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white hidden">
            Theater
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white">
            Performance
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white">
            Date
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white">
            Time
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white">
            Attendance
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white">
            Revenue
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(recordsByTheater).map(([theater, recordsForTheater]) => (
          <React.Fragment key={theater}>
            {/* Theater header */}
            <TableRow>
              <TableHeaderCell className="text-gray-900 dark:text-gray-200 text-lg">
                {theater}
              </TableHeaderCell>
            </TableRow>
            {/* Theater records */}
            {recordsForTheater.map((record) => {
              const formattedDate = formatDateForUI(record?.perf_dt);
              const statusProps = {
                time: record.perf_time,
                date: record.perf_dt
              };

              return (
                <TableRow key={record.id}>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    <div className='mx-auto'><StatusIcon {...statusProps} /></div>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100 hidden">
                    {record.theater}
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {record.production_season}
                  </TableCell>
                  <TableCell>
                    <Text className="text-gray-900 dark:text-gray-100">
                      {formattedDate}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text className="text-gray-900 dark:text-gray-100">
                      {record.perf_time}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text className="text-gray-900 dark:text-gray-100">
                      {record.attendance}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text className="text-gray-900 dark:text-gray-100">
                      {record.revenue}
                    </Text>
                  </TableCell>
                </TableRow>
              );
            })}
          </React.Fragment>
        ))}
      </TableBody>

    </Table>
  );
}
const StatusIcon = ({ time, date, runtime }: { time: string; date: string; runtime?: any }) => {
 // console.log(date, time)
  const now = Date.now();
  const adjustedTime = time.replace(' PM', ''); // Remove " PM" if it's included
  const eventDateTime = new Date(`${formatDateForStatus(date)} ${adjustedTime}`);
  const runTimeInMilliseconds = runtime ? runtime * 60 * 1000 : 60 * 60 * 1000; // Convert runtime to milliseconds
  const endTime = eventDateTime.getTime() + runTimeInMilliseconds;
  const timeDiff = eventDateTime.getTime() - now;
  const minutesRemaining = timeDiff / (1000 * 60);

  const startingSoonThreshold = 60; // 15 minutes threshold for "Starting Soon"
  const endingSoonThreshold = 15; // 15 minutes threshold for "Ending Soon"
 // console.log(timeDiff)
  if (minutesRemaining > 0 && minutesRemaining <= startingSoonThreshold) {
    return <span className="flex w-3 h-3 bg-blue-500 rounded-full mx-4  animate-pulse ease-in-out delay-300"></span>;
  } else if (minutesRemaining > startingSoonThreshold && minutesRemaining <= 0) {
    return <span className="flex w-3 h-3 bg-green-500 rounded-full mx-4  animate-pulse ease-in-out delay-300"></span>;
  } else if (minutesRemaining > 0 && minutesRemaining <= endingSoonThreshold) {
    return <span className="flex w-3 h-3 bg-yellow-500 rounded-full mx-4  animate-pulse ease-in-out delay-300"></span>;
  } else if (minutesRemaining <= 0 && now <= endTime) {
    return <span className="flex w-3 h-3 bg-red-500 rounded-full mx-4"></span>;
  } else {
    return <span className="flex w-3 h-3 bg-red-500 rounded-full mx-4"></span>; // Default: No status icon if not within the defined thresholds
  }
};
