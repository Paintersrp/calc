// "use client"

// import { useCallback, useEffect, useState, type FC } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"

// import { useRosterStore } from "@/lib/state/roster"
// import { RosterEntryRequest, RosterEntrySchema } from "@/lib/validators/roster-entry"
// import { useAddModal } from "@/hooks/useAddModal"
// import { Button } from "@/components/ui/Button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/Dialog"

// import { MultiSelect } from "../../../../components/MultiSelect"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../../../components/ui/Form"
// import { Input } from "../../../../components/ui/Input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../../../components/ui/Select"

// const AddModal: FC = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [selected, setSelected] = useState<string[]>([])

//   const { open, setOpen } = useAddModal()
//   const { addEntry } = useRosterStore()

//   const form = useForm<RosterEntryRequest>({
//     resolver: zodResolver(RosterEntrySchema),
//     defaultValues: {},
//   })

//   const handleKeyDown = useCallback(
//     (event: KeyboardEvent) => {
//       if (event.ctrlKey && event.key === "q") {
//         event.preventDefault()
//         setOpen(!open)
//       }
//     },
//     [setOpen, open]
//   )

//   const onSubmit = async (data: RosterEntryRequest) => {
//     try {
//       setIsLoading(true)

//       addEntry({ ...data, roles: selected })

//       toast.success("success")
//     } catch (error) {
//       console.log(error)
//       toast.error("error")
//     } finally {
//       setIsLoading(false)
//       setOpen(false)
//     }
//   }

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown)

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown)
//     }
//   }, [handleKeyDown])

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Roster Entry</DialogTitle>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full py-4">
//             <div className="flex gap-2 w-full">
//               <FormField
//                 control={form.control}
//                 name="department"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Department</FormLabel>
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue
//                             defaultValue={field.value}
//                             placeholder="Select a department"
//                           />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {["CRETS", "Stow", "WHD", "ICQA", "Dock", "VR"].map((option) => (
//                           <SelectItem key={option} value={option}>
//                             {option}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="shift"
//                 render={({ field }) => (
//                   <FormItem className="w-full">
//                     <FormLabel>Shift</FormLabel>
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} placeholder="Select a shift" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {["FHD", "BHD", "FHN", "BHN", "FLEX"].map((option) => (
//                           <SelectItem key={option} value={option}>
//                             {option}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <FormField
//               control={form.control}
//               name="login"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Login</FormLabel>
//                   <FormControl>
//                     <Input disabled={isLoading} placeholder="Enter login..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormItem>
//               <FormLabel>Roles</FormLabel>
//               <MultiSelect selected={selected} setSelected={setSelected} />
//               <FormMessage />
//             </FormItem>
//           </form>
//         </Form>

//         <DialogFooter className="gap-2 sm:gap-0 justify-end md:justify-end">
//           <DialogClose asChild>
//             <Button type="button">Cancel</Button>
//           </DialogClose>
//           <DialogClose asChild>
//             <Button variant="success" onClick={form.handleSubmit(onSubmit)} type="button">
//               Confirm
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export { AddModal }
