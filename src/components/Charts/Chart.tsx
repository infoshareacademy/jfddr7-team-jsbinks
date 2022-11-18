import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { PureComponent, useContext } from "react";
import { PieChart, Pie, Legend } from "recharts";
import { StoreProvider } from "../../StoreProvider";
import { OperationObj } from "../../StoreProvider";

const renderColorfulLegendText = (value: string, entry: any) => {
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
        {value}
      </span>
    );
  };


type CategoryName = "Income" | "Expense"
type Category = {
  type: string;
  amount: number;
  color: string;
};

const incomeColors: string[] = [
  "#123123",
  "#154731",
  "#165f40",
  "#16784f",
  "#14915f",
  "#10ac6e",
  "#0bc77e",
  "#04e38d",
  "#00ff9d",
];
const expenseColors: string[] = [
  "#b50d12",
  "#bf2f1f",
  "#c9452c",
  "#d3583a",
  "#dc6a48",
  "#e57c58",
  "#ee8d68",
  "#f79d79",
  "#ffae8a",
  "#cc474b",
  "#f55b5f",
];



const expenseCategories: Category[] = [
  { type: "Bills", amount: 0, color: expenseColors[0] },
  { type: "Car", amount: 0, color: expenseColors[1] },
  { type: "Clothes", amount: 0, color: expenseColors[2] },
  { type: "Travel", amount: 0, color: expenseColors[3] },
  { type: "Food", amount: 0, color: expenseColors[4] },
  { type: "Shopping", amount: 0, color: expenseColors[5] },
  { type: "House", amount: 0, color: expenseColors[6] },
  { type: "Entertainment", amount: 0, color: expenseColors[7] },
  { type: "Phone", amount: 0, color: expenseColors[8] },
  { type: "Pets", amount: 0, color: expenseColors[9] },
  { type: "Other", amount: 0, color: expenseColors[10] },
];

export const Chart = ({ operations, categoryName }: {categoryName: CategoryName, operations: OperationObj[]}) => {

  const getRandomColor = ()=> ("#" + Math.floor(Math.random()*16777215).toString(16)) // generates random color for chart

  
  const filterdOperations = operations.filter((operation) => operation.type === categoryName);
  const data = filterdOperations.map((operation) => ({
    name: operation.category, 
    value: operation.amount, 
    fill: getRandomColor()
  }))
  const categoryValue = filterdOperations.reduce((prev, curr) => prev + curr.amount, 0)

  return (
    <Box>
      <Box>
        <Card>
          <CardContent>
            <Typography variant='h6'>{categoryName === 'Income' ? 'Dochody' : 'Wydatki'}</Typography>
            <Typography>{categoryValue}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <PieChart width={250} height={650}>
          <Legend
            height={36}
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            iconSize={10}
            formatter={renderColorfulLegendText}
          />
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
          </Pie>
        </PieChart>
      </Box>
    </Box>    
  );
}