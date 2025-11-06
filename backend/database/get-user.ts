"use server"

import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt-ts'
import { isValidEmail } from '@/utils/input-validations'

const prisma = new PrismaClient()

interface LoginInput {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  user?: {
    id: number
    username: string | null
    email: string
  }
  error?: string
}

export async function loginUser(input: LoginInput): Promise<LoginResponse> {
  try {
    // Validate input
    if (!input.email || !input.password) {
      throw new Error('Email and password are required')
    }

    // Use shared email validation
    if (!isValidEmail(input.email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Find user by email (using lowercase to match storage format)
    const user = await prisma.user.findUnique({
      where: {
        email: input.email.trim().toLowerCase()
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Compare password with stored hash
    const isValidPassword = await compare(input.password, user.passwordHash)

    if (!isValidPassword) {
      return {
        success: false,
        error: 'Invalid email or password'
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