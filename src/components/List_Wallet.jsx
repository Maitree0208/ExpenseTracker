import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function List_Wallet() {
  const theme = useTheme();
  const [personName, setPersonName] = useState('');
  const [walletNames, setWalletNames] = useState([]);

  useEffect(() => {
    // Fetch wallet names from backend API
    axios.post('http://localhost:8000/wallet-names')
      .then(response => {
        const { walletNames } = response.data; // Destructure walletNames from response.data
        setWalletNames(walletNames);
      })
      .catch(error => {
        console.error('Error fetching wallet names:', error);
      });
  }, []);  // Empty dependency array ensures the effect runs only once on component mount

  const handleChange = (event) => {
    const { value } = event.target;
    setPersonName(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-simple-select-label">Wallet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Wallet" />}
          MenuProps={MenuProps}
        >
          {walletNames.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default List_Wallet;
