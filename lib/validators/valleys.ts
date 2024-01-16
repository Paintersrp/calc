import { z } from "zod"

const ValleySchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type ValleyRequest = z.infer<typeof ValleySchema>

export { type ValleyRequest, ValleySchema }
