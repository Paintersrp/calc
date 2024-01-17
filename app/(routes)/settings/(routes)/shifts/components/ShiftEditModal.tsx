"use client"

import type { FC } from "react"
import type { Row } from "@tanstack/react-table"

import { ShiftRequest, ShiftSchema } from "@/lib/validators/shifts"
import { useEditFormModal } from "@/hooks/useEditFormModal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { EditModal } from "@/components/shared/EditModal"

import type { ShiftColumn } from "./ShiftColumns"

interface ShiftEditModalProps {
  row: Row<ShiftColumn>
  open: boolean
  onClose: () => void
}

const ShiftEditModal: FC<ShiftEditModalProps> = ({ row, open, onClose }) => {
  const { form, onEdit, isLoading } = useEditFormModal<ShiftRequest>({
    original: row.original,
    schema: ShiftSchema,
    route: "shifts",
    objectName: "Shift",
  })

  return (
    <EditModal
      title="Edit Shift"
      open={open}
      onClose={onClose}
      onSubmit={form.handleSubmit(onEdit)}
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
                  <Input disabled={isLoading} placeholder="Enter shift name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </EditModal>
  )
}

export { ShiftEditModal }
