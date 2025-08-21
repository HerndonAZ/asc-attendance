'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Text } from '@tremor/react';
import { AvailableChartColors } from 'lib/tremor/chartUtls';

interface SevenDayData {
  date: string;
  Attendance: number;
  Revenue: number;
}

function LastSevenDays() {
  const [data, setData] = useState<SevenDayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/getLast7Days');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await res.json();
        const aggregated: Record<
          string,
          { attendance: number; revenue: number }
        > = {};

        json.forEach((record: any) => {
          const date = record.perf_dt?.split('T')[0];
          if (!date) return;
          if (!aggregated[date]) {
            aggregated[date] = { attendance: 0, revenue: 0 };
          }
          aggregated[date].attendance += record.attendance || 0;
          aggregated[date].revenue += record.revenue || 0;
        });

        const formatted = Object.entries(aggregated)
          .map(([date, values]) => ({
            date,
            Attendance: values.attendance,
            Revenue: values.revenue
          }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setData(formatted);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text className="text-red-500">{error}</Text>;
  }

  return (
    <AreaChart
      className="h-80"
      data={data}
      index="date"
      categories={['Attendance', 'Revenue']}
      colors={[AvailableChartColors[0], AvailableChartColors[1]]}
      valueFormatter={(value: number) => value.toString()}
    />
  );
}

export default LastSevenDays;
