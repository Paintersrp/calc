import { EngagementDetail } from "@/components/engagements/detail/EngagementDetail"
import { EngagementList } from "@/components/engagements/list/EngagementList"

export default function Page() {
  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 pt-4 sm:pt-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 w-full border space-y-4 p-4 border-b-0 md:border-b-[1px] md:border-r-0 dark:border-slate-700 border-slate-300 md:rounded-l-md min-h-[300px]">
          <EngagementList />
        </div>
        <div className="col-span-2 sm:space-y-4 border p-4 dark:border-slate-700 border-slate-300 md:rounded-r-md  min-h-[300px]">
          <EngagementDetail />
        </div>
      </div>
    </section>
  )
}
