"use client"

import type { FC } from "react"

import { ValleyRequest, ValleySchema } from "@/lib/validators/valleys"
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

interface ValleyAddModalProps {
  options: FilterOptions
}

const ValleyAddModal: FC<ValleyAddModalProps> = ({ options }) => {
  const { open, setOpen, keepOpen, setKeepOpen, form, onAdd, isLoading } =
    useAddFormModal<ValleyRequest>({
      schema: ValleySchema,
      route: "valleys",
      objectName: "Valley",
    })

  return (
    <AddModal
      title="Add Valley"
      tooltip="Add valley entry"
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
                <FormLabel>Valley Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder={`Enter valley name...`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="group_id"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Valley Group</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a valley group..."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.valley_groups.map((process) => (
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

export { ValleyAddModal }
