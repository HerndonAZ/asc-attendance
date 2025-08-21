'use client';
import { Button } from '@/ui/ui/button';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { AiOutlineExport } from 'react-icons/ai';
function DownloadAsCSV({ csvData, date }: any) {
  const [tip, showTip] = useState(false);
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const currentDate = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  const yesterday = new Date(Date.now() - tzoffset - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, -1);

  const csvDate = date === 'yesterday' ? yesterday : currentDate;
  return (
    <div className="relative">
      {tip && (
        <div className="absolute bottom-12 w-24 text-xs hidden sm:flex">
          Export as CSV
        </div>
      )}
      <CSVLink
        filename={(csvDate + '-rta-report.csv').toString()}
        data={csvData}
      >
        <Button
          onMouseEnter={() => showTip(true)}
          onMouseLeave={() => showTip(false)}
          className="border-2 border-gray-200 dark:border-gray-800 bg-[#80298F] hover:bg-[#4d1b56]"
        >
          <AiOutlineExport className="text-xl " />
        </Button>
      </CSVLink>
    </div>
  );
}

export default DownloadAsCSV;
