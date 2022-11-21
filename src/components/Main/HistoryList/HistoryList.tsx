import * as React from 'react';
import useSound from 'use-sound';
import trashSound from '../../../Sound/trashSound.mp3';
import {useState, useContext, useEffect} from 'react';
// import SearchFilter from 'react-filter-search'
import {Table, TableBody, Box, TableCell, TableHead, TableRow, Typography, Button, Grid, TableContainer, Paper, InputLabel, OutlinedInput} from '@mui/material'
import { doc, deleteDoc } from "firebase/firestore";
import { firebaseDb } from '../../../index';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { StoreContext } from '../../../StoreProvider';
import { red, green } from "@mui/material/colors"
import { OperationObj } from '../../../StoreProvider';
import dayjs from 'dayjs';


 const HistoryList = () => {
  const {operation, setOperation} = useContext(StoreContext);
  const [sortedOperation, setSortedOperation] = useState<OperationObj[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [play] = useSound(trashSound);

  useEffect(() => {
    let operationWithDate = operation.map((obj) => {
      return { ...obj, date: new Date(obj.date) };
    })
  
    const operationSort = operationWithDate.sort(
      (objA, objB) => objB.date.getTime() - objA.date.getTime(),
    );
  
    const sortedList = operationSort.map((obj) => {
      return { ...obj, date: dayjs(obj.date.toString()).format('DD/MM/YYYY') };
    })
  
    setSortedOperation(sortedList);
    if (searchValue) {
      setSortedOperation(sortedList.filter(op => op.category.toLowerCase().includes(searchValue)));
    }

  }, [operation, setSortedOperation, searchValue])

 

  const deleteItem = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(firebaseDb, "operations", id));
      const filtrOperation = operation.filter((element) => id !== element.id);
      setOperation(filtrOperation);
      play();
    } catch(error) {
      console.log(error);
    }
  }

  const filterNames = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  }

  return (
    <Grid item xs={12} alignItems='center' justifyContent='center'>
      <Typography align='center' variant='h6'>Ostatnie operacje</Typography>
      <Box sx={{padding: -1}}>
        <InputLabel>Znajdź</InputLabel>
        <OutlinedInput 
          inputProps={{
            style: {
              padding: 8
            }
          }}
          type='text'
          onChange={(event) => filterNames(event)}
          placeholder={"Wpisz kategorię..."}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Kategoria</TableCell>
              <TableCell align="right">Wartość</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOperation && sortedOperation?.length > 0 && sortedOperation?.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.type === 'Income' ? <AddIcon sx={{color: green[500]}}/> : <RemoveIcon sx={{color: red[500]}}/>}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.type === 'Income' ? 'Dochód' : 'Wydatek'}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
                <TableCell align='center'>
                  <Button variant="outlined" onClick={() => deleteItem(row.id)}><DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default HistoryList