import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransctionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const transactions = await db.transactions.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="mb-4 flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        <DataTable
          columns={TransctionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
};
export default TransactionsPage;
