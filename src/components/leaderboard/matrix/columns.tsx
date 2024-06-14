"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// import { Button } from "./ui/button"
import { Button } from "../../ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FaArrowAltCircleRight, FaArrowCircleRight } from "react-icons/fa";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { timeAgo } from "@/lib/utils"
import Image from 'next/image'

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../../ui/tooltip"
import Link from "next/link"
import { columnHeaderTextStyle } from "@/lib/constants"



const formatTxId = (txId: string) => {
  if (txId.length <= 6) {
    return txId; // Return as is if the length is too short to trim
  }
  const start = txId.slice(0, 3);
  const end = txId.slice(-3);
  return `${start}...${end}`;
};


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "swapper_address",
    header: "Swapper Address",
    cell: ({ row }) => {
      return (
        <div className="text-base md:text-md text-center flex justify-center items-center gap-x-2">

          <div className="hover:text-gray-400 cursor-pointer">
            <CopyToClipboard text={row.getValue("swapper_address")}
              onCopy={() =>
                // this.setState({copied: true})
                console.log("cope?")
              }>
              <span>
                <Link href={`/address/${row.getValue("swapper_address")}`}>
                  {formatTxId(row.getValue("swapper_address"))}
                </Link>
              </span>
            </CopyToClipboard>


          </div>
          <a href={`https://solscan.io/account/${row.getValue("swapper_address")}`} target="_blank">
            <FaArrowAltCircleRight />
          </a>

        </div>
      )
    }
  },
  {
    accessorKey: "swapper_description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`${columnHeaderTextStyle} rounded-sm`}
        >
          Swapper Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      let content = row.original.description

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-base md:text-md text-center truncate">
                {content}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{content}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  
  
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`${columnHeaderTextStyle} rounded-sm`}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      // console.log("rrrroooowwwww: ",row.original.new_copy_trading_addresses.description)
      // console.log("rrrrowwwww: ",row.getValue("swapper_description"))
      return (
        <div className="text-base md:text-md text-center">{timeAgo(row.getValue("created_at"))}</div>
      )
    }
  },

  {
    accessorKey: "pnl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={`${columnHeaderTextStyle} rounded-sm`}
        >
          PnL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      // console.log("rrrroooowwwww: ",row.original.new_copy_trading_addresses.description)
      // console.log("rrrrowwwww: ",row.getValue("swapper_description"))
      return (
        <div className="text-base md:text-md text-center">{row.getValue("pnl")}</div>
      )
    }
  },
]
