import { type FC } from "react"
import { GroupWithAssignments } from "@/actions/plans"
import { AnimatePresence, motion } from "framer-motion"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { AnimateHeight } from "@/components/ui/animated/AnimatedHeight"

import { AssignmentDeleteModal } from "./AssignmentDeleteModal"
import { AssociateSelect } from "./AssociateSelect"
import { RoleSelect } from "./RoleSelect"

interface GroupTableProps {
  group: GroupWithAssignments
}

const GroupTable: FC<GroupTableProps> = ({ group }) => {
  return (
    <AnimateHeight layout>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-2">Role</TableHead>
            <TableHead className="px-2">Associate</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {group.assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              {/* Role Select */}
              <TableCell className="px-1 py-2 w-1/2">
                <RoleSelect assignment={assignment} />
              </TableCell>

              {/* Associate Select */}
              <TableCell className="px-1 py-2 w-1/2">
                <AssociateSelect assignment={assignment} />
              </TableCell>

              {/* Assignment Delete Toggle / Modal */}
              <TableCell className="p-0">
                <AssignmentDeleteModal id={assignment.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AnimateHeight>
  )
}

export { GroupTable }
