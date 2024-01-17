import { z } from "zod"

const RoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  process_id: z.string().min(1, "Process ID is required"),
})

type RoleRequest = z.infer<typeof RoleSchema>

export { type RoleRequest, RoleSchema }
