import * as React from 'react';
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

const names = [
  'Groceries',
  'Restaurant',
  'Bills',
  'Income tax',
  'Shopping',
  'Clothes',
  'Travel',
  'Social Security',
  'Rent',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function List_Note() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setPersonName(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-simple-select-label">Note</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Note" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
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

export default List_Note;
