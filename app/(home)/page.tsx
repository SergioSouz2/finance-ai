import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import Navbar from "../_components/navbar";
import TimeSelect from "./_components/time-selectt";

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

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  );
};

export default Home;
