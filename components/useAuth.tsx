import React from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'

interface AuthProps {
  children: React.ReactNode
}

export async function Auth({ children }: AuthProps) {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  const isAuthenticated = await decrypt(session?.value)

  const signedInChild = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SignedIn) {
      return isAuthenticated ? child : null
    }
    return null
  })

  const signedOutChild = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SignedOut) {
      return !isAuthenticated ? child : null
    }
    return null
  })

  return (
    <>
      {signedInChild}
      {signedOutChild}
    </>
  )
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
