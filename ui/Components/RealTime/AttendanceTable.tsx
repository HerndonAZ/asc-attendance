'use client';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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
import React, { useState } from 'react';
import { PriceTypeBadge } from './actions';
import { useRealTimeStore } from './store';

export function AttendanceTable({ records }: { records: any }) {
  // Define a custom order, ensuring "Groups" is always second.
  const customOrder = [
    'Arizona Science Center',
    'Groups',
    'Sybil B Harrington Galleries',
    'Irene P. Flinn Theater',
    'Evans Family Sky Cycle',
    'VerticalVenture',
    'CREATE',
    'Education',
    'Consessions'
  ];
  const hiddenVenues = ['Lunchroom', 'Voucher'];
  const hiddenTimes = ['08:00:00 PM', '05:00:00 PM', '10:30:00 AM'];

  // Group records into sections with a special rule:
  // if the record comes from "Sybil B Harrington Galleries" and its perf_name equals "Group Admissions",
  // then group it under "Groups" instead.
  const recordsByTheater: Record<string, AttendanceRecord[]> = records.reduce(
    (acc: Record<string, AttendanceRecord[]>, record: any) => {
      if (hiddenVenues.includes(record?.theater!)) return acc;

      let theaterName = record.theater!;
      if (theaterName === 'Sybil B Harrington Galleries' && record.perf_name === 'Group Admissions') {
        theaterName = 'Groups';
      }

      if (!acc[theaterName]) {
        acc[theaterName] = [];
      }
      acc[theaterName].push(record);
      return acc;
    },
    {}
  );

  const { useMerged } = useRealTimeStore();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const toggleSection = (theater: string) => {
    setExpandedSections(prev =>
      prev.includes(theater) ? prev.filter(t => t !== theater) : [...prev, theater]
    );
  };

  // Sort the sections using customOrder.
  const sortedSections = Object.entries(recordsByTheater).sort(([theaterA], [theaterB]) => {
    const indexA = customOrder.indexOf(theaterA);
    const indexB = customOrder.indexOf(theaterB);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

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
          {sortedSections.map(([theater, recordsForTheater]) => {
            const isExpanded = expandedSections.includes(theater);
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
                {/* Section header with expand/collapse */}
                <TableRow>
                  <TableHeaderCell className="text-gray-900 dark:text-gray-200 text-lg">
                    <button
                      onClick={() => toggleSection(theater)}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      {isExpanded ? (
                        <ChevronDownIcon className="h-5 w-5" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5" />
                      )}
                      <span>{theater}</span>
                    </button>
                  </TableHeaderCell>
                </TableRow>

                {/* Section records (expandable) */}
                {isExpanded &&
                  recordsForTheater
                    .slice()
                    .sort((a, b) => {
                      // Sort by time first
                      const timeA = new Date(`2022-01-01 ${a.perf_time}`);
                      const timeB = new Date(`2022-01-01 ${b.perf_time}`);
                      const timeComparison = timeA.getTime() - timeB.getTime();
                      const priceTypeOrder = [
                        'AI',
                        'All-Inclusive',
                        'GA',
                        'General Admission',
                        'Mem',
                        'Member',
                        'Corp',
                        'Corporate',
                        'Group',
                        'MuseumsForAll',
                        'MFA',
                        'COMP',
                        'Comp',
                        'POGO',
                        'VIP',
                        'ASTC'
                      ];

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
                      return (
                        <TableRow
                          key={record.id + (record?.price_type_id?.toString() || '')}
                        >
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
                                <PriceTypeBadge
                                  priceType={record.price_type_id as number}
                                  priceTypeName={record.price_type_desc || ''}
                                />
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
                {/* Section totals (always visible) */}
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
            );
          })}
          {/* Grand Total (Daily Total) */}
          <TableRow className="bg-gray-200 dark:bg-gray-900 font-bold text-lg">
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