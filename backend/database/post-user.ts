"use server"

import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcrypt-ts'

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

interface CreateUserInput {
  username: string;
  password: string; // Changed from passwordHash to password
}

interface CreateUserResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export async function createUser(input: CreateUserInput): Promise<CreateUserResponse> {
  try {
    // Validate input
    if (!input.username || !input.password) {
      throw new Error('Username and password are required');
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

    // Hash the password
    const passwordHash = await hash(input.password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        username: input.username.trim(),
        passwordHash: passwordHash
      }
    });

    // Remove passwordHash from the returned user object
    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      user: userWithoutPassword
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