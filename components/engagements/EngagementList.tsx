"use client"

import { type FC } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

import { EngagementActiveList } from "./EngagementActiveList"
import { EngagementFollowUpList } from "./EngagementFollowUpList"
import { EngagementHistoryList } from "./EngagementHistoryList"

const EngagementList: FC = () => {
  return (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="followUp">Follow Ups</TabsTrigger>
        <TabsTrigger value="history">Historical</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <EngagementActiveList />
      </TabsContent>
      <TabsContent value="followUp">
        <EngagementFollowUpList />
      </TabsContent>
      <TabsContent value="history">
        <EngagementHistoryList />
      </TabsContent>
    </Tabs>
  )
}

export { EngagementList }
