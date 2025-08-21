'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [
  {
    Month: 'Jan 21',
    Sales: 2890,
    Profit: 2400
  },
  {
    Month: 'Feb 21',
    Sales: 1890,
    Profit: 1398
  },
  {
    Month: 'Jan 22',
    Sales: 3890,
    Profit: 2980
  }
];

export default function Example() {
  const chartConfig = {
    Sales: {
      label: "Sales",
      color: "#6366f1",
    },
    Profit: {
      label: "Profit",
      color: "#d946ef",
    },
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Performance</CardTitle>
        <p className="text-sm text-muted-foreground">Comparison between Sales and Profit</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis 
              tickFormatter={(value) => 
                `$${Intl.NumberFormat('us').format(value)}`
              }
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value) => [
                `$${Intl.NumberFormat('us').format(value as number)}`,
                ""
              ]}
            />
            <Area
              type="monotone"
              dataKey="Sales"
              stroke={chartConfig.Sales.color}
              fill={chartConfig.Sales.color}
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="Profit"
              stroke={chartConfig.Profit.color}
              fill={chartConfig.Profit.color}
              fillOpacity={0.3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
