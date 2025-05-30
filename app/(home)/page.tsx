import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import Navbar from "../_components/navbar";
import TimeSelect from "./_components/time-selectt";
import TransactionPieChat from "./_components/transaction-pie-chart";
import getDashboard from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const month = searchParams.month || String(new Date().getMonth() + 1);

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // Verifica se o mês é válido (entre 1 e 12)
  const monthIsInvalid =
    isNaN(Number(month)) || Number(month) < 1 || Number(month) > 12;
  if (monthIsInvalid) {
    redirect(`/?month=${new Date().getMonth() + 1}`); // Redireciona para o mês atual se for inválido
  }

  const dashboard = await getDashboard(month, userId);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr] space-x-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              balance={dashboard.balance}
              depositsTotal={dashboard.depositsTotal}
              investimentsTotal={dashboard.investimentsTotal}
              expensesTotal={dashboard.expensesTotal}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionPieChat
                depositsTotal={dashboard.depositsTotal}
                investimentsTotal={dashboard.investimentsTotal}
                expensesTotal={dashboard.expensesTotal}
                typesPercentage={dashboard.typesPercentage}
              />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
