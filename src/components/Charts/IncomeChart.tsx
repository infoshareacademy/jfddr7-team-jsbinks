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

//   const data = [
//     { name: "Group A", value: 400, fill: "#0088FE" },
//     { name: "Group B", value: 300, fill: "#00C49F" },
//     { name: "Group C", value: 300, fill: "#FFBB28" },
//     { name: "Group D", value: 200, fill: "#FF8042" }
//   ];
type CategoryName = "Income" | "Expense"

export const IncomeChart = ({ operations, categoryName }: {categoryName: CategoryName,operations: OperationObj[]}) => {

  const getRandomColor = ()=> ("#" + Math.floor(Math.random()*16777215).toString(16))

    const filterdOperations = operations.filter((operation) => operation.type === categoryName);

    const data = filterdOperations.map((operation) => ({name: operation.category, value: operation.amount, fill: getRandomColor()}))


      return (
        <PieChart width={800} height={400}>
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
        );
}