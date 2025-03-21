'use client';
import useTimePassed from '@/lib/hooks/useTimePassed';
import DownloadAsCSV from '@/ui/Buttons/DownloadAsCSV';
import RefreshButton from '@/ui/Buttons/RefreshButton';
import {
  Button,
  Card,
  DateRangePicker,
  Flex,
  Select,
  SelectItem,
  Text
} from '@tremor/react';

//import { TabsContent, TabsTrigger, TabsList, Tabs } from '../Tremor/Components';
import Loading from 'app/loading';
import { AttendanceRecord } from 'lib/types';
import { Suspense, useEffect } from 'react';
import { BsViewStacked } from 'react-icons/bs';
import { TfiViewList } from 'react-icons/tfi';
import Search from '../Search';
import { AttendanceTable } from './AttendanceTable';
import { getTableData } from './actions';
import { useRealTimeStore } from './store';

const AttendanceWrapper = ({
  initialData,
  previousDayData,
  timeUpdated,
  last7days
}: {
  initialData: AttendanceRecord[];
  previousDayData: AttendanceRecord[];
  timeUpdated: string;
  last7days: AttendanceRecord[] | undefined;
}) => {
  const {
    setLoading,
    setInitialDataLoaded,
    setDay,
    setRealTimeData: setData,
    loading,
    initialDataLoaded,
    data,
    day,
    //setUseMerged,
    useMerged,
    toggleView
  } = useRealTimeStore();

  useEffect(() => {
    if (data) {
      getTableData({ data, useMerged });
    }
  }, [useMerged, data]); // Add data as a dependency if it's used inside getTableData

  const dataToDisplay = getTableData({ data, useMerged });

  const handleSetDate = (date: string) => {
    setLoading(true);

    if (date === 'today') {
      // console.log(initialData)
      setData(initialData);
    }

    if (date === 'yesterday') {
      setData(previousDayData || []);
    }

    if (date === 'last7days') {
      setData(last7days || []);
    }
    setDay(date);
    setLoading(false);
  };

  useEffect(() => {
    if (initialData && !initialDataLoaded) {
      setData(initialData);
      setInitialDataLoaded(true);
      // last7days()
    }
  }, [initialData, initialDataLoaded]);

  if (loading) {
    return <Loading />;
  }

  return (
    (dataToDisplay || initialData) &&
    !loading && (
      <div className="p-4 md:p-10 mx-auto max-w-7xl relative">
        <Suspense>
          <h1 className="text-black dark:text-white text-xl font-bold uppercase">
            Realtime Attendance
          </h1>
          <Text className="text-gray-900 dark:text-gray-100">
            Arizona Science Center realtime attendance and revenue reporting
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
                onValueChange={(v) => handleSetDate(v)}
                className="w-40"
              >
                <SelectItem className=" " value="today">
                  Today
                </SelectItem>
                <SelectItem className=" " value="yesterday">
                  Yesterday
                </SelectItem>
                <SelectItem className="hidden" value="last7days">
                  Last 7 Days
                </SelectItem>
              </Select>
            </Flex>
            <Flex className="justify-end space-x-4">
              <div hidden={day === 'yesterday'}>
                <Text className="text-xs italic">Last Updated</Text>
                <Text className="text-xs">{useTimePassed(timeUpdated)}</Text>
              </div>
              <RefreshButton disabled={day === 'yesterday'} />
              <div className="hidden">
                <Button onClick={toggleView}>
                  {useMerged ? (
                    <BsViewStacked className="text-xl" />
                  ) : (
                    <TfiViewList className="text-xl" />
                  )}
                </Button>
              </div>
              {data && (
                <div className="hidden sm:block">
                  <DownloadAsCSV csvData={data} date={day} />
                </div>
              )}
            </Flex>
          </Flex>
          {dataToDisplay && day !== 'last7days' && (
            <Card className="mt-6 bg-white dark:bg-gray-800 ">
              <AttendanceTable records={dataToDisplay} />
            </Card>
          )}
          {dataToDisplay && day === 'last7days' && last7days && (
            <Suspense>
              <Card className="mt-6 bg-white dark:bg-gray-800 ">
                7 days update
                {JSON.stringify(last7days)}
              </Card>
            </Suspense>
          )}
        </Suspense>
      </div>
    )
  );
};

export default AttendanceWrapper;
