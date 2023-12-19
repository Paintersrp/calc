"use client"

import { useEffect, type FC } from "react"

import { useConfigStore } from "@/lib/state/config"
import { useResultStore } from "@/lib/state/results"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"
import { InfoPopover } from "@/components/InfoPopover"

import CalcDailyConfig from "./CalcDailyConfig"

const CalcConfiguration: FC = () => {
  const { type, setType, shift, updateRemainingHoursAuto } = useConfigStore()
  const { setRequiredRate } = useResultStore()

  useEffect(() => {
    const intervalId = setInterval(updateRemainingHoursAuto, 60000)

    return () => clearInterval(intervalId)
  }, [shift, updateRemainingHoursAuto])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Rate Calculator Configuration</h1>
        <InfoPopover>
          {/* <p className="text-lg font-semibold mb-2">Calculator Overview</p> */}
          <ul className="list-disc list-inside ">
            <li>
              <span className="font-semibold">Daily/Manual Toggle:</span> Switch between Daily and
              Manual to set the calculation type.
            </li>
            <li>
              <span className="font-semibold">Shift Selection (Daily):</span> Choose the specific
              shift for accurate rate calculation.
            </li>
            <li>
              <span className="font-semibold">Target Rate Input:</span> Enter the desired target
              rate for the calculation.
            </li>
            <li>
              <span className="font-semibold">Hours Remaining:</span> View the non-editable
              remaining hours in the shift if set to Daily or enter the current hours remaining for
              Manual.
            </li>

            <li>
              <span className="font-semibold">Current Rate:</span> Enter the associate&#39;s current
              rate.
            </li>
            <li>
              <span className="font-semibold">Units Processed:</span> Input the number of units
              processed.
            </li>
            <li>
              <span className="font-semibold">Hours Worked:</span> Displays the hours already worked
              (derived from Units Processed / Current Rate).
            </li>

            <li>
              <span className="font-semibold">Calculate Button:</span> Computes the required rate
              based on the provided data.
            </li>
          </ul>
          <p className="text-sm  mt-3">
            This tool assists in calculating the required rate for associates, ensuring accuracy and
            efficiency in workforce management.
          </p>
        </InfoPopover>
      </div>
      <ToggleGroup
        variant="outline"
        type="single"
        onValueChange={(type: string) => {
          setType(type)
          setRequiredRate(0)
        }}
        value={type}
        className=""
      >
        <ToggleGroupItem
          size="lg"
          value="daily"
          className="dark:!text-white hover:!text-white data-[state=on]:text-white"
        >
          Daily
        </ToggleGroupItem>
        <ToggleGroupItem
          size="lg"
          value="manual"
          className="dark:!text-white hover:!text-white data-[state=on]:text-white"
        >
          Manual
        </ToggleGroupItem>
      </ToggleGroup>
      <CalcDailyConfig />
    </div>
  )
}

export default CalcConfiguration
