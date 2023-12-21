import { z } from "zod"

export const EngagementSchema = z.object({
  associate: z.string().min(1, "Associate is required"),
  type: z.string().min(1, "Type is required"),
  notes: z.string().optional(),
})

export type EngagementRequest = z.infer<typeof EngagementSchema>
