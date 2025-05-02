"use client";

import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transactions } from "@/app/generated/prisma";
import { PencilIcon } from "lucide-react";

import { useState } from "react";

interface EditTransactionButtonProps {
  transactions: Transactions;
}

const EditTransactionButton = ({
  transactions,
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // 1. Define your form.
  console.log(transactions);

  // 2. Define a submit handler.

  return (
    <>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{ ...transactions, amount: Number(transactions.amount) }}
        transactionId={transactions.id}
      />
    </>
  );
};

export default EditTransactionButton;
