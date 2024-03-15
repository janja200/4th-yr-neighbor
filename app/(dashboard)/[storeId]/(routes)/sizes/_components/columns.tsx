"use client"

import { ColumnDef } from "@tanstack/react-table"
import { cellAction as CellAction} from "./cell-action"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type sizeColumn = {
  id: string
  name: string
  value:string
  createdAt: string

}

export const columns: ColumnDef<sizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row})=><CellAction data={row.original}/>,
  },
]
