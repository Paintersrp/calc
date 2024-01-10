import { z } from "zod"

const EngagementSchema = z.object({
  associate: z.string().min(1, "Associate is required"),
  type: z.string().min(1, "Type is required"),
  notes: z.string().optional(),
})

type EngagementRequest = z.infer<typeof EngagementSchema>

export { type EngagementRequest, EngagementSchema }
