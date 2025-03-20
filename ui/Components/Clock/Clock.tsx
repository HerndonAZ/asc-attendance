'use client';
import { useEffect, useState } from 'react';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div
      suppressHydrationWarning
      className="flex h-full items-center text-sm text-white"
    >
      {date.toLocaleTimeString()}
    </div>
  );
}

export default Clock;
