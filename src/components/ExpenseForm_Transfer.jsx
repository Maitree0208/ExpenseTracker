// ExpenseForm.js
import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import './ExpenseForm_Transfer.css';
import List_Wallet from './List_Wallet';
import List_Note from './List_Note';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

function ExpenseForm_Transfer() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  }
  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(dayjs(event).format('MM/DD/YYYY'));
  }

  const handleSubmit = () => {
    // Construct your payload
    const email = localStorage.getItem("email");
    const formData = {
      type:"transfer",
      to: to,
      from: from,
      amount: amount,
      note: note,
      date: date,
      email: email
    };

    // Send the data to the backend
    fetch('http://localhost:8000/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Reset form fields if needed
      setTo('');
      setAmount(0);
      setNote('');
      setDate('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <List
      className="ExpenseForm_Transfer-container"
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" className="ExpenseForm_Transfer-header">
          Transfer
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemText primary="From:" sx={{ pr: 5 }} />
        <List_Wallet onChange={handleFromChange}></List_Wallet>
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="To:" sx={{ pr: 5 }} />
        <List_Wallet onChange={handleToChange}></List_Wallet>
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Amount:" />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
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
              onInput={(e) => {
                const target = e.target;
                target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              InputProps={{
                inputProps: {
                  min: 1,
                  type: "text",
                  pattern: "[0-9]*"
                }
              }}
              onChange={handleAmountChange} // Call handleInputChange on input change
            />
          </div>
        </Box>
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Note:" sx={{ pr: 5 }} />
        <List_Note onChange={handleNoteChange}></List_Note>
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Date:" sx={{ pr: 5 }} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <DatePicker
                label="Date"
                format="YYYY-MM-DD"
                onChange={handleDateChange}
              />
            </div>
          </Box>
        </LocalizationProvider>
      </ListItemButton>

      <Button
        id="ExpenseForm_Income-button"
        variant="contained"
        onClick={handleSubmit}
      >
        Add Income
      </Button>
    </List>
  );
}

export default ExpenseForm_Transfer;
