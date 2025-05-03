"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionsPercentagePerType } from "@/app/_data/get-dashboard/types";
import { TransactionsType } from "@/app/generated/prisma";
import { Pie, PieChart } from "recharts";
import PercentegeItem from "./percentege-item";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

const chartConfig = {
  [TransactionsType.INVESTMENT]: { label: "Investido", color: "#FFFFFF" },
  [TransactionsType.DEPOSIT]: { label: "Receita", color: "#55B02E" },
  [TransactionsType.EXPENSE]: { label: "Despesas", color: "#E93030" },
} satisfies ChartConfig;

interface TransactionPieChatProps {
  investimentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionsPercentagePerType;
}

const TransactionPieChat = ({
  depositsTotal,
  expensesTotal,
  investimentsTotal,
  typesPercentage,
}: TransactionPieChatProps) => {
  const chartData = [
    {
      type: TransactionsType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionsType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionsType.INVESTMENT,
      amount: investimentsTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={50}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentegeItem
            icon={<TrendingUpIcon size={20} className="text-primary" />}
            title={"Receita"}
            value={typesPercentage[TransactionsType.DEPOSIT]}
          />

          <PercentegeItem
            icon={<TrendingDownIcon size={20} className="text-red-500" />}
            title={"Despesas"}
            value={typesPercentage[TransactionsType.EXPENSE]}
          />

          <PercentegeItem
            icon={<PiggyBankIcon size={20} className="text-white" />}
            title={"Investido"}
            value={typesPercentage[TransactionsType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default TransactionPieChat;
