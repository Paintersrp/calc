"use client"

import { type FC } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import type { Tables } from "@/types/supabase"
import { capitalize } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Icons } from "@/components/ui/Icons"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import { Switch } from "@/components/ui/Switch"

interface StationCardProps {
  station: Tables<"stations">
}

const StationCard: FC<StationCardProps> = ({ station }) => {
  const router = useRouter()

  const updateData = async (value: string, type: "status" | "broadcast") => {
    try {
      await axios.patch(`/api/stations/${station.id}`, {
        valley_id: station.valley_id,
        name: station.name,
        status: type === "status" ? value : station.status,
        broadcast_open: type === "broadcast" ? value : station.broadcast_open ? "true" : "false",
      })

      router.refresh()

      toast.success("Success", {
        description: `${capitalize(type)} has been successfully updated.`,
      })
    } catch (error) {
      console.error(error)
      toast.error("Error", {
        description: "Please verify your input and try again.",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="px-4 py-2 flex-row items-center justify-between space-y-0">
        <CardTitle className="font-bold">{station.name}</CardTitle>
        <Icons.Monitor
          className={`h-6 w-6 ${
            station.status === "Functional" ? "text-success" : "text-destructive"
          }`}
        />
      </CardHeader>

      <Separator />

      <CardContent className="px-4 pt-2 pb-4 space-y-4">
        <div className="space-y-1">
          <Label>Status</Label>
          <Select
            defaultValue={station.status}
            onValueChange={(value) => updateData(value, "status")}
          >
            <SelectTrigger>
              <SelectValue defaultValue={station.status} placeholder="Select a status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Functional">Functional</SelectItem>
                <SelectItem value="Not Functional">Not Functional</SelectItem>
                <SelectItem value="Ticketed">Ticketed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 justify-between">
            <div className="flex items-center">
              <span
                className={`h-2 w-2 rounded-full mr-1.5 ${
                  station.broadcast_open ? "bg-success" : "bg-destructive"
                }`}
              />
              <Label htmlFor="broadcast">Broadcast</Label>
            </div>
            <Switch
              id="broadcast"
              disabled={station.status === "Not Functional" || station.status === "Ticketed"}
              checked={station.broadcast_open}
              onCheckedChange={(value) => updateData(String(value), "broadcast")}
              className="data-[state=checked]:bg-success data-[state=unchecked]:bg-destructive/75"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { StationCard }
