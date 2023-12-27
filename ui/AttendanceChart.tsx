import React from 'react'
import { AttendanceRecord } from '../lib/types'
import { Card, Title, Text } from '@tremor/react'
import Search from '../app/search'
import { AttendanceTable } from './AttendanceTable'

const AttendanceChart = ({records}:{records: AttendanceRecord[]}) => {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
    <Title>Realtime Attendance</Title>
    <Text>Arizona Science Center realtime attendance reporting</Text>
    <Search />
    <Card className="mt-6">
      <AttendanceTable records={records} />
    </Card>
  </main>
  )
}

export default AttendanceChart