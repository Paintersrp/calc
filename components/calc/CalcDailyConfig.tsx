import type { FC } from "react"

import { calculateRequiredRateAuto, calculateRequiredRateManual } from "@/lib/calc-rate"
import { useConfig } from "@/lib/state/config"
import { useInputs } from "@/lib/state/input"
import { useResults } from "@/lib/state/results"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

// Manual Clock Out Time

const CalcDailyConfig: FC = () => {
  const {
    type,
    shift,
    setShift,
    targetRate,
    setTargetRate,
    remainingHoursAuto,
    remainingHoursManual,
    setRemainingHoursManual,
  } = useConfig()

  const { hoursWorked, currentRate, setCurrentRate, unitsProcessed, setUnitsProcessed } =
    useInputs()

  const { setRequiredRate } = useResults()

  const handleCalculate = () => {
    let requiredRate: number

    console.log("here")

    if (type === "manual") {
      requiredRate = calculateRequiredRateManual(
        targetRate,
        unitsProcessed,
        hoursWorked,
        remainingHoursManual
      )
    } else {
      console.log("here")
      requiredRate = calculateRequiredRateAuto(
        targetRate,
        unitsProcessed,
        hoursWorked,
        remainingHoursAuto
      )
    }

    setRequiredRate(requiredRate)
  }

  return (
    <>
      <div className="flex-col flex items-center gap-4">
        {type !== "manual" && (
          <div className="w-full space-y-1.5">
            <Label className="font-semibold text-base">Select Shift or Manual Input</Label>

            <Select onValueChange={setShift} value={shift}>
              <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:text-white font-semibold text-base">
                <SelectValue placeholder="Select Shift..." />
              </SelectTrigger>
              <SelectContent className="dark:border-slate-700 border-slate-300 font-semibold">
                <SelectItem value="FHD" className="text-base">
                  FHD
                </SelectItem>
                <SelectItem value="BHD" className="text-base">
                  BHD
                </SelectItem>
                <SelectItem value="FHN" className="text-base">
                  FHN
                </SelectItem>
                <SelectItem value="BHN10" className="text-base">
                  BHN (10 Hours)
                </SelectItem>
                <SelectItem value="BHN12" className="text-base">
                  BHN (12 Hours)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="w-full space-y-1.5">
          <Label htmlFor="targetRate" className="font-semibold text-base">
            Target Rate
          </Label>

          <Input
            onChange={(e) => {
              setTargetRate(Number(e.target.value))
            }}
            value={targetRate}
            type="number"
            id="targetRate"
            className="dark:border-slate-700 border-slate-300 dark:text-white font-semibold text-base"
          />
        </div>
        <div className="w-full space-y-1.5">
          <Label htmlFor="hoursRemaining" className="font-semibold text-base">
            Hours Remaining
          </Label>

          {type === "manual" ? (
            <Input
              onChange={(e) => {
                setRemainingHoursManual(Number(e.target.value))
              }}
              type="number"
              step="0.1"
              value={remainingHoursManual}
              id="hoursRemaining"
              className="dark:border-slate-700 border-slate-300 dark:text-white font-semibold text-base"
            />
          ) : (
            <Input
              disabled
              value={remainingHoursAuto}
              id="hoursRemaining"
              className="dark:border-slate-700 border-slate-300 dark:text-white font-semibold text-base"
            />
          )}
        </div>
      </div>
      <h1 className="text-2xl pt-6 font-semibold">Current Associate Values</h1>
      <div className="flex-col flex items-center gap-4">
        <div className="w-full space-y-1.5">
          <Label htmlFor="currentRate" className="font-semibold text-base">
            Current Rate
          </Label>

          <Input
            onChange={(e) => {
              setCurrentRate(Number(e.target.value))
            }}
            type="number"
            id="currentRate"
            value={currentRate}
            className="dark:border-slate-700 border-slate-300 dark:text-white font-semibold text-base"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="unitsProcessed" className="font-semibold text-base">
            Units Processed
          </Label>

          <Input
            onChange={(e) => {
              setUnitsProcessed(Number(e.target.value))
            }}
            step={10}
            type="number"
            value={unitsProcessed}
            id="unitsProcessed"
            className="dark:border-slate-700 border-slate-300 dark:text-white font-semibold text-base"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="hoursWorked" className="font-semibold text-base">
            Hours Worked
          </Label>
          <Input
            disabled
            value={hoursWorked}
            id="hoursWorked"
            className="dark:border-slate-700 border-slate-300 dark:text-white font-semibold text-base"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="slate" onClick={handleCalculate}>
          Calculate
        </Button>
      </div>
    </>
  )
}

export default CalcDailyConfig
