"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutAction() {
  const cookieStore = await cookies()
  
  // Remove the session cookie
  cookieStore.delete("session")
  
  // Redirect to the home page after logout
  redirect("/")
}