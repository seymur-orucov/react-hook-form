import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option.ts";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/core/form";
import { RadioGroup, RadioGroupItem } from "@/components/core/radio-group";

interface Props<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  label: string;
}

export function CustomRadioGroup<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-1"
            >
              {options?.map((option) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={option.id} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    // <Controller
    //   control={control}
    //   name={name}
    //   render={({ field, fieldState: { error } }) => (
    //     <FormControl {...field} error={!!error}>
    //       <FormLabel>{label}</FormLabel>
    //       <RadioGroup>
    //         {options?.map((option) => (
    //           <FormControlLabel
    //             value={option.id}
    //             control={<Radio checked={field.value === option.id} />}
    //             label={option.label}
    //             key={option.id}
    //           />
    //         ))}
    //       </RadioGroup>
    //     </FormControl>
    //   )}
    // ></Controller>
  );
}
