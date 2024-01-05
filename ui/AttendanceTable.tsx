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
import React from 'react';



//console.log(recordsByTheater, 'RBT')
export function AttendanceTable({ records }: { records: AttendanceRecord[] }) {
  const recordsByTheater: Record<string, AttendanceRecord[]> = {};
records.map((record) => {
  if (!recordsByTheater[record.theater!]) {
    recordsByTheater[record.theater!] = [];
  }
  recordsByTheater[record.theater!].push(record);
});

  return (
    <Table className="">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-black dark:text-white hidden">
            Status
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white hidden">
            Theater
          </TableHeaderCell>
          <TableHeaderCell className="text-black dark:text-white">
            Season
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
            {recordsForTheater
  .slice()
  .sort((a, b) => {
    // Convert the time strings to Date objects for proper comparison
    const timeA = new Date(`2022-01-01 ${a.perf_time}`);
    const timeB = new Date(`2022-01-01 ${b.perf_time}`);
    
    return timeA.getTime() - timeB.getTime();
  })
  .map((record) => {
    const formattedDate = formatDateForUI(record?.perf_dt);
    const statusProps = {
      time: record.perf_time,
      date: record.perf_dt,
    };
    

    return (
      <TableRow key={record.id}>
        <TableCell className="text-gray-900 dark:text-gray-100 hidden">
          <div className="mx-auto">
            <StatusIcon {...statusProps} />
          </div>
        </TableCell>
        <TableCell className="text-gray-900 dark:text-gray-100 hidden">
          {record.theater}
        </TableCell>
        <TableCell className="text-gray-900 dark:text-gray-100 pl-8">
          {record.production_season}
        </TableCell>
        <TableCell className="text-gray-900 dark:text-gray-100">
          {record.production}
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
  const now = Date.now();
  const adjustedTime = time.replace(' PM', ''); // Remove " PM" if it's included
  const eventDateTime = new Date(`${formatDateForStatus(date)} ${adjustedTime}`);
  const runTimeInMilliseconds = runtime ? runtime * 60 * 1000 : 60 * 60 * 1000; // Convert runtime to milliseconds
  const endTime = eventDateTime.getTime() + runTimeInMilliseconds;
  const timeDiff = eventDateTime.getTime() - now;
  const minutesRemaining = timeDiff / (1000 * 60);

  const startingSoonThreshold = 15; // 15 minutes threshold for "Starting Soon"
  const endingSoonThreshold = 15; // 15 minutes threshold for "Ending Soon"

  if (minutesRemaining > 0) {
    if (minutesRemaining <= startingSoonThreshold) {
      return <span className="flex w-3 h-3 bg-blue-500 rounded-full mx-4 animate-pulse ease-in-out delay-300"></span>;
    } else {
      return <span className="flex w-3 h-3 bg-red-500 rounded-full mx-4"></span>;
    }
  } else if (now >= eventDateTime.getTime() && now <= endTime) {
    return <span className="flex w-3 h-3 bg-green-500 rounded-full mx-4 animate-pulse ease-in-out delay-300"></span>;
  } else if (minutesRemaining > -endingSoonThreshold) {
    return <span className="flex w-3 h-3 bg-yellow-500 rounded-full mx-4 animate-pulse ease-in-out delay-300"></span>;
  } else {
    return <span className="flex w-3 h-3 bg-red-500 rounded-full mx-4"></span>;
  }
};
