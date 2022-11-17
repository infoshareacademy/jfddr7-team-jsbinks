import * as React from 'react';
import {useContext} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography, Button} from '@mui/material'
import { doc, deleteDoc } from "firebase/firestore";
import { firebaseDb } from '../index';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreContext } from '../StoreProvider';


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
    <React.Fragment>
      <Typography>Recent Inputs</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Income/Expense</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operation.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteItem(row.id)}>
                Delete
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default HistoryList