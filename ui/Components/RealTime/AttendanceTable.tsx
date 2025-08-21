'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/ui/ui/table';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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
      if (
        theaterName === 'Sybil B Harrington Galleries' &&
        record.perf_name === 'Group Admissions'
      ) {
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
    setExpandedSections((prev) =>
      prev.includes(theater)
        ? prev.filter((t) => t !== theater)
        : [...prev, theater]
    );
  };

  // Sort the sections using customOrder.
  const sortedSections = Object.entries(recordsByTheater).sort(
    ([theaterA], [theaterB]) => {
      const indexA = customOrder.indexOf(theaterA);
      const indexB = customOrder.indexOf(theaterB);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    }
  );

  const grandTotals = {
    attendance: 0,
    revenue: 0
  };

  return (
    recordsByTheater && (
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground hidden">
              Theater
            </TableHead>
            <TableHead className="text-foreground">
              Season
            </TableHead>
            <TableHead className="text-foreground">
              Attendance
            </TableHead>
            <TableHead className="text-foreground">
              Revenue
            </TableHead>
            {!useMerged && (
              <TableHead className="text-foreground">
                Price Type
              </TableHead>
            )}
            <TableHead className="text-foreground">
              Performance
            </TableHead>
            <TableHead className="text-foreground">
              Date
            </TableHead>
            <TableHead className="text-foreground">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>
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
                  <TableHead className="text-foreground text-lg">
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
                  </TableHead>
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
                          return priceTypeOrder.findIndex((orderType) =>
                            priceType
                              ?.toLowerCase()
                              .startsWith(orderType.toLowerCase())
                          );
                        };

                        const indexA = getPriceTypeIndex(
                          a.price_type_desc || ''
                        );
                        const indexB = getPriceTypeIndex(
                          b.price_type_desc || ''
                        );
                        if (indexA !== -1 && indexB !== -1) {
                          return indexA - indexB;
                        }
                        if (indexA !== -1) return -1;
                        if (indexB !== -1) return 1;
                        return (a.price_type_desc || '').localeCompare(
                          b.price_type_desc || ''
                        );
                      }
                      return timeComparison;
                    })
                    .map((record) => {
                      const formattedDate = formatDateForUI(record?.perf_dt);
                      return (
                        <TableRow
                          key={
                            record.id +
                            (record?.price_type_id?.toString() || '')
                          }
                        >
                          <TableCell className="text-foreground hidden">
                            {record.theater}
                          </TableCell>
                          <TableCell className="text-foreground pl-8">
                            {record.production_season}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {record.attendance}
                          </TableCell>
                          <TableCell>
                            <span className="text-foreground">
                              ${record.revenue}
                            </span>
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
                            <span className="text-foreground">
                              {record.production}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-foreground">
                              {formattedDate}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-foreground">
                              {hiddenTimes.includes(record.perf_time)
                                ? '---'
                                : record.perf_time}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {/* Section totals (always visible) */}
                <TableRow className="bg-muted font-bold text-lg">
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
          <TableRow className="bg-muted/50 font-bold text-lg">
            <TableCell className="hidden"></TableCell>
            <TableCell className="pl-8">Daily Revenue Total</TableCell>
            <TableCell></TableCell>
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
