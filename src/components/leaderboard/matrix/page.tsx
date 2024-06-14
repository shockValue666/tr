import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Payment, columns } from './columns'
import { DataTable } from "./data-table"
import { cookies } from 'next/headers'
// import { getDataTwo } from "@/lib/constants";
// import { getDataTwo } from "@/lib/constants";

async function getData(): Promise<any[]> {
    
    const supabase = createServerComponentClient({cookies})
    const { data, error } = await supabase
    .from('new_copy_trading_addresses')
    .select(`
        *
    `)
    // .eq('new_copy_trading_transaction.swapperAddressId', 'new_copy_trading_addresses.id')
    .order('pnl', { ascending: false })
    .limit(200);
    if(error || !data){
        console.log("error", error)
        return []
    }else if(data){
        // console.log("data from my cock: ",data)
        // console.log("data found")
        return data;
    }else{
        console.log("some other error");
        return []
    }
}

export default async function Leaderboard() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
