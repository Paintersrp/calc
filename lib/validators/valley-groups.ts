import { z } from "zod"

const ValleyGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type ValleyGroupRequest = z.infer<typeof ValleyGroupSchema>

export { type ValleyGroupRequest, ValleyGroupSchema }
