import { Box, Card, CardContent, Typography } from "@mui/material";
import { red, green } from "@mui/material/colors"
import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";
import { OperationObj } from "../../../StoreProvider";
import { Category } from "../../../types";

const renderColorfulLegendText = (value: string, entry: any) => {
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "8px" }}>
        {value}
      </span>
    );
  };

type CategoryName = "Income" | "Expense"

export const Chart = ({ operations, categoryName, Incomes, Expenses }: {
  categoryName: CategoryName, 
  operations: OperationObj[],
  Incomes: Category[],
  Expenses: Category[],
}) => {

  const categoryColors =  categoryName === 'Income' ? Incomes : Expenses;
  const filterdOperations = operations.filter((operation) => operation.type === categoryName);


 type holderObj = {
    name: number;
 }

  let holder = {} as holderObj;

  filterdOperations.forEach((obj) => {
    if(holder.hasOwnProperty(obj.category)) {
      holder[obj.category as keyof holderObj] = holder[obj.category as keyof holderObj] + obj.amount;
    } else {
      holder[obj.category as keyof holderObj] = obj.amount;
    }
  })

  let filtredArray = [];

  for (let prop in holder) {
    filtredArray.push({name: prop, value: holder[prop as keyof holderObj]});
  }



  const data = filtredArray.map((operation) => ({
      name: operation.name,
      value: operation.value, 
      fill: categoryColors.find((category) => operation.name === category.name)?.fill,
  }))
  const categoryValue = filterdOperations.reduce((prev, curr) => prev + curr.amount, 0)

  return (
    <Box
    sx={categoryName === 'Income'
        ? { backgroundColor: 'rgba(27, 94, 32, 0.1)',padding: 1.5, borderRadius: 2} 
        : { backgroundColor: 'rgba(229, 124, 88, 0.1)', padding: 1.5, borderRadius: 2}
  }
    >
      <Box>
        <Card>
          <CardContent>
            <Typography variant='h4' align="center">{categoryName === 'Income' ? 'Dochody' : 'Wydatki'}</Typography>
            <Typography variant='h4' align="center" color={categoryName === 'Income' ? green[500] : red[500]}>${categoryValue}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{
        paddingBottom: 2
      }}>
        <ResponsiveContainer width='100%' minWidth={170} height={280}>
          <PieChart >
            <Legend
              height={0}
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              iconSize={10}
              formatter={renderColorfulLegendText}
            />
            <Pie
              data={data}
              cx="52%"
              cy="40%"
              innerRadius={27}
              outerRadius={61}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
              label
            >
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>    
  );
}