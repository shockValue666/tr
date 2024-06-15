// "use client";
import {DemoPage} from "@/components/payments/page";
import RealtimePosts from "@/components/realtime-posts";
import DemoPageNew from "@/components/test-payments/page";
import TestPayments from "@/components/test-payments/page";
import NewMatrix from "@/components/vif/page";
import { useAppState } from "@/lib/providers/state-provider";
import { useTransactions } from "@/lib/providers/transaction-context-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export type NewCopyTradingTransaction = {
    id:string;
    token_in_amount: number;
    token_out_amount: number;
    token_in_symbol: string;
    token_out_symbol: string;
    created_at: string;
    tx_id: string;
    swapper_address: string;
    token_in_mint: string;
    token_out_mint: string;
    price_per_token: number;
    swap_description: string;

}

const calculatePnl = async () => {
    const supabase = createClientComponentClient();
    const {data, error} = await supabase.from('new_copy_trading_transaction')
        .select('token_in_amount, token_out_amount, price_per_token')
        .order('created_at', { ascending: false })
        .limit(200);
    if(error || !data){
        console.log("error", error)
    }
    if(data){
        console.log("data from calculate pnl: ",data)
    }
}
export default function Home() {

  // const [data,setData] = useState<any[]>([]);
  // const {dispatch, localData} = useAppState();

  // // const transactions = useTransactions();

  // const supabase = createClientComponentClient();
  // // console.log("async function")

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     const {data:fetchData, error} = await supabase.from('new_copy_trading_transaction')
  //       .select('*')
  //       .order('created_at', { ascending: false })
  //       .limit(200);
  //     if(error || !fetchData){
  //         // console.log("error", error)
  //     }
  //     if(fetchData){
  //         console.log("data from the frontedn: ",fetchData, "localData", localData, "typeof localData", typeof localData)
  //         // setData(data);
  //         //set data the same + the new ones? 
  //         setData([...fetchData]);
  //     }

  //     const channel = supabase.channel('new_copy_trading_transaction')
  //       .on(
  //         'postgres_changes', 
  //         {event:"*",schema:"public",table:"new_copy_trading_transaction"} ,
  //         (payload) => {
  //           console.log("something from here ig ",payload, 'localData', localData, 'typeof localData', typeof localData)
  //           setData(prevData => prevData ? [...prevData, payload.new] : [payload.new]);
  //           dispatch({
  //             type:"UPDATE_TRANS",
  //             payload: {...data as NewCopyTradingTransaction[]}
  //           })
  //         }
  //     ).subscribe();
  //     console.log("channel", channel)
  //   }
  //   fetchData();
  // },[])

  // useEffect(()=>{
  //   // console.log("data: ",data)
  // },[data])

  // useEffect(()=>{
  //   // console.log("localData changed from page.tsx main shit: ",localData[0], "typeof localData: ",typeof [localData[0]])
  // },[localData])

  return (
    <main className="flex">
      <div className="">
        some shit
        {/* <DemoPage data={Object.values(localData)}/> */}
        {/* <TestPayments/> */}
        {/* <NewerDemoShit/> */}
        {/* <DemoPageNew/> */}
        <NewMatrix/>
      </div>
    </main>
  );
}
