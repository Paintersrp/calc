"use client"

import type { FC } from "react"
import type { Row } from "@tanstack/react-table"

import { ValleyRequest, ValleySchema } from "@/lib/validators/valleys"
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

import type { ValleyColumn } from "./ValleyColumns"

interface ValleyEditModalProps {
  row: Row<ValleyColumn>
  open: boolean
  onClose: () => void
}

const ValleyEditModal: FC<ValleyEditModalProps> = ({ row, open, onClose }) => {
  const { form, onEdit, isLoading } = useEditFormModal<ValleyRequest & { id: string }>({
    original: {
      id: row.original.id,
      name: row.original.name,
      group_id: String(row.original.group_id),
    },
    schema: ValleySchema,
    route: "valleys",
    objectName: "Valley",
  })

  return (
    <EditModal
      title="Edit Valley"
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
                <FormLabel>Valley Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Enter valley name..." {...field} />
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

export { ValleyEditModal }
