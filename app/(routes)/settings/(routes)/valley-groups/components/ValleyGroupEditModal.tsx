"use client"

import type { FC } from "react"
import type { Row } from "@tanstack/react-table"

import { ValleyGroupSchema, type ValleyGroupRequest } from "@/lib/validators/valley-groups"
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

import type { ValleyGroupColumn } from "./ValleyGroupColumns"

interface ValleyGroupEditModalProps {
  row: Row<ValleyGroupColumn>
  open: boolean
  onClose: () => void
}

const ValleyGroupEditModal: FC<ValleyGroupEditModalProps> = ({ row, open, onClose }) => {
  const { form, onEdit, isLoading } = useEditFormModal<ValleyGroupRequest>({
    original: row.original,
    schema: ValleyGroupSchema,
    route: "valley-groups",
    objectName: "Valley Group",
  })

  return (
    <EditModal
      title="Edit Valley Group"
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
                <FormLabel>Valley Group Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Enter valley group name..." {...field} />
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

export { ValleyGroupEditModal }
