import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/dashboard";
import { formatCurrency } from "@/app/_utils/currency";
import { Transactions, TransactionsType } from "@/app/generated/prisma";
import Image from "next/image";

interface LastTransactionsItem {
  transaction: Transactions;
}

const LastTransactionsItem = ({ transaction }: LastTransactionsItem) => {
  function getAmountColor(transaction: Transactions) {
    if (transaction.type === TransactionsType.EXPENSE) {
      return "text-red-500";
    }

    if (transaction.type === TransactionsType.DEPOSIT) {
      return "text-green-500";
    }

    if (transaction.type === TransactionsType.INVESTMENT) {
      return "text-zinc-500";
    }
  }

  function getAmountPrefix(transaction: Transactions) {
    if (transaction.type === TransactionsType.DEPOSIT) {
      return "+";
    }
    return "-";
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-muted bg-opacity-[3%] p-3">
          <Image
            src={TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}
            alt="pix"
            height={20}
            width={20}
          />
        </div>
        <div>
          <p className="text-sm font-bold">{transaction.name}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(transaction.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
        {getAmountPrefix(transaction)}
        {formatCurrency(Number(transaction.amount))}
      </p>
    </div>
  );
};

export default LastTransactionsItem;
