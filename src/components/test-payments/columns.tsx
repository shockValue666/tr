// "use client"

// import { ColumnDef } from "@tanstack/react-table"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// import { Checkbox } from "@/components/ui/checkbox"

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

// export const columns: ColumnDef<Payment>[] = [
//     {
//         id: "select",
//         header: ({ table }) => (
//         <Checkbox
//             checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && "indeterminate")
//             }
//             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//             aria-label="Select all"
//         />
//         ),
//         cell: ({ row }) => (
//         <Checkbox
//             checked={row.getIsSelected()}
//             onCheckedChange={(value) => row.toggleSelected(!!value)}
//             aria-label="Select row"
//         />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     },

//     {
//     id: "actions",
//     cell: ({ row }) => {
//       const payment = row.original
 
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)
 
//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
// ]

"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FaArrowAltCircleRight, FaArrowCircleRight } from "react-icons/fa";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {timeAgo} from "@/lib/utils"
import Image from 'next/image'
import dex from '../../../public/dexlogo.png'


import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { toast } from "../ui/use-toast"



const formatTxId = (txId:string) => {
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
        onCheckedChange={(value:any) => {table.toggleAllPageRowsSelected(!!value);}}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value:any) => {row.toggleSelected(!!value);console.log("here cock cock cock");toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
          duration: 2000,
        })}}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tx_id",
    header: "tx_id",
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">
          <a href={`https://solscan.io/tx/${row.getValue("tx_id")}`} target="_blank">
            {formatTxId(row.getValue("tx_id"))}
          </a>
        </div>
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
          className=""
        >
          created_at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      // console.log("rrrroooowwwww: ",row.original.new_copy_trading_addresses.description)
      // console.log("rrrrowwwww: ",row.getValue("swapper_description"))
      return (
        <div className="text-xl md:text-md text-center">{timeAgo(row.getValue("created_at"))}</div>
      )
    }
  },
  {
    accessorKey: "swapper_address",
    header: "swapper_address",
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center flex justify-center items-center gap-x-2">

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
          className=""
        >
          swapper_description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">{row.original.new_copy_trading_addresses.description ? row.original.new_copy_trading_addresses.description : ""}</div>
      )
    }
  },
  {
    accessorKey: "token_in_symbol",
    header: "token_in_symbol",
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center flex justify-center items-center gap-x-2">
          <div className="hover:text-gray-400 cursor-pointer">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* <Button variant="outline"> */}
                  <div onClick={()=>{console.log("clicked");}}> 
                    {/* Copy to Clipboard <FaArrowCircleRight className="ml-2 h-4 w-4" /> */}
                    {/* {row.getValue("token_in_symbol")} */}
                    <CopyToClipboard text={row.getValue("token_in_mint")}
                      onCopy={() => 
                        // this.setState({copied: true})
                        console.log("NEVER COPE?", row.getValue("token_in_mint"))
                      }>
                      <span>{row.getValue("token_in_symbol")}</span>
                    </CopyToClipboard>
                  </div>
                  {/* </Button> */}
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-white">Click to copy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <a href={`https://dexscreener.com/solana/${row.getValue("token_in_mint")}?maker=${row.getValue("swapper_address")}`} target="_blank">
            {/* {row.getValue("token_in_mint")} */}
            <div className="flex justify-center gap-x-2 items-center">
              <FaArrowAltCircleRight />
              {/* maker */}
            </div>
          </a>
          <a href={`https://dexscreener.com/solana/${row.getValue("token_in_mint")}`} target="_blank">
            <Image src={dex} width={30} height={30} alt="some shit"/>
          </a>
        </div>
      )
    }
  },
  {
    accessorKey: "token_in_amount",
    header: "token_in_amount",
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">{(parseFloat(row.getValue("token_in_amount"))).toFixed(2)}</div>
      )
    }
  },
  {
    accessorKey: "token_in_mint",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          
          token_in_mint
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center flex justify-center items-center gap-x-2">
          <div className="hover:text-gray-400 cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* <Button variant="outline"> */}
                    <div onClick={()=>{console.log("clicked");}}> 
                      {/* Copy to Clipboard <FaArrowCircleRight className="ml-2 h-4 w-4" /> */}
                      {/* {row.getValue("token_in_symbol")} */}
                      <CopyToClipboard text={row.getValue("token_in_mint")}
                        onCopy={() => 
                          // this.setState({copied: true})
                          console.log("NEVER COPE?", row.getValue("token_int_mint"))
                        }>
                        <span>{formatTxId(row.getValue("token_in_mint"))}</span>
                      </CopyToClipboard>
                    </div>
                    {/* </Button> */}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-white">Click to copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          <a href={`https://solscan.io/account/${row.getValue("token_in_mint")}`} target="_blank">
            <FaArrowAltCircleRight />
          </a>
        </div>
      )
    }
  },
  {
    accessorKey: "token_out_symbol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          token_out_symbol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
          <div className="text-xl md:text-md text-center flex justify-center items-center gap-x-2">
            <div className="hover:text-gray-400 cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* <Button variant="outline"> */}
                    <div onClick={()=>{console.log("clicked");}}> 
                      {/* Copy to Clipboard <FaArrowCircleRight className="ml-2 h-4 w-4" /> */}
                      {/* {row.getValue("token_in_symbol")} */}
                      <CopyToClipboard text={row.getValue("token_out_mint")}
                        onCopy={() => 
                          // this.setState({copied: true})
                          console.log("NEVER COPE?", row.getValue("token_out_mint"))
                        }>
                        <span>{formatTxId(row.getValue("token_out_symbol"))}</span>
                      </CopyToClipboard>
                    </div>
                    {/* </Button> */}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-white">Click to copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <a href={`https://dexscreener.com/solana/${row.getValue("token_out_mint")}?maker=${row.getValue("swapper_address")}`} target="_blank">
            {/* {row.getValue("token_out_mint")} */}
            <div className="flex justify-center gap-x-2 items-center">
              <FaArrowAltCircleRight />
              {/* maker */}
            </div>
          </a>
          <a href={`https://dexscreener.com/solana/${row.getValue("token_out_mint")}`} target="_blank">
            <Image src={dex} width={30} height={30} alt="some shit"/>
          </a>
          </div>
      )
    }
  },
  {
    accessorKey: "token_out_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          token_out_amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">
          {(parseFloat(row.getValue("token_out_amount"))).toFixed(2)}
        </div>
      )
    }
  },
  {
    accessorKey: "token_out_mint",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          
          token_out_mint
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">
          <a href={`https://dexscreener.com/solana/${row.getValue("token_out_mint")}`} target="_blank">
            {formatTxId(row.getValue("token_out_mint"))}
          </a>
        </div>
      )
    }
  },
  {
    accessorKey: "price_per_token",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          price_per_token
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">{parseFloat(row.getValue("price_per_token")).toFixed(3)}</div>
      )
    }
  },
  {
    accessorKey: "swap_description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          swap_description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">{row.getValue("swap_description")}</div>
      )
    }
  },
  // {
  //   accessorKey: "pnl",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         className=""
  //       >
  //         pnl
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     console.log("OG ROW",row.original)
  //     //.new_copy_trading_addresses.new_copy_trading_coins_of_owners)
  //     let pnl=0;
  //     row.original.new_copy_trading_addresses.new_copy_trading_coins_of_owners.map(({token_symbol,total_amount_bought_in_usdc, total_amount_sold_in_usdc}:any)=>{
  //       const currentCoin = row.original.token_in_symbol === "SOL" ? row.original.token_out_symbol : row.original.token_in_symbol
  //       console.log("currentCoin: ",currentCoin, "coin: ",token_symbol)
  //       if(currentCoin === token_symbol){
  //         console.log("found coin")
  //         pnl = total_amount_sold_in_usdc - total_amount_bought_in_usdc
  //       }
  //     })
  //     return (
  //       <div className="text-xl md:text-md text-center">{pnl}</div>
  //     )
  //   }
  // },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xl md:text-md text-center">{row.getValue("email")}</div>
      )
    }
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right sm:text-xl font-medium">{formatted}</div>
    },
  },
]
