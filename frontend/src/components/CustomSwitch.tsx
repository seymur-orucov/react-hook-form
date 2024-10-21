import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function CustomSwitch<T extends FieldValues>({ name, label }: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Switch {...field} checked={field.value} />}
        ></FormControlLabel>
      )}
    />
  );
}
