import * as React from 'react';
import {useContext} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Grid} from '@mui/material'
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
    <Grid item xs={9} alignItems='center' justifyContent='center'>
      <Typography>Ostatnie operacje</Typography>
      <Table size="small" stickyHeader>
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
            <TableRow key={index}>
              <TableCell>{row.type === 'Income' ? <AddIcon sx={{color: green[500]}}/> : <RemoveIcon sx={{color: red[500]}}/>}</TableCell>
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
    </Grid>
  );
}

export default HistoryList