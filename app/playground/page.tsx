import type { FC } from "react"

interface PageNameProps {
  // Add your prop types here
}

const PageName: FC<PageNameProps> = ({}) => {
  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 pt-4 sm:pt-6 md:py-10">
      Playground
    </section>
  )
}

export default PageName
