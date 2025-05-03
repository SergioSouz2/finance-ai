import {
  TransactionsCategory,
  transactionsPaymentMethod,
  TransactionsType,
} from "../generated/prisma";

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de crédito",
  DEBIT_CARD: "Cartão de débito",
  OTHER: "Outros",
  PIX: "PIX",
};

export const TRANSACTION_TYPES_OPTIONS = [
  {
    value: TransactionsType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionsType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionsType.INVESTMENT,
    label: "Investimentos",
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionsCategory.EDUCATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.EDUCATION],
  },

  {
    value: TransactionsCategory.FOOD,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.FOOD],
  },
  {
    value: TransactionsCategory.HEALTH,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.HEALTH],
  },
  {
    value: TransactionsCategory.HOUSING,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.HOUSING],
  },
  {
    value: TransactionsCategory.OTHER,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.OTHER],
  },
  {
    value: TransactionsCategory.SALARY,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.SALARY],
  },
  {
    value: TransactionsCategory.TRANSPORTATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.TRANSPORTATION],
  },
  {
    value: TransactionsCategory.ENTERTAINMENT,
    label: TRANSACTION_CATEGORY_LABELS[TransactionsCategory.ENTERTAINMENT],
  },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: transactionsPaymentMethod.BANK_TRANSFER,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[
        transactionsPaymentMethod.BANK_TRANSFER
      ],
  },
  {
    value: transactionsPaymentMethod.BANK_SLIP,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[transactionsPaymentMethod.BANK_SLIP],
  },
  {
    value: transactionsPaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[transactionsPaymentMethod.CASH],
  },
  {
    value: transactionsPaymentMethod.CREDIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[transactionsPaymentMethod.CREDIT_CARD],
  },
  {
    value: transactionsPaymentMethod.DEBIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[transactionsPaymentMethod.DEBIT_CARD],
  },
  {
    value: transactionsPaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[transactionsPaymentMethod.OTHER],
  },
  {
    value: transactionsPaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[transactionsPaymentMethod.PIX],
  },
];
