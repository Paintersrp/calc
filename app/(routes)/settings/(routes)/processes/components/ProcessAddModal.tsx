"use client"

import type { FC } from "react"

import { ProcessRequest, ProcessSchema } from "@/lib/validators/processes"
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

interface ProcessAddModalProps {}

const ProcessAddModal: FC<ProcessAddModalProps> = () => {
  const { open, setOpen, keepOpen, setKeepOpen, form, onAdd, isLoading } =
    useAddFormModal<ProcessRequest>({
      schema: ProcessSchema,
      route: "processes",
      objectName: "Process",
    })

  return (
    <AddModal
      title="Add Process"
      tooltip="Add process entry"
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
                <FormLabel>Process Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder={`Enter process name...`} {...field} />
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

export { ProcessAddModal }
