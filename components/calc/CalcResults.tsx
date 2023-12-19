"use client"

import type { FC } from "react"

import { useInputStore } from "@/lib/state/input"
import { useResultStore } from "@/lib/state/results"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

import CalcResultsSkeleton from "./CalcResultsSkeleton"

const CalcResults: FC = () => {
  const { requiredRate } = useResultStore()
  const { currentRate } = useInputStore()

  const levelRates = [
    { level: 5, rate: 1.0 },
    { level: 4, rate: 0.95 },
    { level: 3, rate: 0.9 },
    { level: 2, rate: 0.85 },
    { level: 1, rate: 0.8 },
  ]

  const calculateUnitsPerTimeFrame = (rate: number, timeFrameInMinutes: number) => {
    return (rate / 60) * timeFrameInMinutes
  }

  if (requiredRate === 0) {
    return <CalcResultsSkeleton />
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium">Calculation Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 dark:bg-slate-800 bg-slate-400 rounded-lg">
          <p className="text-md font-medium ">
            Adjusted Rate
            <span className="block font-semibold text-amber-300">
              {requiredRate.toFixed(2)} UPH
            </span>
          </p>
        </div>
        <div className="p-4 dark:bg-slate-800 bg-slate-400 rounded-lg">
          <p className="text-md font-medium">
            Current Rate
            <span className="block font-semibold text-amber-300">{currentRate.toFixed(2)} UPH</span>
          </p>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["item-0"]}>
        {levelRates.map((item, index) => {
          const rate = requiredRate * item.rate

          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex justify-between w-full mr-4 dark:font-semibold font-medium">
                  <span>
                    Level {item.level} ({item.rate * 100}%)
                  </span>
                  <span>Adjusted Rate: {rate.toFixed(2)} UPH</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[0.95rem]">
                <Table>
                  <TableHeader>
                    <TableRow className="dark:font-bold font-semibold text-base">
                      <TableHead scope="col">Interval (minutes)</TableHead>
                      <TableHead scope="col">Units to Process</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="dark:font-semibold font-medium">
                    {[60, 30, 20, 15, 10].map((timeFrame) => (
                      <TableRow key={timeFrame}>
                        <TableCell>{timeFrame}m</TableCell>
                        <TableCell>
                          {calculateUnitsPerTimeFrame(rate, timeFrame).toFixed(2)} Units
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default CalcResults
