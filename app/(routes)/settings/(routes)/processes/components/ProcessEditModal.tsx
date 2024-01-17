"use client"

import type { FC } from "react"
import type { Row } from "@tanstack/react-table"

import { ProcessRequest, ProcessSchema } from "@/lib/validators/processes"
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

import type { ProcessColumn } from "./ProcessColumns"

interface ProcessEditModalProps {
  row: Row<ProcessColumn>
  open: boolean
  onClose: () => void
}

const ProcessEditModal: FC<ProcessEditModalProps> = ({ row, open, onClose }) => {
  const { form, onEdit, isLoading } = useEditFormModal<ProcessRequest>({
    original: row.original,
    schema: ProcessSchema,
    route: "processes",
    objectName: "Process",
  })

  return (
    <EditModal
      title="Edit Process"
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
                <FormLabel>Process Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Enter process name..." {...field} />
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

export { ProcessEditModal }
