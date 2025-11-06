"use server"

import { cookies } from "next/headers"
import { decrypt } from "./session"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")
  
  if (!session) return null
  
  const payload = await decrypt(session.value)
  if (!payload || !payload.userId) return null

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(payload.userId as string)
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true
      }
    })
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}