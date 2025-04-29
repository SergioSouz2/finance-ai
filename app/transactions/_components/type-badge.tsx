import { Badge } from "@/app/_components/ui/badge";
import { Transactions, TransactionsType } from "@/app/generated/prisma";
import { CircleIcon } from "lucide-react";

type TransactionTypeBadgeProps = {
  transaction: Transactions;
};

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionsType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionsType.EXPENSE) {
    return (
      <Badge className="text-danger bg-muted font-bold hover:bg-muted">
        <CircleIcon className="fill-danger mr-2" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted font-bold text-white hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
