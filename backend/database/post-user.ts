"use server"

import { PrismaClient, Prisma } from '@prisma/client'
import { hash } from 'bcrypt-ts'
import { isValidEmail } from '@/utils/input-validations'

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

interface CreateUserInput {
  email: string;
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
    if (!input.username || !input.password || !input.email) {
      throw new Error('Username, password and email are required');
    }

    // Use shared email validation
    if (!isValidEmail(input.email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: input.username },
          { email: input.email }
        ]
      }
    });

    if (existingUser) {
      return {
        success: false,
        error: existingUser.email === input.email 
          ? 'Email already exists' 
          : 'Username already exists'
      };
    }

    // Hash the password
    const passwordHash = await hash(input.password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        username: input.username.trim(),
        email: input.email.trim().toLowerCase(), // Store email in lowercase
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