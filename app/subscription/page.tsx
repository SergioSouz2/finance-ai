import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <>
      <Navbar />
      <div>
        <h1>SubscriptionPage</h1>
      </div>
    </>
  );
};

export default SubscriptionPage;
