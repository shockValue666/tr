import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { cookies } from "next/headers"

interface DemoSinglePageProps {
  address: string
}


async function getTransactionsPerCoin(address:string): Promise<any>{
  let transactionsPerCoin:any[]=[];
  const supabase = createServerComponentClient({cookies})
  const {data:addressIdData,error:addressIdError} = await supabase.from("new_copy_trading_addresses")
    .select("id")
    .eq("swapper_address", address)
    .limit(1)

  if(addressIdError || !addressIdData){
    throw new Error("Failed to get addressId")
  }
  else if(addressIdData && addressIdData[0] && addressIdData[0].id){
    //fetch all coins related to that id
    const {data:addressesData,error:addressesError} = await supabase.from("new_copy_trading_coins_of_owners")
      .select("*")
      .eq("owner", addressIdData[0].id)

    if(addressesError || !addressesData){
      throw new Error("Failed to get addresses")
    }
    else if(addressesData && addressesData[0] && addressesData[0].id){
      //find all transactions related to those coins and the owner address
      const coinIds = addressesData.map((address)=>{
        return address.id;
      })
      
      let totalPnl = 0
      const transactionPromises = coinIds.map(async (coinId)=>{
        const {data:transactionsData,error:transactionsError} = await supabase.from("new_copy_trading_transaction")
          .select("*, new_copy_trading_addresses ( * ), new_copy_trading_coins_of_owners ( * )")
          .eq("token_id", coinId)
          .eq("swapper_address", address)
        if(transactionsError || !transactionsData){
          throw new Error("Failed to get transactions")
        }else if(transactionsData){
          // console.log("transactionsData: ",transactionsData)
          transactionsPerCoin.push({coinId:coinId,transactions:transactionsData})
          return {coinId:coinId,transactions:transactionsData,tokenSymbol:transactionsData[0].new_copy_trading_coins_of_owners.token_symbol}
        }
      })
      transactionsPerCoin = await Promise.all(transactionPromises)
      // console.log("here: ", transactionsPerCoin)
      let someshit = transactionsPerCoin.map((tsss:any)=>{
        // console.log("ts: ",tsss.tokenSymbol)
        let singleCoinBoughtOrSoldFoRSingleCoin=0
        tsss.transactions.map((t:any)=>{
          singleCoinBoughtOrSoldFoRSingleCoin += t.amount_sold_in_usdc === 0 ? t.amount_bought_in_usdc : -t.amount_sold_in_usdc
          // console.log("t: amount bought: ",t.amount_bought_in_usdc, " amount_sold: " ,t.amount_sold_in_usdc, "singleCoinBoughtOrSoldFoRSingleCoin" ,singleCoinBoughtOrSoldFoRSingleCoin, "tokenSymbol: ",t.new_copy_trading_coins_of_owners.token_symbol)
        })
        // console.log("singleCoinBoughtOrSoldFoRSingleCoinPnl: ",-singleCoinBoughtOrSoldFoRSingleCoin)
        totalPnl += -singleCoinBoughtOrSoldFoRSingleCoin
        return {pnl: -singleCoinBoughtOrSoldFoRSingleCoin,symbol:tsss.tokenSymbol};
        singleCoinBoughtOrSoldFoRSingleCoin=0;
      })

      // console.log("someshit: ",someshit)
      return {transactionsPerCoin,someshit,totalPnl}
    }
  }
}

async function getData(address:string): Promise<any> {
  const answer = await getTransactionsPerCoin(address);
  const {transactionsPerCoin,someshit} = answer;
  console.log("answer: ",answer.transactionsPerCoin)
  return answer;
  
}

export const DemoSinglePage: React.FC<DemoSinglePageProps> = async ({address}) => {
  const data = await getData(address);
  // console.log("data from inside the page: ",data)

  return (
    <>
      <div className="container mx-auto py-10">
        <div>
          totalPnl: {data.totalPnl.toFixed(2)}
        </div>
        {/* <DataTable columns={columns} data={data} /> */}
        {data.transactionsPerCoin.map((d:any)=>{
          // let pnl=0;
          // d.transactions.forEach((t:any)=>{
          //   console.log("t: ",t)
          // })
          return (
            <DataTable columns={columns} data={d.transactions} key={d.coinId} addressTitle={d.tokenSymbol} pnl={data.someshit}/>
          )
        })}
        {address}
      </div>
    </>
  );
};
