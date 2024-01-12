'use client';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { formatDateForUI } from 'lib/hooks/convertDate';
import { AttendanceRecord } from 'lib/types';
import React from 'react';

export function AttendanceTable({ records }: { records: any }) {
  const customOrder = [
    'Arizona Science Center',
    'Sybil B Harrington Galleries',
    'Dorrance Planetarium',
    'Irene P. Flinn Theater',
    'Sky Cycle',
    'VerticalVenture',
    'Education'
  ]; // Define your custom order
  const hiddenTimes = ['08:00:00 PM', '05:00:00 PM'];
  const recordsByTheater: Record<string, AttendanceRecord[]> = {};

  // Sort the theater names based on the custom order
  records.sort((a: any, b: any) => {
    const indexA = customOrder.indexOf(a.theater);
    const indexB = customOrder.indexOf(b.theater);

    // If both theaters are in the custom order, compare their positions
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only one theater is in the custom order, prioritize it
    if (indexA !== -1) {
      return -1;
    }

    if (indexB !== -1) {
      return 1;
    }

    // If neither theater is in the custom order, maintain their original order
    return 0;
  });

  records.map((record: any) => {
    if (!recordsByTheater[record.theater!]) {
      recordsByTheater[record.theater!] = [];
    }
    recordsByTheater[record.theater!].push(record);
  });

  /// const totalRevenue = records.reduce((total, record) => total + (record.revenue || 0), 0);

  return (
    recordsByTheater && (
      <Table className="">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-black dark:text-white hidden">
              Theater
            </TableHeaderCell>
            <TableHeaderCell className="text-black dark:text-white">
              Season
            </TableHeaderCell>
            <TableHeaderCell className="text-black dark:text-white">
              Attendance
            </TableHeaderCell>
            <TableHeaderCell className="text-black dark:text-white">
              Revenue
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
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(recordsByTheater).map(
            ([theater, recordsForTheater]) => (
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
                    return (
                      <TableRow key={record.id}>
                        <TableCell className="text-gray-900 dark:text-gray-100 hidden">
                          {record.theater}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100 pl-8">
                          {record.production_season}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {record.attendance}
                        </TableCell>
                        <TableCell>
                          <Text className="text-gray-900 dark:text-gray-100">
                            ${record.revenue}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text className="text-gray-900 dark:text-gray-100">
                            {record.production}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text className="text-gray-900 dark:text-gray-100">
                            {formattedDate}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text className="text-gray-900 dark:text-gray-100">
                            {hiddenTimes.includes(record.perf_time)
                              ? '---'
                              : record.perf_time}
                          </Text>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </React.Fragment>
            )
          )}
        </TableBody>
      </Table>
    )
  );
}
