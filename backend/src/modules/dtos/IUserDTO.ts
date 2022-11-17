import * as z from "zod";

export const UserSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .regex(/.*[A-Z].*/, "One uppercase character")
    .regex(/.*\d.*/, "One number"),
});

export type IUserDTO = z.infer<typeof UserSchema>;
