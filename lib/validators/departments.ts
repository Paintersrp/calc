import { z } from "zod"

const DepartmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type DepartmentRequest = z.infer<typeof DepartmentSchema>

export { type DepartmentRequest, DepartmentSchema }
