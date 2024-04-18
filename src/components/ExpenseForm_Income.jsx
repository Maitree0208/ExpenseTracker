// ExpenseForm.js
import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List_From from './List_From';
import Button from '@mui/material/Button';
import './ExpenseForm_Income.css';
import List_Wallet from './List_Wallet';
import List_Note from './List_Note';
import List_Date from './List_Date';

function ExpenseForm_Income() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      className="ExpenseForm_Income-container"
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" className="ExpenseForm_Income-header">
          Expenses
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemText primary="To:" sx = {{pr: 5}}/>
        <List_Wallet></List_Wallet>
      </ListItemButton>
        

      <ListItemButton>
        <ListItemText primary="Amount:" />
        <List_From />
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Note:" sx = {{pr: 5}}/>
        <List_Note></List_Note>
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Date:" />
        <List_Date></List_Date>
    </ListItemButton> 

      <Button id = "ExpenseForm_Income-button" variant="contained"  onClick={() => console.log("Add Transfer clicked")}>
        Add Income
      </Button>
    </List>
  );
}

export default ExpenseForm_Income;
