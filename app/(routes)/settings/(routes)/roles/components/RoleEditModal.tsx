"use client"

import type { FC } from "react"
import type { Row } from "@tanstack/react-table"

import { RoleSchema, type RoleRequest } from "@/lib/validators/roles"
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

import type { RoleColumn } from "./RoleColumns"

interface RoleEditModalProps {
  row: Row<RoleColumn>
  open: boolean
  onClose: () => void
}

const RoleEditModal: FC<RoleEditModalProps> = ({ row, open, onClose }) => {
  const { form, onEdit, isLoading } = useEditFormModal<RoleRequest>({
    original: { ...row.original, process_id: String(row.original.process_id) },
    schema: RoleSchema,
    route: "roles",
    objectName: "Role",
  })


  return (
    <EditModal
      title="Edit Role"
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
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Enter role name..." {...field} />
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

export { RoleEditModal }
