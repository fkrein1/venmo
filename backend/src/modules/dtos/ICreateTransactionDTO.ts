import * as z from "zod";

export const CreateTransactionSchema = z.object({
  debitedAccountId: z.string().uuid(),
  creditUsername: z.string().min(3),
  transactionValue: z.number().gt(0),
});

export type ICreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;
