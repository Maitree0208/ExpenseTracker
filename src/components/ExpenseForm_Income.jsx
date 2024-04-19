import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

function ExpenseForm_Income() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [walletNames, setWalletNames] = useState([]);

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    // Fetch wallet names from backend API
    const email = localStorage.getItem("email");
    axios.post('http://localhost:8000/wallet-names',{email : email})
      .then(response => {
        const { walletNames } = response.data; // Destructure walletNames from response.data
        setWalletNames(walletNames);
      })
      .catch(error => {
        console.error('Error fetching wallet names:', error);
      });
  }, []);


  const handleSubmit = () => {
    // Construct your payload
    const formData = {
      to: to,
      amount: amount,
      note: note,
      date: date
    };

    console.log(formData);
    // Send the data to the backend
    // fetch('your-backend-url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   // Reset form fields if needed
    //   setTo('');
    //   setAmount('');
    //   setNote('');
    //   setDate('');
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
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
        <ListItemText primary="To:" sx={{ pr: 5 }} />
        <List_Wallet onChange={handleToChange}></List_Wallet>
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Amount:" />
        <List_From onChange={handleAmountChange} />
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Note:" sx={{ pr: 5 }} />
        <List_Note onChange={handleNoteChange}></List_Note>
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Date:" sx={{ pr: 5 }} />
        <List_Date onChange={handleDateChange}></List_Date>
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

export default ExpenseForm_Income;
