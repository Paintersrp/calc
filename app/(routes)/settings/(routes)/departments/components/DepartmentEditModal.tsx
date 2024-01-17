"use client"

import type { FC } from "react"
import type { Row } from "@tanstack/react-table"

import { DepartmentRequest, DepartmentSchema } from "@/lib/validators/departments"
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

import type { DepartmentColumn } from "./DepartmentColumns"

interface DepartmentEditModalProps {
  row: Row<DepartmentColumn>
  open: boolean
  onClose: () => void
}

const DepartmentEditModal: FC<DepartmentEditModalProps> = ({ row, open, onClose }) => {
  const { form, onEdit, isLoading } = useEditFormModal<DepartmentRequest>({
    original: row.original,
    schema: DepartmentSchema,
    route: "departments",
    objectName: "Department",
  })

  return (
    <EditModal
      title="Edit Department"
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
                <FormLabel>Department Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Enter department name..." {...field} />
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

export { DepartmentEditModal }
