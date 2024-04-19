import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function List_Wallet({ value, onChange }) {
  const theme = useTheme();
  const [walletNames, setWalletNames] = useState([]);

  useEffect(() => {
    // Fetch wallet names from backend API
    const email = localStorage.getItem("email");
    axios.post('http://localhost:8000/wallet-names', { email: email })
      .then(response => {
        const { walletNames } = response.data; // Destructure walletNames from response.data
        setWalletNames(walletNames);
      })
      .catch(error => {
        console.error('Error fetching wallet names:', error);
      });
  }, []);  // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="wallet-select-label">Wallet</InputLabel>
        <Select
          labelId="wallet-select-label"
          id="wallet-select"
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Wallet" />}
          MenuProps={MenuProps}
        >
          {walletNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default List_Wallet;
