import { Box } from "@mui/material";
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

export const Chart = ({ operations, categoryName }: {categoryName: CategoryName,operations: OperationObj[]}) => {

  const getRandomColor = ()=> ("#" + Math.floor(Math.random()*16777215).toString(16)) // generates random color for chart
  const filterdOperations = operations.filter((operation) => operation.type === categoryName);
  const data = filterdOperations.map((operation) => ({name: operation.category, value: operation.amount, fill: getRandomColor()}))


  return (
    <Box>
      <Box>
        
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