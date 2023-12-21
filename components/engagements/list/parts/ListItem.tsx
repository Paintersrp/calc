import type { FC, ReactNode } from "react"
import { format } from "date-fns"

import { useEngagements, type Engagement } from "@/lib/state/engagements"
import { buttonVariants } from "@/components/ui/Button"
import { Text } from "@/components/ui/Text"

interface ListItemProps {
  engagement: Engagement
  handleSelect: (id: string) => void
  children: ReactNode
}

const ListItem: FC<ListItemProps> = ({ engagement, handleSelect, children }) => {
  const { selected } = useEngagements()

  return (
    <div key={engagement.id}>
      <li
        className={buttonVariants({
          variant: selected?.id === engagement.id ? "accent" : "ghost",
          className: "flex flex-col w-full !py-10 justify-center items-start",
        })}
        onClick={() => handleSelect(engagement.id)}
      >
        <div className="flex w-full">
          <div className="flex flex-col items-start w-full">
            <Text type="h4" size="lg">
              {engagement.associate}
            </Text>

            <Text variant="slate">Type: {engagement.type}</Text>

            <Text className="dark:text-blue-400 text-blue-600">
              {format(engagement.date, "MMMM d, hh:mm b")}
            </Text>
          </div>
          <div className="flex gap-1 items-start">{children}</div>
        </div>
      </li>
    </div>
  )
}

export { ListItem }
