import { Loading } from "@/components/layout/Loading"

export default function LoadingPage() {
  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-4">
      <Loading className="h-full" />
    </section>
  )
}
