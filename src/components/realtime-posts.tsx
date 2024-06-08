"use client";
import React from 'react'
import NewerDemoShit from './test-payments/page'

const RealtimePosts = ({serverPosts}:any) => {
  console.log("serverPosts: ", serverPosts)
  return (
    <div>{serverPosts}</div>
    // <div>
    //   <NewerDemoShit/>
    // </div>
  )
}

export default RealtimePosts