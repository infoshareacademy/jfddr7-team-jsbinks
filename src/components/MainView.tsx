import React, {useRef, useState} from 'react';
import {format} from 'date-fns';
import { firebaseDb } from '../index';
import {doc, setDoc} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import {Container, Typography, Select, FormControl, InputLabel, MenuItem, OutlinedInput, InputAdornment, TextField, Button} from "@mui/material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { grey } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"

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
    console.log(incomeValue, category, amount, format(entryDate, 'do MMMM Y'));
  } // tu był błąd

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

  return (
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
            <MenuItem value='Income'>Bussines</MenuItem>
            <MenuItem value='Expense'>Shopping</MenuItem>
            <MenuItem value='Expense'>Investment</MenuItem>
            <MenuItem value='Expense'>Health</MenuItem>
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
  )
}