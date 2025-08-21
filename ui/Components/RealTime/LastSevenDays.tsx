'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/ui/chart';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
        
        // Calculate the last 7 days from today
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6); // 7 days total (today + 6 previous days)
        
        const aggregated: Record<
          string,
          { attendance: number; revenue: number }
        > = {};

        // Initialize all 7 days with 0 values
        for (let i = 0; i < 7; i++) {
          const date = new Date(sevenDaysAgo);
          date.setDate(sevenDaysAgo.getDate() + i);
          const dateKey = date.toISOString().split('T')[0];
          aggregated[dateKey] = { attendance: 0, revenue: 0 };
        }

        // Aggregate data using reduce instead of forEach
        json.reduce((acc: any, record: any) => {
          const recordDate = record.perf_dt?.split('T')[0];
          if (!recordDate) return acc;
          
          // Only include records from the last 7 days
          const perfDate = new Date(recordDate);
          if (perfDate >= sevenDaysAgo && perfDate <= today) {
            if (!acc[recordDate]) {
              acc[recordDate] = { attendance: 0, revenue: 0 };
            }
            acc[recordDate].attendance += record.attendance || 0;
            acc[recordDate].revenue += record.revenue || 0;
          }
          return acc;
        }, aggregated);

        const formatted = Object.entries(aggregated)
          .map(([date, values]) => ({
            date,
            Attendance: values.attendance,
            Revenue: values.revenue
          }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        console.log('Last 7 days data:', formatted);

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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const chartConfig = {
    Attendance: {
      label: "Attendance",
      color: "#3b82f6",
    },
    Revenue: {
      label: "Revenue",
      color: "#10b981",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="Attendance"
          stroke={chartConfig.Attendance.color}
          fill={chartConfig.Attendance.color}
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="Revenue"
          stroke={chartConfig.Revenue.color}
          fill={chartConfig.Revenue.color}
          fillOpacity={0.3}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default LastSevenDays;
