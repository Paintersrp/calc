import type { FC } from "react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Icons } from "@/components/ui/Icons"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import { TooltipWrapper } from "@/components/ui/Tooltip"

const GroupSkeleton: FC = () => {
  return (
    <div className="relative">
      <Card className="mb-4 space-y-2">
        <CardHeader className="p-4 pb-2 justify-center">
          <div className="flex justify-between">
            <Skeleton className="h-[1.9rem] w-2/5 bg-accent/75" />

            <div className="flex gap-2">
              <Skeleton className="h-6 w-6 rounded-md bg-accent/75" />
              <Skeleton className="h-6 w-6 rounded-md bg-accent/75" />
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-4 pt-2">
          <Skeleton className="h-4 w-full mb-2 p-4 bg-accent/75" />
          <div className="space-y-2">
            <Separator />
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <>
                <div key={rowIndex} className="flex justify-between items-center gap-2">
                  <Skeleton className="h-6 w-[7.5%] p-5 rounded-md bg-accent/75" />
                  <Skeleton className="h-6 w-[45%] p-5 rounded-md bg-accent/75" />
                  <Skeleton className="h-6 w-[45%] p-5 rounded-md bg-accent/75" />
                  <Skeleton className="h-6 w-6 rounded-md bg-accent/75" />
                </div>
                <Separator />
              </>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Skeleton className="h-8 w-8 rounded-md bg-accent/75" />
          </div>
        </CardContent>
      </Card>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TooltipWrapper content="Add Group">
          <Button variant="success" size="iconSm" className="h-14 w-14">
            <Icons.PlusSquare className="w-10 h-10" />
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  )
}

export { GroupSkeleton }
