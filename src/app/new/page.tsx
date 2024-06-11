"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect } from 'react'

const Page = () => {
  const supabase = createClientComponentClient();
  useEffect(()=>{
    const fetchData = async () => {
      const {data,error} = await supabase.from("new_copy_trading_coins_of_owners").select("*").eq("token_symbol","ciken").eq("owner","6c57b126-aadc-4424-b3e9-667ab476c32a").limit(1);
      console.log("data: ",data)
    }
    fetchData();
  },[])
  return (
    <div>Page</div>
  )
}

export default Page