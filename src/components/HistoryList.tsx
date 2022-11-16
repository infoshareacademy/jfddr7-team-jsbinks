import * as React from 'react';
import {useContext} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'
import { StoreContext } from '../StoreProvider';


// export type ListProps ={
//   date: string,
//   incomeValue: string,
//   category: string,
//   amount: string,
// }
// const HistoryList: React.FC<{fullList: ListProps[]}> = ( {fullList} )

 const HistoryList = () => {

  const {operation} = useContext(StoreContext);

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default HistoryList