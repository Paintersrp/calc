import { useState, type FC } from "react"
import { AssignmentWithAssociateAndRole } from "@/actions/plans"
import axios from "axios"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Loading } from "@/components/layout/Loading"

import { useShiftPlanData } from "./ShiftPlanDataProvider"

interface RoleSelectProps {
  assignment: AssignmentWithAssociateAndRole
}

const RoleSelect: FC<RoleSelectProps> = ({ assignment }) => {
  const [roleId, setRoleId] = useState<string>(String(assignment.role_id))
  const { roles, refetchPlanData } = useShiftPlanData()

  const updateData = async (value: string) => {
    try {
      await axios.patch(`/api/assignments/${assignment.id}`, {
        associate_id: assignment.associate_id,
        role_id: value,
        group_id: assignment.group_id,
      })

      await refetchPlanData()
      setRoleId(value)

      toast.success("Success", {
        description: `Assignment role has been successfully updated.`,
      })
    } catch (error) {
      console.error(error)
      toast.error("Error", {
        description: "Please verify your input and try again.",
      })
    }
  }

  if (!roles) return <Loading />

  return (
    <Select value={roleId} defaultValue={roleId} onValueChange={(value) => updateData(value)}>
      <SelectTrigger>
        <SelectValue defaultValue={roleId} placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={String(role.id)}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { RoleSelect }
