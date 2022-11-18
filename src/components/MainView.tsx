import React, {useState, useContext, useEffect} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { firebaseAuth } from '../index';
import { signOut } from 'firebase/auth';
import { firebaseDb } from '../index';
import {doc, setDoc} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { Chart } from './Charts/Chart';
import { Category } from '../types';
// import { ListProps } from './HistoryList';
import { StoreContext } from '../StoreProvider';
import { OperationObj } from '../StoreProvider';
//materail UI
import {Container, Typography, Select, FormControl, InputLabel, MenuItem, OutlinedInput, InputAdornment, TextField, Button, Box, AppBar, Toolbar, IconButton, Avatar, Grid, Paper} from "@mui/material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { grey } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import HistoryList from './HistoryList';
import { theme } from '../theme/theme'

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
  const { username, operation, setOperation, incomeCategories, expenseCategories} = useContext(StoreContext);
  

  const [entryDate, setEntryDate] = React.useState<Dayjs | null>(null);

  const [incomeValue, setIncomeValue] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const newBalance = operation.reduce((prev, curr) => {
      let result = prev;

      if (curr.type === 'Income') {
        result = result + Number(curr.amount);
      } else if (curr.type === 'Expense') {
        result = result - Number(curr.amount);
      }

      return result
    }, 0)
    setBalance(newBalance)
  }, [operation])
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log( incomeValue ,category, amount, entryDate);
  } 


  const addOperation = async (): Promise<void> => {
    console.log(entryDate);
    const OperationObject: OperationObj = {
      id: uuid(),
      amount: Number(amount),
      category: category,
      type: incomeValue,
      date: entryDate ? dayjs(entryDate.toString()).format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY'), 
    }
    try {
      await setDoc(doc(firebaseDb, 'operations', OperationObject.id), {
          name: OperationObject,
          userEmail: username,
      });
      const updatedOperations = [...operation, OperationObject];
      setOperation(updatedOperations);
    } catch (error) {
      console.log(error);
    }
  }

  const onLogout = async (): Promise<void> => {
    await signOut(firebaseAuth);
    console.log('the user singed out')
    navigate('/signin');
  }

  const renderCatergories = (type: string) => {
    const categories =  type === 'Income' ? incomeCategories : expenseCategories;
    return categories.map((category) =>
        <MenuItem value={category.type}>{category.type}</MenuItem>     
    )
  }

  return (
    <ThemeProvider theme={theme}>
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
            <Avatar alt="User avatar" sx={{backgroundImage: './logo.png'}}/>
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
      <Grid 
        container 
        spacing={1} 
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <Chart categoryName='Income' operations={operation}/>
        </Grid>
        <Grid item xs={6}>
          <Box
          component="main" 
          >
            <Container maxWidth="sm" color="primary" className={classes.container}>
              <form className={classes.formStyle} onSubmit={handleSubmit}>
              <Typography variant="h3">Budżetówka</Typography>
              <Typography variant="h4">Twoje Saldo</Typography>
              {balance !== null && <Typography variant="h6">${balance}</Typography>}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Dochód/Wydatek</InputLabel>
                  <Select
                    onChange={(event) => setIncomeValue(event.target.value)}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={incomeValue}
                    label="Income"
                  >
                    <MenuItem value='Income'>Wpływy</MenuItem>
                    <MenuItem value='Expense'>Wydatki</MenuItem>
                  </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kategoria</InputLabel>
                  <Select
                    onChange={(event) => setCategory(event.target.value)}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                  >
                  {renderCatergories(incomeValue)}
                  </Select>
              </FormControl>
              <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Wartość</InputLabel>
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
                  label="Data"
                  inputFormat="DD/MM/YYYY"
                  value={entryDate}
                  onChange={(newValue) => {
                    setEntryDate(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                </LocalizationProvider>
                <Button type='submit' variant="contained" size="large" onClick={addOperation}>
                  Dodaj operację
                </Button>
                </form>
            </Container>
            <Grid item xs={12}>
              <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                <HistoryList />
              </Paper>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Chart categoryName='Expense' operations={operation}/>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
  )
}