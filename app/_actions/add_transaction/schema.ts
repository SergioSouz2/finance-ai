import {
  TransactionsCategory,
  transactionsPaymentMethod,
  TransactionsType,
} from "@/app/generated/prisma";
import { z } from "zod";

export const addTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionsType),
  category: z.nativeEnum(TransactionsCategory),
  paymentMethod: z.nativeEnum(transactionsPaymentMethod),
  date: z.date(),
});
