'use client';
import { AttendanceRecord } from '../lib/types';
import { Card, Text, Flex, Button } from '@tremor/react';
import Search from './Components/Search';
import { AttendanceTable } from './AttendanceTable';
import DateRangePicker from './Components/DateRangePicker';
import { Select, SelectItem } from '@tremor/react';
import { useEffect, useState, useTransition } from 'react';
import RefreshButton from './Buttons/RefreshButton';
import { fetchTess } from '../lib/db';
import Loading from '../app/loading';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCreateQueryString } from '../lib/hooks/createQueryString';

const AttendanceChart = ({
  initialData,
  previousDayData
}: {
  initialData: AttendanceRecord[];
  previousDayData: AttendanceRecord[]
}) => {
  const [data, setData] = useState<any>(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState('today')
  // console.log(queryDate);
  const handleSetDate = (date: string) => {
    setLoading(true);

    if (date === 'today') {
      console.log(initialData)
      setData(initialData)
    }

    if (date === "yesterday") {
      setData(previousDayData || [])
    }
    setDay(date)
    setLoading(false);

  };
  useEffect(() => {
    if (initialData && !initialDataLoaded) {
      setData(initialData);
      setInitialDataLoaded(true);
    }
  }, [initialData, initialDataLoaded]);

  if (loading) {
    return <Loading />;
  }

  return (
    (data || initialData) &&
    !loading && (
      <div className="p-4 md:p-10 mx-auto max-w-7xl relative">
        <h1 className="text-black dark:text-white">Realtime Attendance</h1>
        <Text className="text-gray-900 dark:text-gray-100">
          Arizona Science Center realtime attendance reporting
        </Text>
        <Flex className="md:flex-row  flex-col hidden">
          <Search records={data || initialData} />
          <DateRangePicker />
        </Flex>
        <Flex className="h-fit items-center mt-6">
          <Flex className="justify-start space-x-2">
            <Select
              //  disabled
              enableClear={false}
              defaultValue={day}
              onValueChange={(v) => handleSetDate(v)
              }
              className="w-40"
            >
              <SelectItem className=" " value="today">
                Today
              </SelectItem>
              <SelectItem className=" " value="yesterday">
                Yesterday
              </SelectItem>
            </Select>
    
          </Flex>
          <RefreshButton disabled={day === 'yesterday'} />
        </Flex>
        <Card className="mt-6 bg-white dark:bg-gray-800 ">
          <AttendanceTable records={data || initialData} />
        </Card>
      </div>
    )
  );
};

export default AttendanceChart;
