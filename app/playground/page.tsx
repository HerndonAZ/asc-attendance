'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/ui/card';
import { Progress } from '@/ui/ui/progress';
import Chart from './chart';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

export default function PlaygroundPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <CardHeader>
              <CardTitle>{item.category}</CardTitle>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{item.stat}</span>
                <span className="text-sm text-muted-foreground">Total views</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Pages</span>
                <span>Views</span>
              </div>
              <div className="space-y-3">
                {item.data.map((dataItem, index) => {
                  const maxValue = Math.max(...item.data.map(d => d.value));
                  const percentage = (dataItem.value / maxValue) * 100;
                  return (
                    <div key={dataItem.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="truncate">{dataItem.name}</span>
                        <span>{Intl.NumberFormat('us').format(dataItem.value)}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Chart />
    </main>
  );
}
