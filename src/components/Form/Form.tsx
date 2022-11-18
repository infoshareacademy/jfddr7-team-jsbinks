import React, {useState, useContext, useEffect} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { firebaseAuth, firebaseDb  } from '../../index';
import { signOut } from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { Chart } from '../Charts/Chart';
import { Category } from '../../types';
import { StoreContext } from '../../StoreProvider';
import { OperationObj } from '../../StoreProvider';
//materail UI
import {Container, Typography, Select, FormControl, InputLabel, MenuItem, OutlinedInput, InputAdornment, TextField, Button, Box, AppBar, Toolbar, IconButton, Avatar, Grid, Paper} from "@mui/material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { grey, red, green } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { theme } from '../../theme/theme'
import logo from '../images/logo.png'

const useStyles = makeStyles({
  container: {
    boxShadow: '0 1px 1px 0 lightgray',
    borderRadius: 10,
    padding: 20,
    backgroundColor: grey[100],
    marginBottom: 20
    },

  formStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  }
})

export const Form = () => {
  const classes = useStyles()
  const { username, operation, setOperation, incomeCategories, expenseCategories} = useContext(StoreContext);

  const [entryDate, setEntryDate] = useState<Dayjs | null>(null);
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

  const renderCatergories = (type: string) => {
    const categories =  type === 'Income' ? incomeCategories : expenseCategories;
    return categories.map((category) =>
        <MenuItem value={category.name} key={category.name}>{category.name}</MenuItem>     
    )
  }

  return (
    <Container maxWidth="sm" color="primary" className={classes.container}>
              <form className={classes.formStyle} onSubmit={e => e.preventDefault()}>
              <Typography variant="h5">Budżetówka</Typography>
              <Typography variant="h4">Twoje Saldo</Typography>
              {balance !== null && <Typography variant="h3" color={balance > 0 ? green[500] : red[500]}>${balance}</Typography>}
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

  )
}

