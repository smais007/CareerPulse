import { ControllerRenderProps } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { JobListingDurationPricing } from "@/utils/lisiting-price";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
interface JobListingDurationSelectorProps {
  field: ControllerRenderProps;
}

export function JobListingDurationSelector({
  field,
}: JobListingDurationSelectorProps) {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
    >
      <div className="flex flex-col gap-4">
        {JobListingDurationPricing.map((duration) => (
          <div key={duration.days} className="relative">
            <RadioGroupItem
              value={duration.days.toString()}
              id={duration.days.toString()}
              className="sr-only"
            />
            <Label
              htmlFor={duration.days.toString()}
              className="flex flex-col cursor-pointer"
            >
              <Card
                className={cn(
                  field.value === duration.days
                    ? "border-primary bg-primary/10"
                    : "hover:bg-secondary/50",
                  "p-4 w-full transition-all"
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">
                      {duration.days} days
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {duration.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">${duration.price}</p>
                    <p className="text-sm text-muted-foreground">
                      {(duration.price / duration.days).toFixed(2)}/day
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
