import {
  PiggyBank,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
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
  return (
    <div className="space-y-6">
      <SummaryCard
        title="Saldo"
        amount={balance}
        icon={<WalletIcon size={20} />}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Investido"
          amount={investimentsTotal}
          icon={<PiggyBank size={20} />}
        />

        <SummaryCard
          title="Receita"
          amount={depositsTotal}
          icon={<TrendingUpIcon size={20} className="text-primary" />}
        />

        <SummaryCard
          title="Despesas"
          amount={expensesTotal}
          icon={<TrendingDownIcon size={20} className="text-red-500" />}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
