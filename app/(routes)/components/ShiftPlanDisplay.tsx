import { FC } from "react"
import { ShiftPlanWithGroups } from "@/actions/plans"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Icons } from "@/components/ui/Icons"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { TooltipWrapper } from "@/components/ui/Tooltip"

import { GroupSkeleton } from "./GroupSkeleton"

interface ShiftPlanDisplayProps {
  data: ShiftPlanWithGroups
}

const ShiftPlanDisplay: FC<ShiftPlanDisplayProps> = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.groups.map((group) => (
          <Card key={group.id} className="mb-4 space-y-2">
            <CardHeader className="p-4 pb-2 justify-center">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{group.name}</span>
                <div className="flex gap-2">
                  <TooltipWrapper content="Edit Group">
                    <Button variant="ghost" size="iconSm">
                      <Icons.Edit className="w-4 h-4" />
                    </Button>
                  </TooltipWrapper>
                  <TooltipWrapper content="Delete Group">
                    <Button variant="destructive" size="iconSm">
                      <Icons.Delete className="w-4 h-4" />
                    </Button>
                  </TooltipWrapper>
                </div>
              </CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="p-4 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-2 w-[5%]">#</TableHead>
                    <TableHead className="px-2">Role</TableHead>
                    <TableHead className="px-2">Associate</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.assignments.map((assignment, index) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="w-[5%] p-2">{index + 1}</TableCell>
                      <TableCell className="w-[47.5%] p-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">Blueberry</SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      {/* <TableCell>{assignment.role ? assignment.role.name : "Unassigned"}</TableCell> */}
                      <TableCell className="w-[47.5%] p-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select associate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">Blueberry</SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {/* {assignment.associate ? assignment.associate.login : "Unassigned"} */}
                      </TableCell>
                      <TableCell className="p-0">
                        <TooltipWrapper content="Delete Assignment">
                          <Button variant="destructive" size="iconSm" className="w-6 h-6">
                            <Icons.Delete className="w-4 h-4" />
                          </Button>
                        </TooltipWrapper>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="min-w-full flex justify-center">
                <TooltipWrapper content="Add Assignment">
                  <Button variant="ghost" size="iconSm" className="h-8 w-8">
                    <Icons.PlusSquare className="w-5 h-5" />
                  </Button>
                </TooltipWrapper>
              </div>
            </CardContent>
          </Card>
        ))}
        <GroupSkeleton />
      </div>
    </>
  )
}

export { ShiftPlanDisplay }
