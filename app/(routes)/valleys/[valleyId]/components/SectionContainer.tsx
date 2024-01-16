import type { FC, ReactNode } from "react"

interface SectionContainerProps {
  children: ReactNode
}

const SectionContainer: FC<SectionContainerProps> = ({ children }) => {
  return <section className="space-y-4 border rounded-lg p-4">{children}</section>
}

export { SectionContainer }
