import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { Input, InputProps } from "./ui/input";

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        decimalScale={2}
        fixedDecimalScale={true}
        getInputRef={ref}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
