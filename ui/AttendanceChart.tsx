import React from 'react';
import { AttendanceRecord } from '../lib/types';
import { Card, Title, Text, Flex } from '@tremor/react';
import Search from './Components/Search';
import { AttendanceTable } from './AttendanceTable';
import DateRangePicker from './Components/DateRangePicker';

const AttendanceChart = ({ records }: { records: AttendanceRecord[] }) => {
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl relative">
      <h1 className="text-black dark:text-white">Realtime Attendance</h1>
      <Text className="text-gray-900 dark:text-gray-100">
        Arizona Science Center realtime attendance reporting
      </Text>
     <Flex className='md:flex-row  flex-col'>
      <Search records={records}/>
      <DateRangePicker/>
      </Flex>
      <Card className="mt-6 bg-white dark:bg-gray-800 ">
        <AttendanceTable records={records} />
      </Card>
    </div>
  );
};

export default AttendanceChart;
