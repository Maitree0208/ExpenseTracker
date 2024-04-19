import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ExpenseForm from './ExpenseForm'; // Import the ExpenseForm component
import ExpenseForm_Transfer from './ExpenseForm_Transfer'; // Import the ExpenseForm_Transfer component
import ExpenseForm_Income from './ExpenseForm_Income';

function Tabs_Expense() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'lightblue', minHeight: '100vh', padding: '20px' }}> {/* Set background color and padding */}
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Expense" />
        <Tab label="Transfer" />
        <Tab label="Income" />
      </Tabs>
      {/* Conditionally render the appropriate form component based on the selected tab */}
      {value === 0 && <ExpenseForm />}
      {value === 1 && <ExpenseForm_Transfer />}
      {value === 2 && <ExpenseForm_Income />}
    </Box>
  );
}

export default Tabs_Expense;
