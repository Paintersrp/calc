import { useEffect, type FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useEngagements, type Engagement } from "@/lib/state/engagements"
import { EngagementRequest, EngagementSchema } from "@/lib/validators/engagement"
import { toast } from "@/hooks/useToast"
import { Input } from "@/components/ui/Input"
import { Text } from "@/components/ui/Text"
import { Textarea } from "@/components/ui/Textarea"

interface EngagementDetailFormProps {
  selected: Engagement
}

const EngagementDetailForm: FC<EngagementDetailFormProps> = ({ selected }) => {
  const {
    setSelected,
    setSelectedFromHistory,
    setSelectedFromFollowUp,
    updateEngagement,
    updateEngagementHistory,
    updateFollowUpEngagement,
  } = useEngagements()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EngagementRequest>({
    resolver: zodResolver(EngagementSchema),
    defaultValues: { ...selected },
  })

  useEffect(() => {
    // Reset the form with the new selected engagement as default values
    if (selected) {
      reset(selected)
    }
  }, [reset, selected])

  const onSubmit = (data: EngagementRequest) => {
    if (selected) {
      try {
        if (selected.status === "active") {
          updateEngagement(selected.id, { ...data })
          setSelected(selected.id)
        } else if (selected.status === "done") {
          updateEngagementHistory(selected.id, { ...data })
          setSelectedFromHistory(selected.id)
        } else if (selected.status === "followUp") {
          updateFollowUpEngagement(selected.id, { ...data })
          setSelectedFromFollowUp(selected.id)
        }

        toast({
          title: "Engagement updated!",
          description: "The engagement has been successfully updated.",
          variant: "success",
        })

        reset()
      } catch (error) {
        toast({
          title: "Error updating engagement",
          description: "There was an issue updating the engagement. Please try again.",
          variant: "destructive",
        })
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4" id="update-form">
      <div>
        <Text variant="blue" className="mb-1 dark:font-semibold font-medium">
          Associate Login
        </Text>

        <Input className="dark:text-white text-black text-[0.925rem]" {...register("associate")} />

        {errors.associate && (
          <Text variant="red" size="sm" className="font-semibold">
            {errors.associate.message}
          </Text>
        )}
      </div>
      <div>
        <Text variant="blue" className="mb-1 dark:font-semibold font-medium">
          Type
        </Text>

        <Input className="dark:text-white text-black text-[0.925rem]" {...register("type")} />

        {errors.type && (
          <Text variant="red" size="sm" className="font-semibold">
            {errors.type.message}
          </Text>
        )}
      </div>
      <div className="col-span-2">
        <Text variant="blue" className="mb-1 dark:font-semibold font-medium">
          Notes
        </Text>

        <Textarea
          className="dark:text-white text-black text-[0.925rem]"
          rows={6}
          {...register("notes")}
        />

        {errors.notes && (
          <Text variant="red" size="sm" className="font-semibold">
            {errors.notes.message}
          </Text>
        )}
      </div>
    </form>
  )
}

export { EngagementDetailForm }
