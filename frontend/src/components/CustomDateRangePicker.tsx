import { FieldValues, Path, useFormContext } from "react-hook-form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/core/popover.tsx";
import { Button } from "@/components/core/button.tsx";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/core/calendar.tsx";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/core/form.tsx";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
}

export function CustomDateRangePicker<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  id={name}
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !field.value.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {field.value?.from ? (
                    field.value?.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y")} -{" "}
                        {format(field.value.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value.from}
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
