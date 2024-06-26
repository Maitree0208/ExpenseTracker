import React ,{useState} from 'react';
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

function List_Note({ onChange }) {
  const [selectedName, setSelectedName] = useState(''); // Set default value as empty string

  const handleChange = (event) => {
    setSelectedName(event.target.value);
    onChange(event); // Call the parent component's onChange function if needed
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="note-select-label">Note</InputLabel>
        <Select
          labelId="note-select-label"
          id="note-select"
          value={selectedName}
          onChange={handleChange}
          input={<OutlinedInput label="Note" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default List_Note;
