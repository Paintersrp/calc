import type { FC } from "react"

import { Separator } from "@/components/ui/Separator"

const Page: FC = () => {
  return (
    <>
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Manage Application Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage application general settings, fonts, colors, and theming.
          </p>
        </div>
        <Separator />

        {/* todo */}
        <div>Main Application Settings</div>
      </section>
    </>
  )
}

export default Page
