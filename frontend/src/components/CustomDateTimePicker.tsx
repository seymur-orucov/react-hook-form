import { FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./core/form";
import { Popover, PopoverContent } from "./core/popover";
import { PopoverTrigger } from "@/components/core/popover.tsx";
import { Button } from "@/components/core/button.tsx";
import { cn } from "@/lib/utils.ts";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/core/calendar.tsx";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function CustomDateTimePicker<T extends FieldValues>({
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
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
    // <Controller
    //   control={control}
    //   name={name}
    //   render={({ field }) => (
    //     <LocalizationProvider dateAdapter={AdapterDateFns}>
    //       <DateTimePicker label={label} {...field} />
    //     </LocalizationProvider>
    //   )}
    // />
  );
}
