import { Control, FieldValues, Path } from "react-hook-form";

import { FormField, FormMessage } from "./core/form";
import { FormItem, FormLabel, FormControl } from "@/components/core/form";
import { Input } from "./core/input";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control?: Control<T>;
};

export function CustomTextField<T extends FieldValues>({
  name,
  label,
  control,
}: Props<T>) {
  if (control) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" name={name} />
      </FormControl>
    </FormItem>
  );
}
