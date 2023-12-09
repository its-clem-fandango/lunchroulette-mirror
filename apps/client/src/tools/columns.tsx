"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  firstName: string
  id: string
  isAvailableToday: boolean
  lastMatched: string
  lastName: string
  matchId: string
}

export const columns: ColumnDef<User>[] = [
  //accessorKey lets you work with the values from specific columns
  //header is the name you see rendered for that column
  {
    accessorKey: "firstName",
    header: "Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "isAvailableToday",
    header: "Availability",
  },
  {
    accessorKey: "matchId",
    header: "Match ID",
  },
  {
    accessorKey: "lastMatched",
    header: "Last Matched",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
]
