'use client'
import React, { useState } from 'react'
import { DateRangePicker as RangePicker, DateRangePickerValue } from "@tremor/react";
import { DateRangePickerItem} from "@tremor/react";



function DateRangePicker() {
    const [value, setValue] = useState<DateRangePickerValue>({
        from: new Date(2023, 1, 1),
        to: new Date(),
      });
    
      return (
        <RangePicker
          className="max-w-md  mt-5 "
          value={value}
          onValueChange={setValue}
          //locale={es}
          selectPlaceholder="Select range"
          color="rose"
        >
          <DateRangePickerItem className='p-2.5' key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
            YTD
          </DateRangePickerItem>
          <DateRangePickerItem
            key="half"
            value="half"
            from={new Date(2023, 0, 1)}
            to={new Date(2023, 5, 31)}
          >
            Quarter
          </DateRangePickerItem>
        </RangePicker>
      );
    }

export default DateRangePicker