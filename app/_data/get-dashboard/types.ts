import { TransactionsType } from "@/app/generated/prisma";

export type TransactionsPercentagePerType = {
  [Key in TransactionsType]: number;
};
