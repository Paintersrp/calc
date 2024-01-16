import { getValleys } from "@/actions/valleys"

import { HeaderActions } from "./HeaderActions"
import { HeaderNavigation } from "./HeaderNavigation"

const Header = async () => {
  const valleys = await getValleys(`*, valley_group:valley_groups (*)`)

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b dark:border-slate-700 border-slate-300">
      <div className="px-4 sm:container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* <Navbar /> */}
        <HeaderNavigation valleys={valleys} />
        <HeaderActions />
      </div>
    </header>
  )
}

export { Header }
