import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option.ts";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/form.tsx";
import { Checkbox } from "@/components/core/checkbox.tsx";

interface Props<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  label: string;
}

export function CustomCheckbox<T extends FieldValues>({
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
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
          </div>
          {options?.map((option) => (
            <FormItem
              key={option.id}
              className="flex flex-row items-start space-x-3 space-y-0"
            >
              <FormControl>
                <Checkbox
                  checked={field.value?.includes(option.id)}
                  onCheckedChange={(checked) => {
                    const updatedSkills = checked
                      ? [...field.value, option.id]
                      : field.value?.filter(
                          (value: string) => value !== option.id
                        );
                    field.onChange(updatedSkills);
                  }}
                />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
    // <Controller
    //   control={control}
    //   name={name}
    //   render={({ field: { value, onChange }, fieldState: { error } }) => (
    //     <FormControl error={!!error}>
    //       <FormLabel>{label}</FormLabel>
    //       <FormGroup>
    //         {options?.map((option) => (
    //           <FormControlLabel
    //             key={option.id}
    //             label={option.label}
    //             control={
    //               <Checkbox
    //                 checked={value.includes(option.id)}
    //                 onChange={() => {
    //                   if (value.includes(option.id)) {
    //                     onChange(
    //                       (value as string[]).filter(
    //                         (item) => item !== option.id
    //                       )
    //                     );
    //                   } else {
    //                     onChange([...value, option.id]);
    //                   }
    //                 }}
    //                 key={option.id}
    //               />
    //             }
    //           />
    //         ))}
    //       </FormGroup>
    //       <FormHelperText>{error?.message}</FormHelperText>
    //     </FormControl>
    //   )}
    // ></Controller>
  );
}
