import {
  PiggyBank,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  balance: number;
  investimentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investimentsTotal,
}: SummaryCardsProps) => {
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
