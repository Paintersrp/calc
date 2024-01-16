import { Separator } from "@/components/ui/Separator"

import { SettingsSidebar } from "./(routes)/(root)/components/SettingsSidebar"

interface SettingsLayoutProps {
  children: React.ReactNode
}

const navItems = [
  {
    title: "Application",
    href: "/settings",
  },
  {
    title: "Departments",
    href: "/settings/departments",
  },
  {
    title: "Shifts",
    href: "/settings/shifts",
  },
  {
    title: "Processes",
    href: "/settings/processes",
  },
  {
    title: "Roles",
    href: "/settings/roles",
  },
  {
    title: "Valleys",
    href: "/settings/valleys",
  },
]

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">View and manage application and table settings</p>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsSidebar items={navItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </section>
  )
}
