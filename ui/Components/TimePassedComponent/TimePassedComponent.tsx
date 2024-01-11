'use client';
// TimeSinceLastRequest.tsx
import { useEffect, useState } from 'react';

interface TimeSinceLastRequestProps {
  onRequest: () => Promise<void>;
}

const TimeSinceLastRequest: React.FC<TimeSinceLastRequestProps> = ({
  onRequest
}) => {
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);

  const fetchAndUpdateTime = async () => {
    await onRequest();
    setLastRequestTime(Date.now());
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndUpdateTime();
    };

    fetchData();
    const intervalId = setInterval(fetchAndUpdateTime, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [onRequest]);

  const handleManualUpdate = () => {
    fetchAndUpdateTime();
  };

  const timePassed = lastRequestTime
    ? Math.floor((Date.now() - lastRequestTime) / 1000)
    : 0;

  return (
    <div>
      <p>Time since last request: {timePassed} seconds</p>
      <button onClick={handleManualUpdate}>Update manually</button>
    </div>
  );
};

export default TimeSinceLastRequest;
