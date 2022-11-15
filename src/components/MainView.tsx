import React, {useRef, useState} from 'react';
import {format} from 'date-fns';
import { firebaseAuth } from '../index';
import { signOut } from 'firebase/auth';
import { firebaseDb } from '../index';
import {doc, setDoc} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
//materail UI
import {Container, Typography, Select, FormControl, InputLabel, MenuItem, OutlinedInput, InputAdornment, TextField, Button, Box, AppBar, Toolbar, IconButton, Avatar, Grid, Paper} from "@mui/material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { grey } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    boxShadow: '0 0 1px 1px lightgray',
    borderRadius: 10,
    padding: 20,
    backgroundColor: grey[200],
    marginTop: 30,
    },

  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  }
})


export const MainView: React.FC = () => {
  const navigate = useNavigate()
  const classes = useStyles()

  const data = new Date();

  const [entryDate, setEntryDate] = React.useState<Date>(
    data
  );

  const [incomeValue, setIncomeValue] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<string>('');

  const handleChange = (newValue: Date | null) => {
    if(newValue) {
      setEntryDate(newValue);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log( incomeValue ,category, amount, format(entryDate, 'do MMMM Y'));
  } 

    // {
    //   user:
    //   data:
    //   category:
    //   amout:
    //   data:
    // }

    const addOperation = async (): Promise<void> => {
      try {
        const opperationId = uuid();
        await setDoc(doc(firebaseDb, 'opperations', opperationId), {
          
        });
      } catch (error) {
        console.log(error);
      }
  }

  const onLogout = async (): Promise<void> => {
    await signOut(firebaseAuth);
    console.log('the user singed out')
    navigate('/signin');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: '24px', // right padding 
          }}
        >
          <IconButton>
            <Avatar alt="User avatar" src="./logo.png"/>
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Powodzenia w nierównej walce z inflacją!
          </Typography>
          <IconButton color="inherit" onClick={onLogout}>
                Wyloguj
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" color="primary" className={classes.container}>
        <form className={classes.formStyle} onSubmit={handleSubmit}>
        <Typography variant="h3">Expense Tracker</Typography>
        <Typography variant="h4">Balance</Typography>
        <Typography variant="h6">$0</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Income</InputLabel>
            <Select
              onChange={(event) => setIncomeValue(event.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={incomeValue}
              label="Income"
            >
              <MenuItem value='Income'>Income</MenuItem>
              <MenuItem value='Expense'>Expense</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              onChange={(event) => setCategory(event.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
            >
              <MenuItem value='Business'>Bussines</MenuItem>
              <MenuItem value='Shopping'>Shopping</MenuItem>
              <MenuItem value='Investment'>Investment</MenuItem>
              <MenuItem value='Health'>Health</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              required
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="DD/MM/YYYY"
            value={entryDate}
            onChange={handleChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          </LocalizationProvider>
          <Button type='submit' variant="contained" size="large">
            Add New Item
          </Button>
          </form>
      </Container>
      <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  
                </Paper>
              </Grid>
    </Box>
    
  )
}