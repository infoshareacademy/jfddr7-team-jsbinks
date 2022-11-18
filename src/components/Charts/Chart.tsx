import { Box, Card, CardContent, Typography } from "@mui/material";
import { red, green } from "@mui/material/colors"
import { PieChart, Pie, Legend, ResponsiveContainer, LabelList } from "recharts";
import { OperationObj } from "../../StoreProvider";
import { Category } from "../../types";

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

  const data = filterdOperations.map((operation) => ({
    name: operation.category,
    value: operation.amount, 
    fill: categoryColors.find((category) => operation.category === category.name)?.fill,
  }))
  const categoryValue = filterdOperations.reduce((prev, curr) => prev + curr.amount, 0)

  return (
    <Box
    sx={categoryName === 'Income'
        ? { backgroundColor: 'rgba(16, 172, 110, 0.1)'} 
        : { backgroundColor: 'rgba(229, 124, 88, 0.1)'}
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
      <Box>
        <ResponsiveContainer width='100%' height={320}>
          <PieChart >
            <Legend
              height={16}
              iconType="circle"
              layout="vertical"
              verticalAlign="bottom"
              iconSize={10}
              formatter={renderColorfulLegendText}
            />
            <Pie
              data={data}
              cx={120}
              cy={200}
              innerRadius={30}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
              label
            >
              {/* <LabelList dataKey='name'/> */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>    
  );
}