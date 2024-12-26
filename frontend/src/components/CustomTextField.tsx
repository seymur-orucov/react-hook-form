import { FieldValues, Path, useFormContext } from "react-hook-form";

import { FormField, FormMessage } from "./core/form";
import { FormItem, FormLabel, FormControl } from "@/components/core/form";
import { Input } from "./core/input";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
}

export function CustomTextField<T extends FieldValues>({
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
            <Input placeholder="shadcn" type="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    // <Controller
    //   control={control}
    //   name={name}
    //   render={({ field, fieldState: { error } }) => (
    //     <TextField
    //       {...field}
    //       {...props}
    //       error={!!error}
    //       helperText={error?.message}
    //     />
    //   )}
    // />
  );
}
