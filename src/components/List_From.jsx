import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function List_From({ onChange }) {
  const handleInputChange = (event) => {
    // Ensure event is defined and has a target property
    if (event && event.target) {
      // Extract the value directly from the event
      const newValue = event.target.value;

      // Call the onChange handler with the new value
      onChange(newValue);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange} // Call handleInputChange on input change
        />
      </div>
    </Box>
  );
}

export default List_From;
