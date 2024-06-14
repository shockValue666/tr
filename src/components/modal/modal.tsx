import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Column, ColumnDef } from "@tanstack/react-table"
import { useAppState } from "@/lib/providers/state-provider"
import NewMatrix from "../vif/page"
import MatrixOfTrades from "../trades-matrix/page";
import SwapBox from "../swapbox"
import { Input } from "../ui/input"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

interface ModalProps {
    test?: string,
    someOtherShit?: Column<DataTableProps<any, any>, unknown> | undefined
}

export const Modal:React.FC<ModalProps> = ({
    test
}) => {
  const [goal, setGoal] = React.useState(350)
  console.log("test from inside the modal: ",test)

  const {selectedTransactions} = useAppState();

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          {/* <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
          <DrawerHeader>
            some header
          </DrawerHeader>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>

          selecrted transactions: {selectedTransactions.length}
          {
            selectedTransactions.map((transaction) => {
              return <div key={transaction.id} className="flex gap-8 items-center w-[100%]">
                <SwapBox tokenIn={transaction.token_in_symbol} tokenOut={transaction.token_out_symbol} tokenInAmount={transaction.token_in_amount} tokenOutAmount={transaction.token_out_amount}/>
              </div>
            })
          }
          {/* <NewMatrix/> */}
          {/* <MatrixOfTrades/> */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
