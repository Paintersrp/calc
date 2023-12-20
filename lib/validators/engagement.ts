import { z } from "zod"

export const EngagementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Type is required"),
  login: z.string().min(1, "Login is required"),
})

export type EngagementRequest = z.infer<typeof EngagementSchema>
