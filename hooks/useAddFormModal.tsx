import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm, type FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface UseAddFormModalProps {
  schema: z.AnyZodObject
  route: string
  objectName: string
}

function useAddFormModal<T extends FieldValues>({
  schema,
  route,
  objectName,
}: UseAddFormModalProps) {
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)
  const [keepOpen, setKeepOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<T>({
    resolver: zodResolver(schema),
  })

  const onAdd = async (data: T) => {
    try {
      setIsLoading(true)

      await axios.post(`/api/${route}`, { ...data })

      const resetObject = Object.keys(data).reduce((acc: any, key) => {
        acc[key] = ""
        return acc
      }, {})

      form.reset(resetObject)

      if (!keepOpen) {
        setOpen(false)
      }

      router.refresh()

      toast.success("Success", {
        description: `${objectName} has been created successfully.`,
      })
    } catch (error) {
      toast.error("Error", {
        description: `${objectName} creation failed. Please try again.`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { open, setOpen, keepOpen, setKeepOpen, isLoading, form, onAdd }
}

export { useAddFormModal }
