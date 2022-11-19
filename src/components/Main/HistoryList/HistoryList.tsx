import * as React from 'react';
import {useContext} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Grid, TableContainer, Paper} from '@mui/material'
import { doc, deleteDoc } from "firebase/firestore";
import { firebaseDb } from '../../../index';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { StoreContext } from '../../../StoreProvider';
import { red, green } from "@mui/material/colors"


 const HistoryList = () => {
  const {operation, setOperation} = useContext(StoreContext);

  const deleteItem = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(firebaseDb, "operations", id));
      const filtrOperation = operation.filter((element) => id !== element.id);
      setOperation(filtrOperation);
    } catch(error) {
      console.log(error);
    }
  }


  return (
    <Grid item xs={12} alignItems='center' justifyContent='center'>
      <Typography align='center' variant='h6'>Ostatnie operacje</Typography>
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
            {operation.map((row, index) => (
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