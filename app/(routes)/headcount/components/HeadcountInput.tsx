"use client"

import { ChangeEvent, FocusEvent, useState, type FC } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import { Input } from "@/components/ui/Input"

interface HeadcountInputProps {
  headcount: ValleyCountByQuarter
}

const HeadcountInput: FC<HeadcountInputProps> = ({ headcount }) => {
  const router = useRouter()
  const [count, setCount] = useState(headcount.count)
  const [recentCount, setRecentCount] = useState(headcount.count)

  const updateHeadcount = async () => {
    try {
      const { data } = await axios.patch(`/api/headcounts/${headcount.id}`, {
        valley_id: headcount.valley_id,
        quarter_id: headcount.quarter_id,
        count: count,
      })

      setRecentCount(data.count)
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
    setCount(newValue)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    const newValue = Number(event.target.value)

    if (newValue !== recentCount) updateHeadcount()
  }

  const handleKeyPress = (event: KeyboardEvent & { target: { value: string } }) => {
    if (event.key === "Enter") {
      const newValue = Number(event.target.value)

      if (newValue !== recentCount) updateHeadcount()
    }
  }
  return (
    <Input
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) =>
        handleKeyPress(e as unknown as KeyboardEvent & { target: { value: string } })
      }
      id="headcount"
      placeholder="Enter HC"
      value={count}
      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  )
}

export { HeadcountInput }
