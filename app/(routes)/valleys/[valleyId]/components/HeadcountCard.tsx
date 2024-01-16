"use client"

import { useState, type ChangeEvent, type FC, type FocusEvent, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import { Card, CardContent, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

interface HeadcountCardProps {
  count: ValleyCountById
}

const HeadcountCard: FC<HeadcountCardProps> = ({ count }) => {
  const router = useRouter()
  const [headcount, setHeadcount] = useState(count.count)
  const [recentHeadcount, setRecentHeadcount] = useState(count.count)

  const updateHeadcount = async () => {
    try {
      const { data } = await axios.patch(`/api/headcounts/${count.id}`, {
        valley_id: count.valley_id,
        quarter_id: count.quarter_id,
        count: headcount,
      })

      setRecentHeadcount(data.count)
      router.refresh()

      toast.success("Success", {
        description: "Headcount has been successfully updated.",
      })
    } catch (error) {
      console.error(error)
      toast.error("Error", {
        description: "Please verify your input and try again.",
      })
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    setHeadcount(newValue)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    const newValue = Number(event.target.value)

    if (newValue !== recentHeadcount) updateHeadcount()
  }

  const handleKeyPress = (event: KeyboardEvent & { target: { value: string } }) => {
    if (event.key === "Enter") {
      const newValue = Number(event.target.value)

      if (newValue !== recentHeadcount) updateHeadcount()
    }
  }

  return (
    <Card>
      <CardContent className="py-4 px-4 flex">
        <CardTitle className="text-lg font-bold flex justify-center mr-4">
          {count.quarter.name}
        </CardTitle>
        <div className="space-y-1 w-full">
          <Label htmlFor="email">Headcount</Label>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) =>
              handleKeyPress(e as unknown as KeyboardEvent & { target: { value: string } })
            }
            id="headcount"
            placeholder="Enter HC..."
            value={headcount}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export { HeadcountCard }
