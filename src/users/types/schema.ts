import { z } from "zod";
import { patterns } from "../../constants.ts";

export const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text: string) => patterns.email.test(text), {
      message: "Email not valid",
    }),
  states: z.array(z.string().min(1).max(2)),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  email: "",
  name: "",
  states: [],
};
