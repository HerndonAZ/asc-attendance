'use client' 
import React, { useEffect } from 'react';
import { AttendanceRecord } from '../lib/types';
import { Card, Text, Flex, Button } from '@tremor/react';
import Search from './Components/Search';
import { AttendanceTable } from './AttendanceTable';
import DateRangePicker from './Components/DateRangePicker';
import { Select, SelectItem } from '@tremor/react';
import { useState } from 'react';
import RefreshButton from './Buttons/RefreshButton';
import { fetchTess } from '../lib/db';
import Loading from '../app/loading';

const AttendanceChart = ({
  records,
}: {
  records: AttendanceRecord[];
}) => {
  const [value, setValue] = useState('today');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchNeeded, setFetchNeeded] = useState(true);

  const fetchData = async (date: string) => {
    try {
      setLoading(true);
      const { data, time }: any = await fetchTess(null, date);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      if (fetchNeeded) {
        if (value === 'today') {
          if (records) {
            setData(records);
            setLoading(false);
          } else {
            fetchData('today');
          }
        } else if (value === 'yday') {
          fetchData('yday');
        }
        setFetchNeeded(false);
      }
    };

    fetchDataIfNeeded();
  }, [records, value, fetchNeeded]);

  const handleRefresh = () => {
    setFetchNeeded(true);
  };

  if (loading) {
    return <Loading />;
  }

  return data && !loading && (
    <div className="p-4 md:p-10 mx-auto max-w-7xl relative">
      <h1 className="text-black dark:text-white">Realtime Attendance</h1>
      <Text className="text-gray-900 dark:text-gray-100">
        Arizona Science Center realtime attendance reporting
      </Text>
      <Flex className="md:flex-row  flex-col hidden">
        <Search records={data} />
        <DateRangePicker />
      </Flex>
      <Flex className="h-fit items-center mt-6">
        <Select defaultValue={value} onValueChange={(v: any) => setValue(v)} className="w-40">
          <SelectItem className=" " value="today">
            Today
          </SelectItem>
          <SelectItem className=" " value="yday">
            Yesterday
          </SelectItem>
        </Select>
        <RefreshButton disabled={value === 'yday'} onClick={handleRefresh} />
      </Flex>
      <Card className="mt-6 bg-white dark:bg-gray-800">
        <AttendanceTable records={data} />
      </Card>
    </div>
  );
};

export default AttendanceChart;
