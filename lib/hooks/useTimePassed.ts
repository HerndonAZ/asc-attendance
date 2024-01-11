// useTimePassed.tsx
'use client'
import { useEffect, useState } from 'react';

const useTimePassed = (timestamp: string) => {
  const [timePassed, setTimePassed] = useState('');

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const now = new Date();
      const updatedTime = new Date(timestamp);
      const diffInSeconds = Math.floor((now.getTime() - updatedTime.getTime()) / 1000);

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      const formattedTime = `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''} ${seconds}s ago`;
      setTimePassed(formattedTime.toString());
    }, 1000); // Update every second

    return () => clearInterval(updateInterval);
  }, [timestamp]);

  return timePassed;
};

export default useTimePassed;
