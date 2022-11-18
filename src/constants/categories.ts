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
  { name: "Biznes", value: 0, fill: incomeColors[0] },
  { name: "Inwestycje", value: 0, fill: incomeColors[1] },
  { name: "Dodatkowy dochód", value: 0, fill: incomeColors[2] },
  { name: "Depozyty", value: 0, fill: incomeColors[3] },
  { name: "Loteria", value: 0, fill: incomeColors[4] },
  { name: "Prezenty", value: 0, fill: incomeColors[5] },
  { name: "Pensja", value: 0, fill: incomeColors[6] },
  { name: "Oszczędności", value: 0, fill: incomeColors[7] },
  { name: "Dochód z najmu", value: 0, fill: incomeColors[8] },
];

export const Expenses: Category[] = [
  { name: "Rachunki", value: 0, fill: expenseColors[0] },
  { name: "Samochód", value: 0, fill: expenseColors[1] },
  { name: "Ubrania", value: 0, fill: expenseColors[2] },
  { name: "Podróże", value: 0, fill: expenseColors[3] },
  { name: "Jedzenie", value: 0, fill: expenseColors[4] },
  { name: "Zakupy", value: 0, fill: expenseColors[5] },
  { name: "Dom", value: 0, fill: expenseColors[6] },
  { name: "Rozrywka", value: 0, fill: expenseColors[7] },
  { name: "Telefon", value: 0, fill: expenseColors[8] },
  { name: "Zwierzaki", value: 0, fill: expenseColors[9] },
  { name: "Inne", value: 0, fill: expenseColors[10] },
];

// export const resetCategories: () => void = () => {
//   Incomes.forEach((c) => (c.amount = 0));
//   Expenses.forEach((c) => (c.amount = 0));
// };