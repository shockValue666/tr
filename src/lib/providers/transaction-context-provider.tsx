// context/TransactionsContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const TransactionsContext = createContext<any>(null);

export const TransactionContextProvider = ({ children }: { children: React.ReactNode }) => {
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from("new_copy_trading_transaction")
//         .select("*")
//         .order("created_at", { ascending: false })
//         .limit(200);
//       if (error) {
//         console.log("error", error);
//       } else if (data) {
//         console.log("data from the frontend: ", data);
//         setTransactions(data);
//       }
//     };

//     fetchData();

//     const channel = supabase
//       .channel("new_copy_trading_transaction")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "new_copy_trading_transaction" },
//         (payload) => {
//           console.log("real-time update: ", payload);
//           setTransactions((prevTransactions) =>
//             prevTransactions ? [...prevTransactions, payload.new] : [payload.new]
//           );
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [supabase]);

  return (
    <TransactionsContext.Provider 
    value={
        // transactions
        null
    }>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);