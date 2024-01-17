import type { FC } from "react"

import { Input } from "@/components/ui/Input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

import { HeadcountInput } from "./HeadcountInput"

interface HeadcountTableProps {
  counts: ValleyCountByQuarter[]
}

const HeadcountTable: FC<HeadcountTableProps> = ({ counts }) => {
  return (
    <Table>
      {/* todo add PA name */}
      {/* todo minus broken stations */}
      <TableHeader>
        <TableRow>
          <TableHead className="p-2">Valley</TableHead>
          <TableHead className="p-2">PA/PG</TableHead>
          <TableHead className="p-2">Stations</TableHead>
          <TableHead className="p-2">Open Stations</TableHead>
          <TableHead className="p-2 w-[100px]">Headcount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {counts.map((count) => (
          <TableRow key={count.id}>
            <TableCell className="p-2">{count.valley.name}</TableCell>
            <TableCell className="p-2"></TableCell>
            <TableCell className="p-2">{count.valley.stations.length}</TableCell>
            <TableCell className="p-2">{count.valley.stations.length - count.count}</TableCell>
            <TableCell className="p-2 w-[110px]">
              <HeadcountInput headcount={count} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { HeadcountTable }
