import { transactionsPaymentMethod } from "../generated/prisma";

export const MONTH_OPTIONS = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [transactionsPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [transactionsPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [transactionsPaymentMethod.CASH]: "money.svg",
  [transactionsPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [transactionsPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [transactionsPaymentMethod.OTHER]: "other.svg",
  [transactionsPaymentMethod.PIX]: "pix.svg",
};
