'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text
} from '@tremor/react';
import { formatDateForUI } from 'lib/hooks/convertDate';
import { AttendanceRecord } from 'lib/types';
import React from 'react';
import { PriceTypeBadge } from './actions';
import { useRealTimeStore } from './store';

export function AttendanceTable({ records }: { records: any }) {
  const customOrder = [
    'Arizona Science Center',
    'Sybil B Harrington Galleries',
    'Dorrance Planetarium',
    'Irene P. Flinn Theater',
    'Sky Cycle',
    'VerticalVenture',
    'CREATE',
    'Education',
    'Consessions'
  ]; // Define your custom order
  const hiddenVenues = ['Lunchroom','Voucher'];
  const hiddenTimes = ['08:00:00 PM', '05:00:00 PM'];
  const recordsByTheater: Record<string, AttendanceRecord[]> = {};
  const { useMerged } = useRealTimeStore();
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
    if (hiddenVenues.includes(record?.theater!)) {
      return null;
    }

    if (!recordsByTheater[record.theater!]) {
      recordsByTheater[record.theater!] = [];
    }
    recordsByTheater[record.theater!].push(record);
  });

  /// const totalRevenue = records.reduce((total, record) => total + (record.revenue || 0), 0);
  const grandTotals = {
    attendance: 0,
    revenue: 0
  };

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
            {!useMerged && (
              <TableHeaderCell className="text-black dark:text-white">
                Price Type
              </TableHeaderCell>
            )}
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
            ([theater, recordsForTheater]) => {
              const sectionTotals = recordsForTheater.reduce(
                (acc, record) => ({
                  attendance: acc.attendance + (record.attendance || 0),
                  revenue: acc.revenue + (record.revenue || 0)
                }),
                { attendance: 0, revenue: 0 }
              );
  
              // Add to grand totals
              grandTotals.attendance += sectionTotals.attendance;
              grandTotals.revenue += sectionTotals.revenue;
  
              return (
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
                          // First sort by time
                          const timeA = new Date(`2022-01-01 ${a.perf_time}`);
                          const timeB = new Date(`2022-01-01 ${b.perf_time}`);
                          const timeComparison = timeA.getTime() - timeB.getTime();
                            const priceTypeOrder = [
                            "AI",
                            "All-Inclusive",
                            "GA",
                            "General Admission",
                            "Mem",
                            "Member",
                            "Corp",
                            "Corporate",
                            "Group",
                            "MuseumsForAll",
                            "MFA",
                            "COMP", 
                            "Comp",
                            "POGO",
                            "VIP",
                            "ASTC",
                            ];

                            // If times are equal, sort by price type
                            if (timeComparison === 0) {
                            const getPriceTypeIndex = (priceType: string) => {
                              return priceTypeOrder.findIndex(orderType => 
                              priceType?.toLowerCase().startsWith(orderType.toLowerCase())
                              );
                            };

                            const indexA = getPriceTypeIndex(a.price_type_desc || '');
                            const indexB = getPriceTypeIndex(b.price_type_desc || '');

                            if (indexA !== -1 && indexB !== -1) {
                              return indexA - indexB;
                            }
                            if (indexA !== -1) return -1;
                            if (indexB !== -1) return 1;
                            return (a.price_type_desc || '').localeCompare(b.price_type_desc || '');
                            }

                          return timeComparison;
                          })
                          .map((record) => {
                          const formattedDate = formatDateForUI(record?.perf_dt);
                            console.log('record', record);  

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
                        {!useMerged && (
                          <TableCell>
                            {record.price_type_id && (
                              <PriceTypeBadge priceType={record.price_type_id as number} priceTypeName={record.price_type_desc || ""} />
                            )}
                          </TableCell>
                        )}
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
                    {/* Section total row */}
                <TableRow className="bg-gray-50 dark:bg-gray-700 font-bold text-lg">
                  <TableCell className="hidden"></TableCell>
                  <TableCell className="pl-8">Section Total</TableCell>
                  <TableCell>{sectionTotals.attendance}</TableCell>
                  <TableCell>${sectionTotals.revenue.toFixed(2)}</TableCell>
                  {!useMerged && <TableCell></TableCell>}
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </React.Fragment>
            )}
          )}
                              {/* Daily total row */}

                <TableRow className="bg-gray-200 dark:bg-gray-900 font-bold text-lg ">
                <TableCell className="hidden"></TableCell>
            <TableCell className="pl-8">Daily Total</TableCell>
            <TableCell>{grandTotals.attendance}</TableCell>
            <TableCell>${grandTotals.revenue.toFixed(2)}</TableCell>
            {!useMerged && <TableCell></TableCell>}
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  );
}
