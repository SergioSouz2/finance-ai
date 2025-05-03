import { auth } from "@clerk/nextjs/server";
import { Button } from "./_components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1>Dashboard page</h1>
        <Button>entrar</Button>
        <UserButton showName />
      </div>
    </>
  );
};

export default Home;
