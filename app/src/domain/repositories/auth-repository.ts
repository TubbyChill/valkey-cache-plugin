import { User } from '@prisma/client'

export interface CreateUserInput {
  email: string
  password: string
  name?: string
}

export interface AuthRepository {
  createUser(input: CreateUserInput): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  updateUser(id: string, data: Partial<User>): Promise<User>
  verifyPassword(hashedPassword: string, password: string): Promise<boolean>
  hashPassword(password: string): Promise<string>
} 