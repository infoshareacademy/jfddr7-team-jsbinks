import {useState, useContext, useEffect} from 'react';
import useSound from 'use-sound';
import moneySound from '../../../Sound/moneySound.mp3';
import dayjs, { Dayjs } from 'dayjs';
import {doc, setDoc} from 'firebase/firestore';
import { firebaseDb } from '../../../index'
import { v4 as uuid } from 'uuid';
import { StoreContext } from '../../../StoreProvider';
import { OperationObj } from '../../../StoreProvider';
//materail UI
import {Container, Select, FormControl, InputLabel, MenuItem, OutlinedInput, InputAdornment, TextField, Button} from "@mui/material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { grey} from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import { Balance } from '../Balance/Balance';

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

  const [play] = useSound(moneySound);

  const [entryDate, setEntryDate] = useState<Dayjs | null>(null);
  const [incomeValue, setIncomeValue] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<string>('');

  const addOperation = async (): Promise<void> => {
    const OperationObject: OperationObj = {
      id: uuid(),
      amount: Number(amount),
      category: category,
      type: incomeValue,
      date: entryDate ? dayjs(entryDate.toString()).format('MM/DD/YYYY') : dayjs().format('MM/DD/YYYY'), 
    }
    try {
      await setDoc(doc(firebaseDb, 'operations', OperationObject.id), {
          name: OperationObject,
          userEmail: username,
      });
      play();
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
      <Balance />
      <form className={classes.formStyle} onSubmit={e => e.preventDefault()}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Typ</InputLabel>
          <Select
            onChange={(event) => setIncomeValue(event.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={incomeValue}
            label="Income"
            required
          >
            <MenuItem value='Income'>Dochody</MenuItem>
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
              required
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
        <Button type='submit' variant="contained" size="medium" onClick={addOperation}>
          Dodaj operację
        </Button>
      </form>
    </Container>
  )
}

