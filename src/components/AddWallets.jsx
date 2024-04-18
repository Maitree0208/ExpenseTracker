import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, ListSubheader, TextField, Button } from '@mui/material';
import axios from 'axios';

const AddWalletComponent = ({ email }) => {
  const [walletName, setWalletName] = useState('');
  const [initialAmount, setInitialAmount] = useState('');

  const handleAddWallet = () => {
    console.log(email);
    axios.post('http://localhost:8000/update-wallet', {
      email: email,
      walletName: walletName,
      balance: initialAmount
    })
    .then(response => {
      // Handle success response
      console.log('Wallet added successfully:', response.data);
      // You can perform additional actions after successful addition
    })
    .catch(error => {
      // Handle error
      console.error('Error adding wallet:', error);
    });
  };

  return (
    <List
      className="ExpenseForm-container"
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" className="ExpenseForm-header">
          Add Wallets
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemText primary="Name :" sx={{ pr: 5 }} />
        <TextField
          id="outlined-password-input"
          label="Wallet Name"
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
        />
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Initial Amount :" />
        <TextField
          id="outlined-password-input"
          label="Initial Amount"
          type="number"
          value={initialAmount}
          onChange={(e) => setInitialAmount(e.target.value)}
        />
      </ListItemButton>

      <Button id="ExpenseForm-button" variant="contained" onClick={handleAddWallet}>
        Add Wallet
      </Button>
    </List>
  );
};

export default AddWalletComponent;
