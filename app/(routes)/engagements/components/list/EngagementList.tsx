"use client"

import { type FC } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

import { ActiveList } from "./ActiveList"
import { FollowUpList } from "./FollowUpList"
import { HistoryList } from "./HistoryList"

const EngagementList: FC = () => {
  return (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="followUp">Follow Ups</TabsTrigger>
        <TabsTrigger value="history">Historical</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <ActiveList />
      </TabsContent>
      <TabsContent value="followUp">
        <FollowUpList />
      </TabsContent>
      <TabsContent value="history">
        <HistoryList />
      </TabsContent>
    </Tabs>
  )
}

export { EngagementList }
