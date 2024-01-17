import type { FC } from "react"

import { Headcounts } from "./components/Headcounts"

interface HeadcountPageProps {
  // Add your prop types here
}

const HeadcountPage: FC<HeadcountPageProps> = ({}) => {
  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 md:py-6 space-y-4">
      <Headcounts />
      {/* <section className="col-span-2 space-y-4 border rounded-lg p-4">
          <Heading title="Headcount Table" titleClass="text-xl" />
          <Separator />
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="1">Q1</TabsTrigger>
              <TabsTrigger value="2">Q2</TabsTrigger>
              <TabsTrigger value="3">Q3</TabsTrigger>
              <TabsTrigger value="4">Q4</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
             
            </TabsContent>
            <TabsContent value="2">Change your password here.</TabsContent>
            <TabsContent value="3">Change your password here.</TabsContent>
            <TabsContent value="4">Change your password here.</TabsContent>
          </Tabs>
        </section> */}
    </section>
  )
}

export default HeadcountPage
