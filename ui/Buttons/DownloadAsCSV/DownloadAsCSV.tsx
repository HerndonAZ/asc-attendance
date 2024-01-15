'use client';
import { Button } from '@tremor/react';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { IoDownload } from 'react-icons/io5';
function DownloadAsCSV({ csvData, date }: any) {
  const [tip, showTip] = useState(false);
  const csvDate = date === 'yesterday' ? new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString() : new Date().toISOString();
  return (
    <div className="relative">
      {tip && (
        <div className="absolute left-16 w-24 text-xs hidden sm:flex">
          Download as CSV
        </div>
      )}
      <CSVLink
        filename={(csvDate + '-rta-report.csv').toString()}
        data={csvData}
      >
        <Button
          onMouseEnter={() => showTip(true)}
          onMouseLeave={() => showTip(false)}
          className=""
        >
          <IoDownload className="text-xl " />
        </Button>
      </CSVLink>
    </div>
  );
}

export default DownloadAsCSV;
