import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Payment, columns } from './columns'
import { DataTable } from "./data-table"
import { cookies } from 'next/headers'
import { Modal } from '../modal/modal';
import { Button } from '../ui/button';
// import { getDataTwo } from "@/lib/constants";
// import { getDataTwo } from "@/lib/constants";

async function getData(): Promise<any[]> {
    const supabase = createServerComponentClient({cookies})
    const { data, error } = await supabase
    .from('new_copy_trading_transaction')
    .select(`
        *,
        new_copy_trading_addresses(
          *
        )
    `)
    // .select(`
    //     *,
    //     new_copy_trading_addresses(
    //     *,
    //     new_copy_trading_coins_of_owners!owner(
    //         *
    //     )
    //     )
    // `)
    // .eq('new_copy_trading_transaction.swapperAddressId', 'new_copy_trading_addresses.id')
    .order('created_at', { ascending: false })
    .limit(10);
    if(error || !data){
        console.log("error at newmatrix bitch", error)
        return []
    }else if(data){
        // console.log("data from my cock: ",data)
        console.log("data found")
        return data;
    }else{
        console.log("some other error at nwe matrix bitch");
        return []
    }
}

export default async function NewMatrix() {
  const data = await getData();

  const refreshTheMatrix = async () => {
    console.log("refresh")
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
