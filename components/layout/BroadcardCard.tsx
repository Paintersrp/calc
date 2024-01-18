"use client"

import { FC, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/Button"
import { Icons } from "@/components/ui/Icons"

import { Label } from "../ui/Label"
import { Switch } from "../ui/Switch"
import type { BroadcastType } from "./BroadcastsProvider"

interface BroadcastCardProps {
  broadcast: BroadcastType
}

const transition = {
  type: "tween",
  ease: "linear",
  duration: 0.3,
}

const BroadcastCard: FC<BroadcastCardProps> = ({ broadcast }) => {
  const [check, setCheck] = useState<boolean>(broadcast.broadcast_open)

  const handleCheck = (checked: boolean) => {
    if (!checked) {
      markBroadcastFilled()
      setCheck(checked)
    } else {
      setCheck(checked)
    }
  }

  const markBroadcastFilled = async () => {
    try {
      const response = await axios.patch(`/api/stations/${broadcast.id}`, {
        name: broadcast.name,
        status: broadcast.status,
        valley_id: broadcast.valley_id,
        broadcast_open: "false",
      })

      console.log("Broadcast marked as filled:", response.data)
    } catch (error) {
      console.error("Error marking broadcast as filled:", error)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      className="p-4 flex w-full justify-between items-start"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center pb-1">
          <span className="h-3 w-3 rounded-full mr-2 bg-success" />
          <h3 className="text-lg font-semibold">{broadcast.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">Valley: {broadcast.valley!.name}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="broadcast">Broadcast</Label>
        <Switch
          id="broadcast"
          checked={check}
          onCheckedChange={handleCheck}
          className="data-[state=checked]:bg-success data-[state=unchecked]:bg-destructive/75"
        />
      </div>
    </motion.div>
  )
}

export { BroadcastCard }
