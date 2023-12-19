import Link from "next/link"

import {
  SideCard,
  SideCardContent,
  SideCardHeader,
} from "@/components/SideCard"

export default function Page() {
  return (
    <section className="sm:container gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-4 md:gap-x-4 sm:py-6 ">
        <div className="order-first sm:order-last sm:space-y-4">
          {/* User information */}
          <SideCard mobileHide={false}>
            <SideCardHeader className="bg-slate-700 text-white">
              <h1 className="text-lg">Results</h1>
            </SideCardHeader>
            <SideCardContent className="space-y-1 text-white">
              <p>Placeholder</p>
              <p>Placeholder</p>
            </SideCardContent>
          </SideCard>
        </div>
        <div className="col-span-2 w-full">Test</div>
      </div>
    </section>
  )
}
