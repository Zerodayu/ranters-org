"use server"

import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt-ts'

const prisma = new PrismaClient()

interface LoginInput {
  username: string
  password: string
}

interface LoginResponse {
  success: boolean
  user?: {
    id: number
    username: string
  }
  error?: string
}

export async function loginUser(input: LoginInput): Promise<LoginResponse> {
  try {
    // Validate input
    if (!input.username || !input.password) {
      throw new Error('Username and password are required')
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: {
        username: input.username
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'Invalid username or password'
      }
    }

    // Compare password with stored hash
    const isValidPassword = await compare(input.password, user.passwordHash)

    if (!isValidPassword) {
      return {
        success: false,
        error: 'Invalid username or password'
      }
    }

    // Remove sensitive data before returning
    const { passwordHash: _, ...userWithoutPassword } = user

    return {
      success: true,
      user: userWithoutPassword
    }

  } catch (error) {
    console.error('Error during login:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Ensure connection is properly closed when the app shuts down
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})