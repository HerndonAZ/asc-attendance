'use client';
import { Button } from '@tremor/react';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { AiOutlineExport } from "react-icons/ai";
function DownloadAsCSV({ csvData, date }: any) {
  const [tip, showTip] = useState(false);
  const csvDate = date === 'yesterday' ? new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString() : new Date().toISOString();
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
          className=""
        >
          <AiOutlineExport className="text-xl " />
        </Button>
      </CSVLink>
    </div>
  );
}

export default DownloadAsCSV;
