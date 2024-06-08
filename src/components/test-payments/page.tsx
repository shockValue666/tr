
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import {cookies} from 'next/headers'

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
  const {data,error} = await supabase.from('new_copy_trading_transaction')
                              .select('*')
                              .order('created_at', { ascending: false })
                              .limit(200);
  if(error || !data){
      console.log("error", error)
      return []
  }else if(data){
      console.log("data from cock: ",data)
      return data;
  }else{
    console.log("some other error");
    return []
  }

}

export default async function DemoPageNew() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

//afto einai to idio me to diko tou Posts()


// import { Payment, columns } from "./columns"
// import { DataTable } from "./data-table"

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

// export default async function TestPayments() {
    
//   const data = await getData()
// // const supabase = createClientComponentClient();
// // const [data, setData] = useState<Payment[]>([]);

// //set the data after fetching them using the getData function
// // useEffect(()=>{
// //     const getTheData = async () => {
// //         const data = await getData();
// //         setData(data);
// //     }
// //     getTheData();
// // },[])

// // useEffect(()=>{
// //     //simulate realtime data update
// //     const interval = setInterval(async () => {
// //         const data = await getData();
// //         setData(prevData=>[...prevData,...data]);
// //     }, 5000);
// // },[])

// // useEffect(()=>{
// //     const channel = supabase // Assuming you have a supabase client set up
// //       .channel('new_copy_trading_transaction')
// //       .on(
// //         'postgres_changes', 
// //         { event: "*", schema: "public", table: "new_copy_trading_transaction" },
// //         (payload) => {
// //           console.log("Realtime update payload:", payload);
// //         //   setData(prevData => [...prevData, payload.new as Payment]);
// //         }
// //       )
// //       .subscribe();
// //       console.log("channel from my cock", channel);
// //       return () => {
// //       // Unsubscribe from the channel when the component unmounts
// //       channel.unsubscribe();
// //     };
// // },[])


//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   )
// }


//tutorial: supabase serverside: 
//import {cookies} from 'next/headers'
//const supabase = createServerComponentClient({cookies})