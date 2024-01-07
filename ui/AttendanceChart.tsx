'use client';
import React from 'react';
import { AttendanceRecord } from '../lib/types';
import { Card, Text, Flex, Button } from '@tremor/react';
import Search from './Components/Search';
import { AttendanceTable } from './AttendanceTable';
import DateRangePicker from './Components/DateRangePicker';
import { Select, SelectItem } from '@tremor/react';
import { useState } from 'react';
import { IoRefresh } from 'react-icons/io5';
import RefreshButton from './Buttons/RefreshButton';
const AttendanceChart = ({
  records,
  onRequest
}: {
  records: AttendanceRecord[];
  onRequest?: any;
}) => {
  const [value, setValue] = useState('today');
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl relative">
      <h1 className="text-black dark:text-white">Realtime Attendance</h1>
      <Text className="text-gray-900 dark:text-gray-100">
        Arizona Science Center realtime attendance reporting
      </Text>
      <Flex className="md:flex-row  flex-col hidden">
        <Search records={records} />
        <DateRangePicker />
      </Flex>
      <Flex className="h-fit items-center mt-6">
        <Select className=" w-40">
          <SelectItem className=" " value="today">Today</SelectItem>
          <SelectItem className=" " value="yday">Yesterday</SelectItem>
        </Select>
        <RefreshButton />
      </Flex>
      <Card className="mt-6 bg-white dark:bg-gray-800 ">
        <AttendanceTable records={records} />
      </Card>
    </div>
  );

  
};

export default AttendanceChart;
