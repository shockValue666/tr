import {DemoSinglePage} from '@/components/single-coin-table/page'
import React from 'react'

const Page = ({params}: {params: {walletAddress:string}}) => {
    
  return (
    <div>
      <div>
        Page or some shit: {params.walletAddress}
      </div>
      <div>
        <DemoSinglePage address={params.walletAddress}/>
      </div>
    </div>
  )
}

export default Page