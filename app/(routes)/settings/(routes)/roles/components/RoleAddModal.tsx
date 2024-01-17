"use client"

import type { FC } from "react"

import type { Tables } from "@/types/supabase"
import { RoleSchema, type RoleRequest } from "@/lib/validators/roles"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { AddModal } from "@/components/shared/AddModal"

interface RoleAddModalProps {
  processes: Tables<"processes">[]
}

const RoleAddModal: FC<RoleAddModalProps> = ({ processes }) => {
  const { open, setOpen, keepOpen, setKeepOpen, form, onAdd, isLoading } =
    useAddFormModal<RoleRequest>({
      schema: RoleSchema,
      route: "roles",
      objectName: "Role",
    })

  return (
    <AddModal
      title="Add Role"
      tooltip="Add role entry"
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
                <FormLabel>Role Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Enter role name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="process_id"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Process</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a process..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {processes.map((process) => (
                        <SelectItem key={process.id} value={String(process.id)}>
                          {process.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </form>
      </Form>
    </AddModal>
  )
}

export { RoleAddModal }
