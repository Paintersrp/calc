"use client"

import { useState, type FC } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { RosterEntryRequest, RosterEntrySchema } from "@/lib/validators/roster-entry"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Icons } from "@/components/ui/Icons"
import { Input } from "@/components/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Text } from "@/components/ui/Text"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { MultiSelect } from "@/components/composed/MultiSelect"

import { FilterOptions } from "./RosterTable"

interface RosterAddModalProps {
  options: FilterOptions
}

const RosterAddModal: FC<RosterAddModalProps> = ({ options }) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedItems, setSelectedItems] = useState<{ id: string; name: string }[]>([])

  const [open, setOpen] = useState<boolean>(false)
  const [keepOpen, setKeepOpen] = useState<boolean>(false)

  const form = useForm<RosterEntryRequest>({
    resolver: zodResolver(RosterEntrySchema),
  })

  const onSubmit = async (data: RosterEntryRequest) => {
    try {
      setIsLoading(true)

      await axios.post("/api/associates", { ...data, roles: selectedRoles })

      form.reset({
        login: "",
        department_id: "",
        shift_id: "",
      })
      setSelectedRoles([])
      setSelectedItems([])
      router.refresh()

      toast.success("Roster entry added,", {
        description: "Roster entry has been created successfully.",
      })

      if (!keepOpen) {
        setOpen(false)
      }
    } catch (error) {
      console.error(error)

      toast.error("Roster entry failed.", {
        description: "Please verify your input and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TooltipWrapper content={<Text className="font-medium">Add new roster entry</Text>}>
          <Button variant="outline" size="sm" className="ml-auto flex h-8">
            <Icons.PlusSquare className="mr-2 h-5 w-5" />
            Add
          </Button>
        </TooltipWrapper>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Roster Entry</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full py-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Enter login..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 w-full">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Department</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a department"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {options.department.map((option) => (
                            <SelectItem key={option.id} value={String(option.id)}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="shift_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Shift</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.shift.map((option) => (
                          <SelectItem key={option.name} value={String(option.id)}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>Roles</FormLabel>
              {/* todo condense to one state? */}
              <MultiSelect
                options={options.roles}
                selected={selectedRoles}
                setSelected={setSelectedRoles}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
              <FormMessage />
            </FormItem>
          </form>
        </Form>

        <DialogFooter className="gap-2 sm:gap-0 justify-between w-full">
          <div className="flex w-full items-center">
            <Checkbox checked={keepOpen} onCheckedChange={() => setKeepOpen(!keepOpen)} />
            <Text className="ml-2 font-medium text-sm">Add another?</Text>
          </div>
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="success" onClick={form.handleSubmit(onSubmit)} type="button">
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { RosterAddModal }
