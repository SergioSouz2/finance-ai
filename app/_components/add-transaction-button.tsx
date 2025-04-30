"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowDownUpIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import { Button } from "../_components/ui/button";

import DatePickerDemo from "./ui/date-picker";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import {
  TransactionsCategory,
  transactionsPaymentMethod,
  TransactionsType,
} from "../generated/prisma";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPES_OPTIONS,
} from "../_constants/transactions";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  amount: z.string().trim().min(1, {
    message: "Valor é obrigatório",
  }),
  type: z.nativeEnum(TransactionsType, {
    required_error: "Tipo é obrigatório",
  }),
  category: z.nativeEnum(TransactionsCategory, {
    required_error: "Categoria é obrigatória",
  }),
  paymentMethod: z.nativeEnum(transactionsPaymentMethod, {
    required_error: "Método de pagamento é obrigatório",
  }),
  date: z.date({
    required_error: "Data é obrigatória",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddTransactionButton = () => {
  // 1. Define your form.
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      type: TransactionsType.EXPENSE,
      category: TransactionsCategory.FOOD,
      paymentMethod: transactionsPaymentMethod.CASH,
      date: new Date(),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: FormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data);
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Títilo</FormLabel>
                  <FormControl>
                    <Input placeholder="Títilo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput placeholder="R$ 0.000,00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona um métado de Trasação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPES_OPTIONS.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona uma Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="paymentMethod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Métado de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona um métado de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePickerDemo
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Adicionar</Button>
              <DialogClose asChild>
                <Button variant="outline" className="ml-2" type="button">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
