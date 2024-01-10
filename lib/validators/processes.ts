import { z } from "zod"

const ProcessSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type ProcessRequest = z.infer<typeof ProcessSchema>

export { type ProcessRequest, ProcessSchema }
