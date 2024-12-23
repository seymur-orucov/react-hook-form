import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "./input";

import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function CustomFormField<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
