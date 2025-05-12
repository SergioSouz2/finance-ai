import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export const getCurrentMonthTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  return db.transactions.count({
    where: {
      userId: userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
  });
};
