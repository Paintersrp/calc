import { z } from "zod"

const ValleySchema = z.object({
  name: z.string().min(1, "Name is required"),
  group_id: z.string().min(1, "Group ID is required"),
})

type ValleyRequest = z.infer<typeof ValleySchema>

export { type ValleyRequest, ValleySchema }
