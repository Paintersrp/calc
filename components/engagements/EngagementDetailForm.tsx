import { useEffect, type FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useEngagements, type Engagement } from "@/lib/state/engagements"
import { EngagementRequest, EngagementSchema } from "@/lib/validators/engagement"
import { toast } from "@/hooks/useToast"

import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"

interface EngagementDetailFormProps {
  selected: Engagement
}

const EngagementDetailForm: FC<EngagementDetailFormProps> = ({ selected }) => {
  const { setSelected, setSelectedFromHistory, updateEngagement, updateEngagementHistory } =
    useEngagements()

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
        <h2 className="mb-1 text-base dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
          Title
        </h2>
        <Input className="dark:text-white text-black text-[0.925rem]" {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <h2 className="mb-1 text-base dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
          Associate Login
        </h2>
        <Input className="dark:text-white text-black text-[0.925rem]" {...register("login")} />
        {errors.login && <p>{errors.login.message}</p>}
      </div>
      <div>
        <h2 className="mb-1 text-base dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
          Type
        </h2>
        <Input className="dark:text-white text-black text-[0.925rem]" {...register("type")} />
        {errors.type && <p>{errors.type.message}</p>}
      </div>
      <div className="col-span-2">
        <h2 className="mb-1 text-base dark:font-semibold font-medium dark:text-blue-400 text-blue-600">
          Description
        </h2>
        <Textarea
          className="dark:text-white text-black text-[0.925rem]"
          rows={6}
          {...register("description")}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
    </form>
  )
}

export { EngagementDetailForm }
