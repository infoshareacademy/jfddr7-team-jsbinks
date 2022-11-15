import React, {useRef, useState, useContext} from 'react';
import {format} from 'date-fns';
import { firebaseAuth } from '../index';
import { signOut } from 'firebase/auth';
import { firebaseDb } from '../index';
import {doc, setDoc} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { ListProps } from './HistoryList';
import { StoreContext } from '../StoreProvider';
//materail UI
import {Container, Typography, Select, FormControl, InputLabel, MenuItem, OutlinedInput, InputAdornment, TextField, Button, Box, AppBar, Toolbar, IconButton, Avatar, Grid, Paper} from "@mui/material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { grey } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import { useNavigate } from 'react-router-dom';
import HistoryList from './HistoryList';

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
  const { username } = useContext(StoreContext);

  const data = new Date();

  const [entryDate, setEntryDate] = React.useState<Date>(
    data
  );

  const [incomeValue, setIncomeValue] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<string>('');

  const [fullList, setFullList] = useState<ListProps[]>([])

  //function for date
  const handleChange = (newValue: Date | null) => {
    console.log(newValue)
    if(newValue) {
      setEntryDate(newValue);
    }
  };

  //main function for form submittion
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log( incomeValue ,category, amount, entryDate);
    const inputList: ListProps = {date: entryDate, incomeValue, category, amount}
    setFullList([...fullList, inputList])
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
    <Box sx={{ display: 'flex' ,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}}>
      <AppBar position="sticky">
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
            Powodzenia w nierównej walce z inflacją {username}!
          </Typography>
          <IconButton color="inherit" onClick={onLogout}>
                Wyloguj
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="main" 
      >
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
            <HistoryList fullList={fullList}/>
          </Paper>
        </Grid>
      </Box>
    </Box>
    
  )
}