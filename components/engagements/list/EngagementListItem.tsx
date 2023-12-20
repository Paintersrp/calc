import type { FC, ReactNode } from "react"
import { format } from "date-fns"

import { useEngagements, type Engagement } from "@/lib/state/engagements"
import { buttonVariants } from "@/components/ui/Button"

interface EngagementListItemProps {
  engagement: Engagement
  handleSelect: (id: string) => void
  children: ReactNode
}

const EngagementListItem: FC<EngagementListItemProps> = ({
  engagement,
  handleSelect,
  children,
}) => {
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
            <h3 className="text-lg dark:font-semibold leading-none tracking-tight">
              {engagement.title}
            </h3>
            <p className="dark:text-blue-400 text-blue-600">
              {format(engagement.date, "MMMM d, hh:mm b")}
            </p>
          </div>
          <div className="flex gap-1 items-start">{children}</div>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="dark:text-slate-300 text-slate-600">Login: {engagement.login}</p>
          <p className="dark:text-slate-300 text-slate-600">{engagement.type}</p>
        </div>
      </li>
    </div>
  )
}

export { EngagementListItem }
