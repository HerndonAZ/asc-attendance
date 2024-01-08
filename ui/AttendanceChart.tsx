'use client';
import React, { useEffect } from 'react';
import { AttendanceRecord } from '../lib/types';
import { Card, Text, Flex, Button } from '@tremor/react';
import Search from './Components/Search';
import { AttendanceTable } from './AttendanceTable';
import DateRangePicker from './Components/DateRangePicker';
import { Select, SelectItem } from '@tremor/react';
import { useState } from 'react';
import { IoRefresh } from 'react-icons/io5';
import RefreshButton from './Buttons/RefreshButton';
import { fetchTess } from '../lib/db';
import Loading from '../app/loading';

const AttendanceChart = ({
  records,
  onRequest
}: {
  records: AttendanceRecord[];
  onRequest?: any;
}) => {
  const [value, setValue] = useState('today');
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const fetchData = async (date: string) => {
    const {data, time}: any = await fetchTess(null, date)
   // console.log(time, 'TIME')
    const records = data?.Attendance_Update?.AttendanceUpdate;
    setData(records)
    setLoading(false)
    }
//console.log(value)
  useEffect(() => {
    if (records && value === 'today') {
      setData(records)
      setLoading(false)
      return
    }

    if (!records && value === 'today') {
      setLoading(true)
      fetchData('today')
      return
    }
  //  console.log(new Date())
    if (value === "yday"){
      setLoading(true)
      fetchData('yday')   
      return
    }
  },[records, value])

  if (loading){
    return (
      <Loading/>
    )
  } 


  // const options = { year: 'numeric' as const, month: '2-digit' as const, day: '2-digit' as const, timeZone: 'America/Phoenix' as const };
  // const getDate = date.toLocaleDateString('en-US', options);
  // const fetchDate = getDate // as YYYY-MM-DD
  // console.log(fetchDate, "FETCH DATE")
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
        <Select defaultValue={value} onValueChange={(v: any) => setValue(v) } className="w-40">
          <SelectItem className=" " value="today">Today</SelectItem>
          <SelectItem className=" " value="yday">Yesterday</SelectItem>
        </Select>
        <RefreshButton />
      </Flex>
      <Card className="mt-6 bg-white dark:bg-gray-800 ">
        <AttendanceTable records={data} />
      </Card>
    </div>
  );


};

export default AttendanceChart;
