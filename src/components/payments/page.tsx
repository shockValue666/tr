"use client";
import { useEffect, useState } from "react";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAppState } from "@/lib/providers/state-provider";

async function getData() {
  // Fetch data from your API here.
  const supabase = createClientComponentClient();
  console.log("async function")
  const {data, error} = await supabase.from('new_copy_trading_transaction')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);
  if(error || !data){
      console.log("error", error)
  }
  if(data){
      console.log("data from my cock",data)
      return data;
  }
  
  return [
    {
      amount: 100,
      status: "pending",
      email: "m@example.com",
      created_at: "2021-09-01T12:00:00Z",
      tx_id: "0x123456",
      swapper_address: "0x123456",
      token_in_symbol: "ETH",
      token_in_amount: 100,
      token_in_mint: "0x123456",
      token_out_symbol: "USDC",
      token_out_amount: 100,
      token_out_mint: "0x123456",
      price_per_token: 1,
      swap_description: "ETH to USDC",
      
    },
    // ...
  ]
}

interface DemoPageProps{
  data:any[]
}

export const DemoPage:React.FC<DemoPageProps> = ({
  data
}) => {
  // const data = await getData()
  const {localData} = useAppState();

  useEffect(()=>{
    console.log("localData from payments: ",localData, "generally data: ",data)
  },[localData])

  if(localData.length!==0){
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }else{
    return (
      <div className="container mx-auto py-10">
        loading...
      </div>
    )
  }
}
