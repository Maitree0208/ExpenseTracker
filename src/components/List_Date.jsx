import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

function List_Date({ value, onChange }) {
  // Convert the value to a valid Date object or null
  const formattedValue = value ? Dayjs(value).toDate() : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={formattedValue}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}

export default List_Date;
