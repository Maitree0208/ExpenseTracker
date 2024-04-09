import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List_Account from './List_Account';
import List_From from './List_From';

function ExpenseForm() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
    
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
           <center>Expenses</center>
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Type:" />
             {List_Account()}
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemText primary="From:" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Wallet x0496" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Amount:" />
            {List_From()}
      </ListItemButton>

    </List>
  );
}

export default ExpenseForm;
