"use server";

import { db } from "@/app/_lib/prisma";
import {
  TransactionsCategory,
  transactionsPaymentMethod,
  TransactionsType,
} from "@/app/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionsType;
  category: TransactionsCategory;
  paymentMethod: transactionsPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  await db.transactions.upsert({
    where: {
      id: params.id ?? "",
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });
  revalidatePath("/transactions");
};
