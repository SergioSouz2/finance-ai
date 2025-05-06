import { db } from "@/app/_lib/prisma";
import { TransactionsType } from "@/app/generated/prisma";
import {
  totalExpensePerCategory,
  TransactionsPercentagePerType,
} from "./types";

const getDashboard = async (month: string, userId: string) => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

  const where = {
    userId,
    date: {
      gte: new Date(`${currentYear}-${month}-01`), // Data inicial
      lt: new Date(`${currentYear}-${month}-31`), // Data final
    },
  };

  const depositsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const investimentsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const expensesTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const balance = depositsTotal - investimentsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionsPercentagePerType = {
    [TransactionsType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionsType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionsType.INVESTMENT]: Math.round(
      (Number(investimentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: totalExpensePerCategory[] = (
    await db.transactions.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionsType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransactions = await db.transactions.findMany({
    where: {
      ...where,
    },
    orderBy: { date: "desc" },
  });

  return {
    balance,
    depositsTotal,
    investimentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};

export default getDashboard;
