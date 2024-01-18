import type { FC } from "react"
import { useRouter } from "next/navigation"
import { GroupWithAssignments } from "@/actions/plans"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"
import { TooltipWrapper } from "@/components/ui/Tooltip"

import { useShiftPlanData } from "./ShiftPlanDataProvider"

interface AssignmentAddButtonProps {
  group: GroupWithAssignments
}

const AssignmentAddButton: FC<AssignmentAddButtonProps> = ({ group }) => {
  const { refetchPlanData } = useShiftPlanData()

  const addAssignment = async () => {
    try {
      await axios.post(`/api/assignments`, {
        associate_id: null,
        role_id: null,
        group_id: group.id,
      })

      await refetchPlanData()

      toast.success("Success", {
        description: `Assignment has been successfully added.`,
      })
    } catch (error) {
      console.error(error)
      toast.error("Error", {
        description: "Please verify your input and try again.",
      })
    }
  }

  return (
    <div className="min-w-full flex justify-center">
      <TooltipWrapper content="Add Assignment">
        <Button variant="ghost" size="iconSm" className="h-8 w-8" onClick={addAssignment}>
          <Icons.PlusSquare className="w-5 h-5" />
        </Button>
      </TooltipWrapper>
    </div>
  )
}

export { AssignmentAddButton }
