import { z } from "zod"

const RoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type RoleRequest = z.infer<typeof RoleSchema>

export { type RoleRequest, RoleSchema }
