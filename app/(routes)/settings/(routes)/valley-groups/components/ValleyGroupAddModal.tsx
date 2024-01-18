"use client"

import type { FC } from "react"

import { ValleyGroupSchema, type ValleyGroupRequest } from "@/lib/validators/valley-groups"
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

interface ValleyGroupAddModalProps {}

const ValleyGroupAddModal: FC<ValleyGroupAddModalProps> = ({}) => {
  const { open, setOpen, keepOpen, setKeepOpen, form, onAdd, isLoading } =
    useAddFormModal<ValleyGroupRequest>({
      schema: ValleyGroupSchema,
      route: "valley-groups",
      objectName: "Valley Group",
    })

  return (
    <AddModal
      title="Add Valley Group"
      tooltip="Add valley group entry"
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
    </AddModal>
  )
}

export { ValleyGroupAddModal }
