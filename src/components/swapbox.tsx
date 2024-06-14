"use client";
import React from 'react'
import { Card } from "@/components/ui/card"
import { Input } from './ui/input';
import { Button } from './ui/button';


interface SwaBoxProps {
    tokenIn: string,
    tokenOut: string,
    tokenInAmount: number,
    tokenOutAmount: number,

}

const SwapBox:React.FC<SwaBoxProps> = ({
    tokenIn,
    tokenOut,
    tokenInAmount,
    tokenOutAmount,
}) => {
  return (
    <div className='flex flex-col md:flex-row w-full'>
        <Card className="p-4 rounded-lg shadow-sm dark:bg-gray-950 dark:text-gray-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-full p-2 dark:bg-gray-800">
                    <RepeatIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                    <p className="text-sm font-medium">{tokenIn} → {tokenOut}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transaction ID: 0x12345...</p>
                </div>
                </div>
                <div className="text-right">
                <p className="text-sm font-medium">{tokenInAmount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tokenOutAmount}</p>
                </div>
            </div>
        </Card>
        <div className='flex md:flex-row flex-col items-center justify-center'>
            <Input type="number" placeholder="0.0 SOL" className="w-full"/>
            <Button onClick={()=>{console.log("clicked");}}>Swap</Button>
        </div>
    </div>
  )
}

export default SwapBox

function RepeatIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  )
}