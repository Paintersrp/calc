"use client"

import type { FC } from "react"

import { ShiftRequest, ShiftSchema } from "@/lib/validators/shifts"
import { useAddFormModal } from "@/hooks/useAddFormModal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { AddModal } from "@/components/shared/AddModal"

interface ShiftAddModalProps {}

const ShiftAddModal: FC<ShiftAddModalProps> = () => {
  const { open, setOpen, keepOpen, setKeepOpen, form, onAdd, isLoading } =
    useAddFormModal<ShiftRequest>({
      schema: ShiftSchema,
      route: "shifts",
      objectName: "Shift",
    })

  return (
    <AddModal
      title="Add Shift"
      tooltip="Add shift entry"
      open={open}
      setOpen={setOpen}
      keepOpen={keepOpen}
      setKeepOpen={setKeepOpen}
      onSubmit={form.handleSubmit(onAdd)}
      isLoading={isLoading}
    >
      <Form {...form}>
        <form className="space-y-4 w-full py-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder={`Enter shift name...`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </AddModal>
  )
}

export { ShiftAddModal }
