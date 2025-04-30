"use server";

import { db } from "@/app/_lib/prisma";
import {
  TransactionsCategory,
  transactionsPaymentMethod,
  TransactionsType,
} from "@/app/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  name: string;
  amount: number;
  type: TransactionsType;
  category: TransactionsCategory;
  paymentMethod: transactionsPaymentMethod;
  date: Date;
}

export const addTransaction = async (params: AddTransactionParams) => {
  addTransactionSchema.parse(params);
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  await db.transactions.create({
    data: { ...params, userId },
  });
  revalidatePath("/transactions");
};
