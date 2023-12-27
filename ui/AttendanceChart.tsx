import React from 'react'
import { AttendanceRecord } from '../lib/types'
import { Card, Title, Text } from '@tremor/react'
import Search from '../app/search'
import { AttendanceTable } from './AttendanceTable'

const AttendanceChart = ({records}:{records: AttendanceRecord[]}) => {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
    <h1 className='text-black dark:text-white'>Realtime Attendance</h1>
    <Text  className='text-gray-900 dark:text-gray-100'>Arizona Science Center realtime attendance reporting</Text>
    <Search />
    <Card  className="mt-6 bg-white dark:bg-gray-800  border border-gray-100 dark:border-gray-700">
      <AttendanceTable records={records} />
    </Card>
  </main>
  )
}

export default AttendanceChart