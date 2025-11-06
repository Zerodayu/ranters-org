"use server"

import { createSession } from "./session"
import { loginUser } from "@/backend/database/get-user"

export type State = {
  error?: string
  success?: boolean
}

export async function loginAction(prevState: State, formData: FormData): Promise<State> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const response = await loginUser({ email, password })

    if (!response.success) {
      return { error: response.error, success: false }
    }

    // Ensure the response contains a user before creating a session
    if (!response.user || response.user.id === undefined || response.user.id === null) {
      return { error: "User not found", success: false }
    }

    // Create session for the logged in user
    await createSession(response.user.id.toString())

    return { success: true }
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : "An error occurred during login",
      success: false
    }
  }
}