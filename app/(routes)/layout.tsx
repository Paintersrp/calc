import { QuickAccess } from "@/components/composed/QuickAccess"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ValleyCountsByQuarterProvider } from "@/components/layout/ValleyCountByQuarterProvider"

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <ValleyCountsByQuarterProvider>
        <QuickAccess />
        <Header />
        <div className="flex-1 h-full">{children}</div>
        <Footer />
      </ValleyCountsByQuarterProvider>
    </>
  )
}
