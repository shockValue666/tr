"use client";
import {DemoPage} from "@/components/payments/page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [data,setData] = useState<any[]>([]);

  const supabase = createClientComponentClient();
  console.log("async function")

  useEffect(()=>{
    const fetchData = async () => {
      const {data, error} = await supabase.from('new_copy_trading_transaction')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if(error || !data){
          console.log("error", error)
      }
      if(data){
          console.log("data from the frontedn: ",data)
          setData(data);
      }
    }
    fetchData();
  },[])

  return (
    <main className="flex">
      <div className="">
        some shit
        <DemoPage data={data}/>
      </div>
    </main>
  );
}
