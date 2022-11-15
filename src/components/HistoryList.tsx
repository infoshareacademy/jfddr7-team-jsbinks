import * as React from 'react';
import {Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'
import {format} from 'date-fns';


export type ListProps ={
  date: Date,
  incomeValue: string,
  category: string,
  amount: string,
}

// // Generate Order Data
// function createData(
//   id: number,
//   date: string,
//   incomeValue: string,
//   category: string,
//   amount: number,
// ) {
//   return { id, date, incomeValue, category, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Expenses',
//     'Bussines',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Expenses',
//     'Bussines',
//     312.44,
//   ),
//   createData(
//     2, 
//     '16 Mar, 2019',
//     'Expenses',
//     'Bussines',
//     312.44,
//   ),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Expenses',
//     'Bussines',
//     312.44,
//   ),
//   createData(
//     4,
//     '16 Mar, 2019',
//     'Expenses',
//     'Bussines',
//     312.44,
//   ),
// ];

 const HistoryList: React.FC<{fullList: ListProps[]}> = ( {fullList} ) => {
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
          {fullList.map((row) => (
            <TableRow key={row.amount}>
              <TableCell>{format(row.date, 'dd MMMM Y')}</TableCell>
              <TableCell>{row.incomeValue}</TableCell>
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