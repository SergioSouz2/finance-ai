"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/app/_components/ui/select";
import { MONTH_OPTIONS } from "@/app/_constants/dashboard";
import {} from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";

const TimeSelect = () => {
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const currentMonth =
    searchParams.get("month") || String(new Date().getMonth() + 1); // Obtém o mês atual ou o da URL
  function handleMonthChange(value: string) {
    push(`/?month=${value}`);
  }

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={currentMonth}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Mês" className="pl-4" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default TimeSelect;
