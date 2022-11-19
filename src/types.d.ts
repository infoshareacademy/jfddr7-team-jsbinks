import React from "react";

interface IFormData {
  id: string;
  amount: number;
  category: string;
  type: string;
  date: string;
}

type TransactionType = "Income" | "Expense";

export type Category = {
  name: string;
  value: number;
  fill: string;
};