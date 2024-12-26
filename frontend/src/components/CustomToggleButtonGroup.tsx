import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option.ts";
import { ToggleGroup, ToggleGroupItem } from "@/components/core/toggle-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/form.tsx";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
};

export function CustomToggleButtonGroup<T extends FieldValues>({
  name,
  options,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Font Size</FormLabel>
          <FormControl>
            <Controller
              name={field.name}
              control={control}
              render={({ field }) => (
                <ToggleGroup
                  type="multiple"
                  onValueChange={field.onChange}
                  value={field.value}
                  variant="default"
                >
                  {options?.map((option) => (
                    <ToggleGroupItem value={option.id}>
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    // <Controller
    //   control={control}
    //   name={name}
    //   render={({ field: { onChange, value, ...restField } }) => (
    //     <ToggleButtonGroup
    //       onChange={(_, newValue) => {
    //         if (newValue.length) {
    //           onChange(newValue);
    //         }
    //       }}
    //       value={value.length ? value : [options?.[0].id]}
    //       {...restField}
    //     >
    //       {options?.map((option) => (
    //         <ToggleButton value={option.id} key={option.id}>
    //           {option.label}
    //         </ToggleButton>
    //       ))}
    //     </ToggleButtonGroup>
    //   )}
    // ></Controller>
  );
}
