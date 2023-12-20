"use client"

import { FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useEngagements } from "@/lib/state/engagements"
import { toast } from "@/hooks/use-toast"
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
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"

const engagementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Type is required"),
  login: z.string().min(1, "Login is required"),
})

type EngagementRequest = z.infer<typeof engagementSchema>

const EngagementAddDialog: FC = () => {
  const { addEngagement } = useEngagements()
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EngagementRequest>({
    resolver: zodResolver(engagementSchema),
  })

  const addClick = () => {
    setIsAdding(!isAdding)
  }

  const onSubmit = (data: EngagementRequest) => {
    try {
      addEngagement({ ...data })

      toast({
        title: "Engagement Added",
        description: "The engagement has been successfully added.",
        variant: "success",
      })

      setIsAdding(false)
      reset()
    } catch (error) {
      toast({
        title: "Error Adding Engagement",
        description: "There was an issue adding the engagement. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger onClick={addClick}>
        <Button variant="ghost" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Engagement</DialogTitle>
          <DialogDescription className="dark:text-white text-black">
            Fill in the details to add a new engagement.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-1">
            <Label>Title:</Label>
            <Input {...register("title")} />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className="space-y-1">
            <Label>Type:</Label>
            <Input {...register("type")} />
            {errors.type && <p>{errors.type.message}</p>}
          </div>

          <div className="space-y-1">
            <Label>Login:</Label>
            <Input {...register("login")} />
            {errors.login && <p>{errors.login.message}</p>}
          </div>

          <div className="space-y-1">
            <Label>Description:</Label>
            <Textarea rows={6} {...register("description")} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end pt-2">
            <DialogClose asChild>
              <Button type="button" variant="destructive" className="font-bold text-white">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Add Engagement</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EngagementAddDialog
