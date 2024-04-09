import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

 function List_Account() {
  const handleClick = () => {
    variant="filled"
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Cash"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="Savings"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="Credit"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      
    </Stack>
  );
}

export default List_Account; 
