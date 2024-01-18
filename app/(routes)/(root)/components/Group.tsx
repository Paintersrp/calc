"use client"

import { FC } from "react"
import { GroupWithAssignments } from "@/actions/plans"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"

import { AssignmentAddButton } from "./AssignmentAddButton"
import { GroupSettings } from "./GroupSettings"
import { GroupTable } from "./GroupTable"

interface GroupProps {
  group: GroupWithAssignments
}

const Group: FC<GroupProps> = ({ group }) => {
  return (
    <Card key={group.id} className="mb-4 space-y-2">
      <CardHeader className="p-4 pb-2 justify-center">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{group.name}</span>

          <GroupSettings />
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-2 pt-0">
        <GroupTable group={group} />

        <AssignmentAddButton group={group} />
      </CardContent>
    </Card>
  )
}

export { Group }
