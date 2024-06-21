'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

function NavBar() {
  const { data: session } = useSession()
  return (
    <div>{session?(<><p>{`logged in as: ${session.user?.email}`}</p></>):(<button onClick={() => signIn()}>Sign in</button>)}<button onClick={()=>signOut()}>logout</button></div>
  )
}

export default NavBar