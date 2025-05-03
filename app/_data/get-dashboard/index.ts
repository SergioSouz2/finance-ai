import { db } from "@/app/_lib/prisma";
import { TransactionsType } from "@/app/generated/prisma";
import { TransactionsPercentagePerType } from "./types";

const getDashboard = async (month: string, userId: string) => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

  const where = {
    date: {
      gte: new Date(`${currentYear}-${month}-01`), // Data inicial
      lt: new Date(`${currentYear}-${month}-31`), // Data final
    },
  };

  const depositsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "DEPOSIT", userId: userId },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const investimentsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "INVESTMENT", userId: userId },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const expensesTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "EXPENSE", userId: userId },
        _sum: { amount: true },
      })
    )?._sum.amount,
  );

  const balance = depositsTotal - investimentsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, userId: userId },
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

  return {
    balance,
    depositsTotal,
    investimentsTotal,
    expensesTotal,
    typesPercentage,
  };
};

export default getDashboard;
