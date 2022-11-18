import { Category } from "../types";

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

export const Incomes: Category[] = [
  { name: "Business", value: 0, fill: incomeColors[0] },
  { name: "Investments", value: 0, fill: incomeColors[1] },
  { name: "Extra income", value: 0, fill: incomeColors[2] },
  { name: "Deposits", value: 0, fill: incomeColors[3] },
  { name: "Lottery", value: 0, fill: incomeColors[4] },
  { name: "Gifts", value: 0, fill: incomeColors[5] },
  { name: "Salary", value: 0, fill: incomeColors[6] },
  { name: "Savings", value: 0, fill: incomeColors[7] },
  { name: "Rental income", value: 0, fill: incomeColors[8] },
];

export const Expenses: Category[] = [
  { name: "Bills", value: 0, fill: expenseColors[0] },
  { name: "Car", value: 0, fill: expenseColors[1] },
  { name: "Clothes", value: 0, fill: expenseColors[2] },
  { name: "Travel", value: 0, fill: expenseColors[3] },
  { name: "Food", value: 0, fill: expenseColors[4] },
  { name: "Shopping", value: 0, fill: expenseColors[5] },
  { name: "House", value: 0, fill: expenseColors[6] },
  { name: "Entertainment", value: 0, fill: expenseColors[7] },
  { name: "Phone", value: 0, fill: expenseColors[8] },
  { name: "Pets", value: 0, fill: expenseColors[9] },
  { name: "Other", value: 0, fill: expenseColors[10] },
];

// export const resetCategories: () => void = () => {
//   Incomes.forEach((c) => (c.amount = 0));
//   Expenses.forEach((c) => (c.amount = 0));
// };