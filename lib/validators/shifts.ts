import { z } from "zod"

const ShiftSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type ShiftRequest = z.infer<typeof ShiftSchema>

export { type ShiftRequest, ShiftSchema }
