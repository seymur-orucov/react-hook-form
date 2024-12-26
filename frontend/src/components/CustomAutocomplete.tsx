import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./core/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/select";

interface Props<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  label: string;
}

export function CustomAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    // <Controller
    //   control={control}
    //   name={name}
    //   render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
    //     <Autocomplete
    //       options={options || []}
    //       value={value.map((id: string) =>
    //         options?.find((item) => item.id === id)
    //       )}
    //       getOptionLabel={(option) =>
    //         options?.find((item) => item.id === option.id)?.label ?? ""
    //       }
    //       isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
    //       onChange={(_, newValue) => {
    //         onChange(newValue.map((item) => item.id));
    //       }}
    //       disableCloseOnSelect
    //       multiple
    //       renderInput={(params) => (
    //         <TextField
    //           {...params}
    //           fullWidth
    //           inputRef={ref}
    //           error={!!error}
    //           helperText={error?.message}
    //           label={label}
    //         />
    //       )}
    //       renderOption={(props, option, { selected }) => (
    //         <Box component="li" {...props}>
    //           <Checkbox
    //             icon={<CheckBoxOutlineBlank />}
    //             checkedIcon={<CheckBoxIcon />}
    //             checked={selected}
    //           />
    //           {option.label}
    //         </Box>
    //       )}
    //     />
    //   )}
    // />
  );
}
