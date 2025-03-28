import { Control, useController } from "react-hook-form";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";

interface iAppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
  currency: string;
}

export function SalaryRangeSelector({
  control,
  minSalary,
  maxSalary,
  step,
  currency,
}: iAppProps) {
  const { field: formField } = useController({
    name: "salaryFrom",
    control,
  });

  const { field: toField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    formField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  function handleRangeChange(value: number[]) {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    formField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  }

  return (
    <div className="w-full space-y-4">
      <Slider
        onValueChange={handleRangeChange}
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
      />
      <div className="flex justify-between">
        <span>{formatCurrency(range[0])}</span>{" "}
        <span>{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
}
