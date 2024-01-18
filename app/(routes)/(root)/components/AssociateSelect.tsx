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

interface AssociateSelectProps {
  assignment: AssignmentWithAssociateAndRole
}

const AssociateSelect: FC<AssociateSelectProps> = ({ assignment }) => {
  const [associateId, setAssociateId] = useState<string>(String(assignment.associate_id))
  const { roster, refetchPlanData } = useShiftPlanData()

  const updateData = async (value: string) => {
    try {
      await axios.patch(`/api/assignments/${assignment.id}`, {
        associate_id: value,
        role_id: assignment.role_id,
        group_id: assignment.group_id,
      })

      await refetchPlanData()
      setAssociateId(value)

      toast.success("Success", {
        description: `Assignment associate has been successfully updated.`,
      })
    } catch (error) {
      console.error(error)
      toast.error("Error", {
        description: "Please verify your input and try again.",
      })
    }
  }

  if (!roster) return <Loading />

  return (
    <Select
      value={associateId}
      defaultValue={associateId}
      onValueChange={(value) => updateData(value)}
    >
      <SelectTrigger>
        <SelectValue defaultValue={associateId} placeholder="Select associate" />
      </SelectTrigger>
      <SelectContent>
        {assignment.role_id &&
          roster[assignment.role_id] &&
          roster[assignment.role_id].associates.map((associate) => {
            return (
              <SelectItem key={associate.id} value={String(associate.id)}>
                {associate.login} {associate.shift}
              </SelectItem>
            )
          })}
      </SelectContent>
    </Select>
  )
}

export { AssociateSelect }
