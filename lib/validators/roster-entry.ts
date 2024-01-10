import { z } from "zod"

const RosterEntrySchema = z.object({
  login: z.string().min(1).max(30),
  department_id: z.string().min(1).max(30),
  shift_id: z.string().min(1).max(30),
  roles: z
    .array(z.string())
    .refine((value) => value.some((item) => item))
    .optional(),
})

type RosterEntryRequest = z.infer<typeof RosterEntrySchema>

export { type RosterEntryRequest, RosterEntrySchema }
