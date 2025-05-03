import { TransactionsCategory, TransactionsType } from "@/app/generated/prisma";

export type TransactionsPercentagePerType = {
  [Key in TransactionsType]: number;
};

export interface totalExpensePerCategory {
  category: TransactionsCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
