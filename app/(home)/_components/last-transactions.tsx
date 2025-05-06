import { Button } from "@/app/_components/ui/button";

import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Transactions } from "@/app/generated/prisma";
import Link from "next/link";
import LastTransactionsItem from "./last-transactions-item";

interface LastTransactionsProps {
  lastTransactions: Transactions[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">ÚLtimo Transações </CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href={"/transactions"}>Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {lastTransactions.map((transaction) => (
          <LastTransactionsItem
            transaction={transaction}
            key={transaction.id}
          />
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
