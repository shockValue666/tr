import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {Payment,columns} from './columns'
import { DataTable } from "./data-table"
import {cookies} from 'next/headers'


async function getDataTwo(): Promise<any[]> {
  return [
    {
      id: 'a779ed55-04bd-4992-be34-c2330a2dbf78',
      created_at: '2024-06-12T09:39:39.928+00:00',
      swapper_address: 'HoBf48qerqV2etkg1igKRVpHSR4mh6rkCs1BYpg6i1JP',
      token_in_symbol: 'DADDY',
      token_in_amount: '18802.897455',
      token_in_mint: '4Cnk9EPnW5ixfLZatCPJjDB1PUtcRpVVgTQukm9epump',
      token_out_symbol: 'SOL',
      token_out_amount: '24.287181878',
      token_out_mint: 'So11111111111111111111111111111111111111112',
      price_per_token: 774.190169507982,
      swap_description: 'HoBf48qerqV2etkg1igKRVpHSR4mh6rkCs1BYpg6i1JP swapped 18802.897455 DADDY for 24.287181878 SOL',
      tx_id: '3dVb8KLo7fAovPSYVQneTEUUDZrocM32ZmQfF6i3C4tGzmScAXbKKaDVN4DiCkxTVEY6cbdCyTpGfZDrzfNtD6Yc',
      type: 'SWAP',
      swapper_address_id: 'bbb9effc-aa0d-4e00-a676-3e941cf90e45',
      current_sol_price: 151.51,
      token_id: '452a93e7-f5b3-44af-96f4-412dfdd0210c',
      type_of_swap: 'sell',
      amount_bought_in_sol: 0,
      amount_sold_in_sol: 24.287181878,
      amount_bought_in_usdc: 0,
      amount_sold_in_usdc: 3679.75092633578,
      new_copy_trading_addresses: {
        id: 'bbb9effc-aa0d-4e00-a676-3e941cf90e45',
        created_at: '2024-06-11T01:57:06.845+00:00',
        description: 'vol 3 x10 abella danger trader also WIP: track his pump.fun swaps',
        swapper_address: 'HoBf48qerqV2etkg1igKRVpHSR4mh6rkCs1BYpg6i1JP',
        new_copy_trading_coins_of_owners: [] // Ensure this is an empty array
      }
    },
    {
      id: '0587fd36-da2f-4363-a533-8e47ee5f2585',
      created_at: '2024-06-12T09:35:12.283+00:00',
      swapper_address: 'HoBf48qerqV2etkg1igKRVpHSR4mh6rkCs1BYpg6i1JP',
      token_in_symbol: 'DADDY',
      token_in_amount: '18802.897454',
      token_in_mint: '4Cnk9EPnW5ixfLZatCPJjDB1PUtcRpVVgTQukm9epump',
      token_out_symbol: 'SOL',
      token_out_amount: '22.571945033',
      token_out_mint: 'So11111111111111111111111111111111111111112',
      price_per_token: 833.020700099629,
      swap_description: 'HoBf48qerqV2etkg1igKRVpHSR4mh6rkCs1BYpg6i1JP swapped 18802.897454 DADDY for 22.571945033 SOL',
      tx_id: '3JhSDSaFxeNKY2cU3WfitvqJXTePh9aTfBJhSXyU83m5psK2NRRNuizp7mb5SLS9HTF11nKBVj2rgMyEYZu5xjFN',
      type: 'SWAP',
      swapper_address_id: 'bbb9effc-aa0d-4e00-a676-3e941cf90e45',
      current_sol_price: 151.45,
      token_id: '452a93e7-f5b3-44af-96f4-412dfdd0210c',
      type_of_swap: 'sell',
      amount_bought_in_sol: 0,
      amount_sold_in_sol: 22.571945033,
      amount_bought_in_usdc: 0,
      amount_sold_in_usdc: 3418.52107524785,
      new_copy_trading_addresses: {
        id: 'bbb9effc-aa0d-4e00-a676-3e941cf90e45',
        created_at: '2024-06-11T01:57:06.845+00:00',
        description: 'vol 3 x10 abella danger trader also WIP: track his pump.fun swaps',
        swapper_address: 'HoBf48qerqV2etkg1igKRVpHSR4mh6rkCs1BYpg6i1JP',
        new_copy_trading_coins_of_owners: [] // Ensure this is an empty array
      }
    }
  ]
}

export default async function DemoMatrix() {
  // const data = await getData()
  const data = await getDataTwo();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
