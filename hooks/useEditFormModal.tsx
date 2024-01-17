import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface UseEditFormModalProps<T extends FieldValues> {
  original: T
  schema: z.AnyZodObject
  route: string
  objectName: string
}

function useEditFormModal<T extends FieldValues>({
  original,
  schema,
  route,
  objectName,
}: UseEditFormModalProps<T>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: original as DefaultValues<T>,
  })

  const onEdit = async (data: T) => {
    try {
      setIsLoading(true)

      await axios.patch(`/api/${route}/${original.id}`, { ...original, ...data })

      router.refresh()

      toast.success("Success", {
        description: `${objectName} has been updated successfully.`,
      })
    } catch (error) {
      toast.error("Error", {
        description: `${objectName} update failed. Please try again.`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onEdit, isLoading }
}

export { useEditFormModal }
