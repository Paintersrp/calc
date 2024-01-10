"use client"

import { useEffect, useState, type FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

import { useEngagements } from "@/lib/state/engagements"
import { EngagementRequest, EngagementSchema } from "@/lib/validators/engagement"
import { toast } from "@/hooks/useToast"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Text } from "@/components/ui/Text"
import { Textarea } from "@/components/ui/Textarea"
import { TooltipWrapper } from "@/components/ui/Tooltip"

const EngagementAddDialog: FC = () => {
  const { addEngagement, setSelected } = useEngagements()
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EngagementRequest>({
    resolver: zodResolver(EngagementSchema),
  })

  const onSubmit = (data: EngagementRequest) => {
    try {
      const newEnagementId = addEngagement({ ...data })

      toast({
        title: "Engagement Added",
        description: "The engagement has been successfully added.",
        variant: "success",
      })

      setSelected(newEnagementId)

      reset()
    } catch (error) {
      toast({
        title: "Error Adding Engagement",
        description: "There was an issue adding the engagement. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "q") {
      event.preventDefault()
      toggleOpen()
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Error Adding Engagement",
        description: "There was an issue adding the engagement. Please try again.",
        variant: "destructive",
      })
    }
  }, [errors])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger>
        <TooltipWrapper
          content={
            <>
              <Text className="font-medium">Add new engagement</Text>
              <Text className="font-medium">
                <kbd className="rounded-md border bg-accent px-1 py-0.5 text-sm font-bold">
                  CTRL-Q
                </kbd>{" "}
                to open with shortcut
              </Text>
            </>
          }
        >
          <Button variant="ghost" size="icon">
            <Plus />
          </Button>
        </TooltipWrapper>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Engagement</DialogTitle>
          <DialogDescription className="dark:text-white text-black">
            Fill in the details to add a new engagement.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Associate Login Input  */}
          <div className="space-y-1">
            <Text className="mb-1 dark:font-semibold font-medium">
              Associate Login<span className="ml-[0.1rem]">*</span>
            </Text>

            <Input {...register("associate")} />
            {errors.associate && (
              <Text variant="red" size="sm" className="font-semibold">
                {errors.associate.message}
              </Text>
            )}
          </div>

          {/* Engagement Type Input  */}
          <div className="space-y-1">
            <Text className="mb-1 dark:font-semibold font-medium">
              Type<span className="ml-[0.1rem]">*</span>
            </Text>
            <Input {...register("type")} />
            {errors.type && (
              <Text variant="red" size="sm" className="font-semibold">
                {errors.type.message}
              </Text>
            )}
          </div>

          {/* Engagement Notes Input  */}
          <div className="space-y-1">
            <Text className="mb-1 dark:font-semibold font-medium">Notes</Text>
            <Textarea rows={6} {...register("notes")} />
            {errors.notes && (
              <Text variant="red" size="sm" className="font-semibold">
                {errors.notes.message}
              </Text>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end pt-2">
            <DialogClose asChild>
              <Button type="button" variant="destructive" className="font-bold text-white">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={(e) => e.stopPropagation()}>
                Add Engagement
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { EngagementAddDialog }
