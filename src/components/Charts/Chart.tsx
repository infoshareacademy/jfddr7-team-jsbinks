import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { PureComponent, useContext } from "react";
import { PieChart, Pie, Legend } from "recharts";
import { StoreProvider } from "../../StoreProvider";
import { OperationObj } from "../../StoreProvider";
import { Category } from "../../types";

const renderColorfulLegendText = (value: string, entry: any) => {
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
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

  const data = filterdOperations.map((operation) => ({

    // categoryColors.filter((categoryColor) => {

    // })

    name: operation.category,
    value: operation.amount, 
    fill: categoryColors.find((category) => operation.category === category.name)?.fill,
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