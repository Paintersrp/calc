"use client"

import type { FC } from "react"

import { DepartmentRequest, DepartmentSchema } from "@/lib/validators/departments"
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

interface DepartmentAddModalProps {}

const DepartmentAddModal: FC<DepartmentAddModalProps> = () => {
  const { open, setOpen, keepOpen, setKeepOpen, form, onAdd, isLoading } =
    useAddFormModal<DepartmentRequest>({
      schema: DepartmentSchema,
      route: "departments",
      objectName: "Department",
    })

  return (
    <AddModal
      title="Add Department"
      tooltip="Add department entry"
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
    </AddModal>
  )
}

export { DepartmentAddModal }
