import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function List_From({ onChange }) {
  const handleInputChange = (event) => {
    // Check if event.target is defined
    if (event.target) {
      // Call the onChange handler with the new value
      onChange(event.target.value);
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
