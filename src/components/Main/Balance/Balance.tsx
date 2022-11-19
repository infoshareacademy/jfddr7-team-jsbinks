import {useState, useContext, useEffect} from 'react';
import { StoreContext } from '../../../StoreProvider';
//materail UI
import { Typography, Card, Box} from "@mui/material"
import { red, green } from "@mui/material/colors"
import logo from '../../../images/logo.png'



export const Balance = () => {
  const { username, operation, setOperation, incomeCategories, expenseCategories} = useContext(StoreContext);
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


  return (
    <Card sx={{
      padding: 1, 
      marginBottom: 3,
      display: "flex",
      flexDirection: "row",
      alignItems: "spread-around",
      justifyContent: 'space-around',
      gap: 1,
    }}
    >
      <Box sx={{
        height: 140,
        width: '100%',
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        marginTop: -4
      }}
      ></Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <Typography variant="h4" align='center'>Twoje Saldo</Typography>
        {balance !== null && <Typography variant="h3" color={balance > 0 ? green[500] : red[500]}>${balance}</Typography>}
      </Box>
    </Card>
  )
}