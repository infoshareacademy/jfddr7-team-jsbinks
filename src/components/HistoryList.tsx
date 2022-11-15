import * as React from 'react';
import {Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'

// Generate Order Data
function createData(
  id: number,
  date: string,
  incomeValue: string,
  category: string,
  amount: number,
) {
  return { id, date, incomeValue, category, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Expenses',
    'Bussines',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Expenses',
    'Bussines',
    312.44,
  ),
  createData(
    2, 
    '16 Mar, 2019',
    'Expenses',
    'Bussines',
    312.44,
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Expenses',
    'Bussines',
    312.44,
  ),
  createData(
    4,
    '16 Mar, 2019',
    'Expenses',
    'Bussines',
    312.44,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function HistoryList() {
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.incomeValue}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more history
      </Link>
    </React.Fragment>
  );
}