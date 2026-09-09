// 'use client';
// import useTimePassed from '@/lib/hooks/useTimePassed';
// import DownloadAsCSV from '@/ui/Buttons/DownloadAsCSV';
// import RefreshButton from '@/ui/Buttons/RefreshButton';
// import { Button } from '@/ui/ui/button';
// import { Card } from '@/ui/ui/card';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/ui/ui/select';

// //import { TabsContent, TabsTrigger, TabsList, Tabs } from '../Tremor/Components';
// import Loading from 'app/loading';
// import { AttendanceRecord } from 'lib/types';
// import { Suspense, useEffect } from 'react';
// import { BsViewStacked } from 'react-icons/bs';
// import { TfiViewList } from 'react-icons/tfi';
// import Search from '../Search';
// import { AttendanceTable } from './AttendanceTable';
// import LastSevenDays from './LastSevenDays';
// import { getTableData } from './actions';
// import { useRealTimeStore } from './store';

// const AttendanceWrapper = ({
//   initialData,
//   previousDayData,
//   timeUpdated
// }: {
//   initialData: AttendanceRecord[];
//   previousDayData: AttendanceRecord[];
//   timeUpdated: string;
// }) => {
//   const {
//     setLoading,
//     setInitialDataLoaded,
//     setDay,
//     setRealTimeData: setData,
//     loading,
//     initialDataLoaded,
//     data,
//     day,
//     //setUseMerged,
//     useMerged,
//     toggleView
//   } = useRealTimeStore();

//   useEffect(() => {
//     if (data) {
//       getTableData({ data, useMerged });
//     }
//   }, [useMerged, data]); // Add data as a dependency if it's used inside getTableData

//   const dataToDisplay = getTableData({ data, useMerged });

//   const handleSetDate = (date: string) => {
//     setLoading(true);

//     if (date === 'today') {
//       // console.log(initialData)
//       setData(initialData);
//     }

//     if (date === 'yesterday') {
//       setData(previousDayData || []);
//     }

//     if (date === 'last7days') {
//       setData(null);
//     }
//     setDay(date);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (initialData && !initialDataLoaded) {
//       setData(initialData);
//       setInitialDataLoaded(true);
//       // last7days()
//     }
//   }, [initialData, initialDataLoaded]);

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     (dataToDisplay || initialData) &&
//     !loading && (
//       <div className="p-4 md:p-10 mx-auto max-w-7xl relative">
//         <Suspense>
//           <h1 className=" text-xl font-bold uppercase">Realtime Attendance</h1>
//           <p className="text-foreground">
//             Arizona Science Center realtime attendance and revenue reporting
//           </p>
//           <div className="md:flex-row  flex-col hidden">
//             <Search records={data || initialData} />
//             {/* DateRangePicker placeholder - implement with Calendar + Popover if needed */}
//           </div>
//           <div className="h-fit items-center mt-6 flex justify-between">
//             <div className="justify-start space-x-2">
//               <Select
//                 //  disabled
//                 defaultValue={day}
//                 onValueChange={(v) => handleSetDate(v)}
//               >
//                 <SelectTrigger className="w-40 dark:bg-gray-900 bg-gray-100">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="dark:bg-gray-900 bg-gray-100">
//                   <SelectItem value="today">Today</SelectItem>
//                   <SelectItem value="yesterday">Yesterday</SelectItem>
//                   <SelectItem value="last7days">Last 7 Days</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="justify-end space-x-4 flex text-white">
//               <div
//                 className="text-black dark:text-white"
//                 hidden={day === 'yesterday'}
//               >
//                 <p className="text-xs italic">Last Updated</p>
//                 <p className="text-xs">{useTimePassed(timeUpdated)}</p>
//               </div>
//               <RefreshButton disabled={day === 'yesterday'} />
//               <div className="hidden">
//                 <Button onClick={toggleView}>
//                   {useMerged ? (
//                     <BsViewStacked className="text-xl" />
//                   ) : (
//                     <TfiViewList className="text-xl" />
//                   )}
//                 </Button>
//               </div>
//               {data && (
//                 <div className="hidden sm:block">
//                   <DownloadAsCSV csvData={data} date={day} />
//                 </div>
//               )}
//             </div>
//           </div>
//           {dataToDisplay && day !== 'last7days' && (
//             <Card className="mt-6">
//               <AttendanceTable records={dataToDisplay} />
//             </Card>
//           )}
//           {day === 'last7days' && (
//             <Suspense>
//               <Card className="mt-6">
//                 <LastSevenDays />
//               </Card>
//             </Suspense>
//           )}
//         </Suspense>
//       </div>
//     )
//   );
// };

// export default AttendanceWrapper;

'use client';

import useTimePassed from '@/lib/hooks/useTimePassed';
import DownloadAsCSV from '@/ui/Buttons/DownloadAsCSV';
import RefreshButton from '@/ui/Buttons/RefreshButton';
import { Button } from '@/ui/ui/button';
import { Card } from '@/ui/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/ui/ui/select';

import { AttendanceRecord } from 'lib/types';
import { Suspense, useEffect, useMemo } from 'react';
import { BsViewStacked } from 'react-icons/bs';
import { TfiViewList } from 'react-icons/tfi';
import Search from '../Search';
import { AttendanceTable } from './AttendanceTable';
import LastSevenDays from './LastSevenDays';
import { getTableData } from './actions';
import { useRealTimeStore } from './store';

interface AttendanceWrapperProps {
  initialData: AttendanceRecord[];
  previousDayData: AttendanceRecord[];
  timeUpdated: string;
}

const AttendanceWrapper = ({
  initialData = [],
  previousDayData = [],
  timeUpdated
}: AttendanceWrapperProps) => {
  const {
    setLoading,
    setInitialDataLoaded,
    setDay,
    setRealTimeData: setData,
    loading,
    initialDataLoaded,
    data,
    day,
    useMerged,
    toggleView
  } = useRealTimeStore();

  // 1. Initialize Zustand Store with Server Data on mount
  useEffect(() => {
    if (initialData && !initialDataLoaded) {
      setData(Array.isArray(initialData) ? initialData : []);
      setInitialDataLoaded(true);
    }
  }, [initialData, initialDataLoaded, setData, setInitialDataLoaded]);

  // 2. Compute table data safely using useMemo (prevents infinite re-renders)
  const dataToDisplay = useMemo(() => {
    const activeData = data || initialData;
    if (!activeData || !Array.isArray(activeData)) return [];
    
    const result = getTableData({ data: activeData, useMerged });
    return Array.isArray(result) ? result : [];
  }, [data, initialData, useMerged]);

  // 3. Handle Date Switcher
  const handleSetDate = (date: string) => {
    setLoading(true);
    setDay(date);

    if (date === 'today') {
      setData(Array.isArray(initialData) ? initialData : []);
    } else if (date === 'yesterday') {
      setData(Array.isArray(previousDayData) ? previousDayData : []);
    } else if (date === 'last7days') {
      setData([]);
    }
    
    setLoading(false);
  };

  const currentRecords = Array.isArray(data) ? data : initialData;

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl relative">
      <Suspense fallback={<div className="p-4">Loading attendance views...</div>}>
        <h1 className="text-xl font-bold uppercase">Realtime Attendance</h1>
        <p className="text-foreground">
          Arizona Science Center realtime attendance and revenue reporting
        </p>

        <div className="md:flex-row flex-col hidden">
          {Array.isArray(currentRecords) && <Search records={currentRecords} />}
        </div>

        <div className="h-fit items-center mt-6 flex justify-between">
          <div className="justify-start space-x-2">
            <Select
              defaultValue={day || 'today'}
              onValueChange={handleSetDate}
            >
              <SelectTrigger className="w-40 dark:bg-gray-900 bg-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-900 bg-gray-100">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="justify-end space-x-4 flex text-white">
            {day !== 'yesterday' && (
              <div className="text-black dark:text-white">
                <p className="text-xs italic">Last Updated</p>
                <p className="text-xs">{useTimePassed(timeUpdated)}</p>
              </div>
            )}
            
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

            {Array.isArray(data) && data.length > 0 && (
              <div className="hidden sm:block">
                <DownloadAsCSV csvData={data} date={day} />
              </div>
            )}
          </div>
        </div>

        {/* Render Table or Last 7 Days view */}
        {day !== 'last7days' ? (
          <Card className="mt-6">
            <AttendanceTable records={dataToDisplay} />
          </Card>
        ) : (
          <Suspense fallback={<div className="p-4">Loading historical data...</div>}>
            <Card className="mt-6">
              <LastSevenDays />
            </Card>
          </Suspense>
        )}
      </Suspense>
    </div>
  );
};

export default AttendanceWrapper;
