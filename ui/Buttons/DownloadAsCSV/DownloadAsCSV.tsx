'use client'
import React, { useState } from 'react'
import { Button } from '@tremor/react'
import { IoDownload } from 'react-icons/io5'
import { CSVLink } from "react-csv";
function DownloadAsCSV({csvData}: any) {
    const [tip, showTip] = useState(false)
    // const csvData = [
    //     ["firstname", "lastname", "email"],
    //     ["Ahmed", "Tomi", "ah@smthing.co.com"],
    //     ["Raed", "Labes", "rl@smthing.co.com"],
    //     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    //   ];


      
  return (
    <div className='relative'>
        {tip && 
        <div className='absolute left-16 w-24 text-xs hidden sm:flex'>
            Download as CSV
        </div>}
        <CSVLink 
        filename={new Date().toISOString() + "-rta-report.csv"}
        data={csvData}>
        <Button onMouseEnter={() =>showTip(true)} onMouseLeave={() =>showTip(false)} className=''>
            <IoDownload className='text-xl '/>
        </Button>
        </CSVLink>
    </div>
  )
}

export default DownloadAsCSV