import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Payment, columns } from './columns'
import { DataTable } from "./data-table"
import { cookies } from 'next/headers'
import { Modal } from '../modal/modal';
import { useAppState } from '@/lib/providers/state-provider';
// import { getDataTwo } from "@/lib/constants";
// import { getDataTwo } from "@/lib/constants";

async function getData(): Promise<any[]> {
    // Fetch data from your API here.
    // return [
    //   {
    //     id: "728ed52f",
    //     amount: 100,
    //     status: "pending",
    //     email: "m@example.com",
    //   },
    //   // ...
    // ]
    const supabase = createServerComponentClient({cookies})
    // const {data,error} = await supabase.from('new_copy_trading_transaction')
    //                             .select('*')
    //                             .order('created_at', { ascending: false })
    //                             .limit(200);
    // const { data, error } = await supabase
    //                                 .from('new_copy_trading_transaction')
    //                                 .select(`
    //                                   *,
    //                                   new_copy_trading_addresses ( swapper_description )
    //                                 `)
    //                                 .eq('new_copy_trading_addresses.swapper_address', 'new_copy_trading_transaction.swapper_address')
    //                                 .order('created_at', { ascending: false })
    //                                 .limit(200);
    const { data, error } = await supabase
    .from('new_copy_trading_transaction')
    .select(`
        *,
        new_copy_trading_addresses(
        *,
        new_copy_trading_coins_of_owners!owner(
            *
        )
        )
    `)
    // .eq('new_copy_trading_transaction.swapperAddressId', 'new_copy_trading_addresses.id')
    .order('created_at', { ascending: false })
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

export default async function MatrixOfTrades() {
  const data = await getData();
//   const { selectedTransactions } = useAppState()
//   console.log("selectedTransactions: ", selectedTransactions);
  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
