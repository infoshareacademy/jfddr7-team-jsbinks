import {useState, useContext, useEffect} from 'react';
import { StoreContext } from '../../../StoreProvider';
//materail UI
import { Typography, Card, Box} from "@mui/material"
import { red, green } from "@mui/material/colors"
import logo from '../../../images/logo.png'



export const Balance = () => {
  const { operation } = useContext(StoreContext);
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
      marginBottom: 2,
      // height: 155,
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: 'center'
    }}
    >
      <Box sx={{
        height: 150,
        width: '70%',
        backgroundImage: `url(${logo})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: 1
        // marginTop: -4
      }}
      ></Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: 1
      }}>
        <Typography variant="h4" align='center'>Twoje Saldo</Typography>
        {balance !== null && <Typography variant="h3" color={balance > 0 ? green[500] : red[500]}>${balance}</Typography>}
      </Box>
    </Card>
  )
}