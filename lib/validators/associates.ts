import { z } from "zod"

const AssociateSchema = z.object({
  login: z.string().min(1, "Login is required"),
  department_id: z.string().min(1, "Department ID is required"),
  shift_id: z.string().min(1, "Shift ID is required"),
  roles: z.array(z.string()).optional(),
})

type AssociateRequest = z.infer<typeof AssociateSchema>

export { type AssociateRequest, AssociateSchema }
