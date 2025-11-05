"use server"

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

interface CreateUserInput {
  username: string;
  passwordHash: string;
}

interface CreateUserResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export async function createUser(input: CreateUserInput): Promise<CreateUserResponse> {

  try {
    // Validate input
    if (!input.username || !input.passwordHash) {
      throw new Error('Username and password hash are required');
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username: input.username
      }
    });

    if (existingUser) {
      return {
        success: false,
        error: 'Username already exists'
      };
    }

    const newUser = await prisma.user.create({
      data: {
        username: input.username.trim(),
        passwordHash: input.passwordHash
      }
    });

    return {
      success: true,
      user: newUser
    };

  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Ensure connection is properly closed when the app shuts down
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});